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
