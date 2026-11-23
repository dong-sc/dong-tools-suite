import assert from "node:assert/strict";
import test from "node:test";
import vm from "node:vm";
import {
  buildCaseworkData,
  renderSeriesScript,
} from "../scripts/casework-series.mjs";

const casework = {
  name: "Casework",
  stages: [
    { id: "pitch", label: "談案" },
    { id: "collect", label: "收款" },
    { id: "claim", label: "報帳" },
  ],
};
const tool = (id, step, stage, verb, next) => ({
  id,
  name: id,
  href: `https://example.test/${id}/`,
  identity: { color: "#123456" },
  series: { step, stage, verb, when: `${verb}時`, output: verb, next },
});
const tools = () => [
  { id: "layout", featured: true, identity: { color: "#000" } },
  tool("quote", 1, "pitch", "報價", ["scope"]),
  tool("scope", 2, "pitch", "確認範圍", ["payment"]),
  tool("payment", 3, "collect", "請款", ["receipt", "fill"]),
  tool("receipt", 4, "collect", "領據", ["travel"]),
  tool("fill", 5, "collect", "勞報單", ["travel"]),
  tool("travel", 6, "claim", "交通報帳", []),
  { id: "thsr", identity: { color: "#000" } },
];

async function runtime(data) {
  const context = vm.createContext({ window: {} });
  vm.runInContext(await renderSeriesScript(data), context);
  return context.window.DongCasework;
}

test("only series tools are included, in step order", () => {
  const data = buildCaseworkData(tools().reverse(), casework);
  assert.deepEqual(
    data.steps.map((s) => s.id),
    ["quote", "scope", "payment", "receipt", "fill", "travel"],
  );
  assert.equal(data.hub, "https://tools.donglinphoto.com/");
});

test("an inconsistent series fails the build", () => {
  const gap = tools().filter((t) => t.id !== "scope");
  assert.throws(() => buildCaseworkData(gap, casework), /1\.\.n/);
  const broken = tools();
  broken[1].series.next = ["nowhere"];
  assert.throws(() => buildCaseworkData(broken, casework), /unknown nowhere/);
  const stage = tools();
  stage[1].series.stage = "other";
  assert.throws(() => buildCaseworkData(stage, casework), /unknown stage/);
});

test("previous and next steps follow the flow, including alternatives", async () => {
  const api = await runtime(buildCaseworkData(tools(), casework));
  const ids = (list) => list.map((s) => s.id).join(",");
  const payment = api.model("payment");
  assert.equal(ids(payment.prev), "scope");
  assert.equal(ids(payment.next), "receipt,fill");
  assert.equal(ids(api.model("fill").prev), "payment");
  assert.equal(ids(api.model("travel").prev), "receipt,fill");
  assert.equal(api.model("travel").next.length, 0);
  assert.equal(api.model("layout"), null);
});

test("series bar and next-step card describe the position", async () => {
  const api = await runtime(buildCaseworkData(tools(), casework));
  const bar = api.barHTML(api.model("receipt"));
  assert.match(bar, /<b>04<\/b> \/ 06/);
  assert.match(bar, /← <a[^>]+>03 請款/);
  assert.match(
    bar,
    /06 交通報帳<span class="dtc-sr">（另開新分頁）<\/span><\/a> →/,
  );
  assert.equal((bar.match(/aria-current="step"/g) || []).length, 1);

  const next = api.nextHTML(api.model("payment"));
  assert.match(next, /下一步：.*04 領據.* 或 .*05 勞報單/);
  assert.match(next, /擇一即可/);
  assert.match(api.nextHTML(api.model("travel")), /文件都齊了/);
});

test("text from the catalog is escaped", async () => {
  const list = tools();
  list[1].series.verb = '<img src=x onerror="1">';
  const api = await runtime(buildCaseworkData(list, casework));
  const bar = api.barHTML(api.model("scope"));
  assert.doesNotMatch(bar, /<img/);
  assert.match(bar, /&lt;img/);
});

// Minimal DOM stand-in: enough to see where the runtime puts the bar and card.
function fakeDom({ tool, mount, brand = true }) {
  const events = [];
  const make = (tag) => {
    const el = {
      tag,
      children: [],
      className: "",
      attrs: {},
      style: { setProperty() {} },
      innerHTML: "",
      parent: null,
      setAttribute(k, v) {
        this.attrs[k] = v;
      },
      append(child) {
        child.parent = this;
        this.children.push(child);
      },
      prepend(child) {
        child.parent = this;
        this.children.unshift(child);
      },
      after(child) {
        child.parent = this.parent;
        const list = this.parent.children;
        list.splice(list.indexOf(this) + 1, 0, child);
      },
      remove() {
        if (!this.parent) return;
        const list = this.parent.children;
        list.splice(list.indexOf(this), 1);
        this.parent = null;
      },
      querySelector() {
        return null;
      },
    };
    return el;
  };
  const body = make("body");
  const head = make("head");
  const brandBar = make("nav");
  brandBar.className = "dong-tools-bar";
  if (brand) body.append(brandBar);
  const all = () => {
    const out = [];
    const walk = (n) => n.children.forEach((c) => (out.push(c), walk(c)));
    walk(body);
    return out;
  };
  const document = {
    readyState: "complete",
    head,
    body,
    currentScript: { dataset: { tool, ...(mount ? { mount } : {}) } },
    createElement: make,
    getElementById: () => null,
    querySelector: (sel) =>
      sel === ".dong-tools-bar"
        ? all().find((n) => n.className === "dong-tools-bar") || null
        : null,
    querySelectorAll: (sel) =>
      all().filter((n) => sel === ".dtc-bar" && n.className === "dtc-bar"),
  };
  const window = {
    dispatchEvent: (e) => events.push(e.type),
  };
  return { document, window, body, brandBar, events, all };
}

async function boot(dom) {
  const data = buildCaseworkData(tools(), casework);
  const context = vm.createContext({
    window: dom.window,
    document: dom.document,
    Event: class {
      constructor(type) {
        this.type = type;
      }
    },
  });
  vm.runInContext(await renderSeriesScript(data), context);
  return dom.window.DongCasework;
}

test("static pages get the bar right after the brand bar", async () => {
  const dom = fakeDom({ tool: "receipt" });
  await boot(dom);
  assert.deepEqual(dom.events, ["dongcasework:ready"]);
  assert.equal(dom.body.children[1].className, "dtc-bar");
});

test("manual pages mount the bar into their own element", async () => {
  const dom = fakeDom({ tool: "quote", mount: "manual" });
  const api = await boot(dom);
  assert.deepEqual(dom.events, ["dongcasework:ready"]);
  assert.equal(
    dom.all().some((n) => n.className === "dtc-bar"),
    false,
  );
  const slot = dom.document.createElement("div");
  dom.body.append(slot);
  api.mountBar("quote", slot);
  api.mountBar("quote", slot);
  assert.equal(slot.children.length, 1);
  assert.equal(slot.children[0].className, "dtc-bar");
  const card = api.showNext(slot);
  assert.match(card.innerHTML, /下一步：.*02 確認範圍/);
});
