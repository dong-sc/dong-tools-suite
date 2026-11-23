import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import vm from "node:vm";

const html = readFileSync(
  new URL("../public/receipt/index.html", import.meta.url),
  "utf8",
);
const script = html.match(/<script>([\s\S]*?)<\/script>/)[1];
new vm.Script(script);
// Exercise the standalone file's actual pure helpers (everything before app state).
const context = vm.createContext({ Blob, structuredClone });
vm.runInContext(script.slice(0, script.indexOf("let data=")), context);
const {
  upper,
  idCheck,
  taxIdCheck,
  calc,
  issues,
  validate,
  receiptHTML,
  stored,
} = context;

const receipt = (over = {}) => ({
  id: "r1",
  no: "",
  date: "2026-11-23",
  payer: "某某基金會",
  payerTaxId: "",
  reason: "年會活動攝影",
  category: "9A",
  residency: "resident",
  items: [{ id: "i1", desc: "攝影費", kind: "income", amount: "20000" }],
  taxMode: "auto",
  taxManual: "",
  nhiMode: "auto",
  nhiManual: "",
  note: "",
  issued: false,
  ...over,
});
const profile = (over = {}) => ({
  name: "王小明",
  idNo: "A123456789",
  address: "臺北市信義區某路 1 號",
  phone: "",
  email: "",
  bankName: "",
  bankBranch: "",
  account: "",
  accountName: "",
  rememberSensitive: false,
  ...over,
});
const amount = (n, over = {}) =>
  calc(
    receipt({
      items: [{ id: "i", desc: "x", kind: "income", amount: String(n) }],
      ...over,
    }),
  );

test("amounts are written in formal Chinese numerals", () => {
  assert.equal(upper(12000), "壹萬貳仟元整");
  assert.equal(upper(10050), "壹萬零伍拾元整");
  assert.equal(upper(100000), "壹拾萬元整");
  assert.equal(upper(101000), "壹拾萬壹仟元整");
  assert.equal(upper(1000005), "壹佰萬零伍元整");
  assert.equal(upper(100000005), "壹億零伍元整");
  assert.equal(upper(19578), "壹萬玖仟伍佰柒拾捌元整");
  assert.equal(upper(0), "零元整");
});

test("national ID, resident certificate and business number checksums", () => {
  assert.equal(idCheck("A123456789"), "ok");
  assert.equal(idCheck("a123456789"), "ok");
  assert.equal(idCheck("A123456788"), "bad");
  assert.equal(idCheck("A800000014"), "ok");
  assert.equal(idCheck("E12345678"), "other");
  assert.equal(taxIdCheck("22099131"), true);
  assert.equal(taxIdCheck("22099132"), false);
  assert.equal(taxIdCheck("1234567"), false);
});

test("9A withholding starts when tax exceeds NT$2,000", () => {
  assert.equal(amount(20009).tax, 0);
  assert.equal(amount(20010).tax, 2001);
  assert.equal(amount(20000, { residency: "nonresident" }).tax, 4000);
});

test("supplementary NHI premium thresholds", () => {
  assert.equal(amount(19999).nhi, 0);
  assert.equal(amount(20000).nhi, 422);
  assert.equal(amount(29499, { category: "50" }).nhi, 0);
  assert.equal(amount(29500, { category: "50" }).nhi, 622);
  assert.equal(amount(30000, { nhiMode: "exempt" }).nhi, 0);
  assert.equal(amount(30000, { residency: "nonresident" }).nhi, 0);
});

test("part-time salary withholding follows the 115 threshold", () => {
  assert.equal(amount(90500, { category: "50" }).tax, 0);
  assert.equal(amount(90501, { category: "50" }).tax, 4525);
  assert.equal(
    amount(40000, { category: "50", residency: "nonresident" }).tax,
    2400,
  );
});

test("reimbursed expenses stay outside income", () => {
  const c = calc(
    receipt({
      items: [
        { id: "a", desc: "攝影費", kind: "income", amount: "18000" },
        { id: "b", desc: "高鐵", kind: "expense", amount: "3000" },
      ],
    }),
  );
  assert.equal(c.gross, 21000);
  assert.equal(c.income, 18000);
  assert.equal(c.nhi, 0);
  assert.equal(c.net, 21000);
  const none = calc(receipt({ category: "none" }));
  assert.equal(none.income, 0);
  assert.equal(none.tax + none.nhi, 0);
});

test("manual amounts override the estimate", () => {
  const c = amount(50000, {
    taxMode: "manual",
    taxManual: "1234",
    nhiMode: "manual",
    nhiManual: "0",
  });
  assert.equal(c.tax, 1234);
  assert.equal(c.nhi, 0);
  assert.equal(c.net, 48766);
});

test("required receipt elements are enforced", () => {
  assert.equal(issues(receipt(), profile()).err.length, 0);
  const missing = issues(
    receipt({ payer: "", reason: "" }),
    profile({ idNo: "", address: "" }),
  ).err.join("");
  for (const word of ["支付單位", "受領事由", "身分證字號", "戶籍地址"])
    assert.match(missing, new RegExp(word));
  assert.match(
    issues(receipt(), profile({ accountName: "別人" })).warn.join(""),
    /戶名/,
  );
});

test("printed receipt carries the legal elements and escapes input", () => {
  const out = receiptHTML(
    receipt({ payer: "<b>單位</b>", payerTaxId: "22099131" }),
    profile(),
    "",
  );
  assert.match(out, /新臺幣<\/span><strong>貳萬元整/);
  assert.match(out, /年會活動攝影/);
  assert.match(out, /A123456789/);
  assert.match(out, /中華民國　115　年　11　月　23　日/);
  assert.match(out, /&lt;b&gt;單位&lt;\/b&gt;/);
  assert.doesNotMatch(out, /<b><b>/);
  assert.match(out, /22099131/);
});

test("backups validate and sensitive fields are not stored unless remembered", () => {
  const data = {
    format: "dong-tools-receipt-html",
    version: 1,
    revision: "t",
    profile: profile({ account: "123456789012" }),
    receipts: [receipt()],
  };
  assert.deepEqual(JSON.parse(validate(data)), data);
  const kept = stored(data);
  assert.equal(kept.profile.idNo, "");
  assert.equal(kept.profile.account, "");
  assert.equal(data.profile.idNo, "A123456789");
  data.profile.rememberSensitive = true;
  assert.equal(stored(data).profile.idNo, "A123456789");
  data.receipts[0].items[0].amount = "-5";
  assert.throws(() => validate(data));
});
