import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import vm from "node:vm";

const html = readFileSync(
  new URL("../public/travel-expense/index.html", import.meta.url),
  "utf8",
);
const script = html.match(/<script>([\s\S]*?)<\/script>/)[1];
new vm.Script(script);
// Exercise the standalone file's actual pure validation and print builders.
const context = vm.createContext({ Blob });
vm.runInContext(
  script.slice(0, script.indexOf("const blank=")) +
    script.slice(
      script.indexOf("function info("),
      script.indexOf("function fits("),
    ),
  context,
);
const day = {
  date: "2026-09-12",
  events: [{ id: "event", title: "Meeting", start: "10:00", end: "17:00" }],
  legs: [{ id: "leg", type: "taxi", from: "A", to: "B", amount: "250" }],
  submitted: false,
};
const backup = () => ({
  format: "dong-tools-travel-expense-html",
  version: 1,
  revision: "test",
  days: [structuredClone(day)],
});

test("legacy backups and optional commute times survive validation", () => {
  const data = backup();
  assert.deepEqual(JSON.parse(context.validate(data)), data);
  data.days[0].legs[0].departureTime = "08:15";
  data.days[0].legs[0].arrivalTime = "09:30";
  assert.deepEqual(JSON.parse(context.validate(data)), data);
  data.days[0].legs[0].arrivalTime = "25:00";
  assert.throws(() => context.validate(data));
});

test("receipt dates remain, commute times are optional and activity times appear only at the start", () => {
  const leg = { ...day.legs[0], departureTime: "08:15" };
  assert.match(context.info(day, leg), /2026\/09\/12/);
  assert.match(context.info(day, leg), /08:15/);
  assert.doesNotMatch(context.info(day, leg), /10:00|17:00|Meeting|抵達/);
  assert.doesNotMatch(context.info(day, day.legs[0]), /出發|抵達/);
  const pages = [];
  const doc = {
    createElement: () => ({}),
    querySelector: () => pages[0],
    body: { append: (p) => pages.push(p) },
  };
  context.page(doc, day, true);
  context.page(doc, day, true);
  assert.match(pages[0].innerHTML, /Meeting.*10:00–17:00/);
  assert.doesNotMatch(pages[1].innerHTML, /Meeting|10:00|17:00/);
});
