import test from "node:test";
import assert from "node:assert/strict";
import { prioritize } from "../src/core/prioritize.js";

test("ranks higher-value, lower-effort work first", () => {
  const result = prioritize([
    { id: "later", title: "Later", impact: 1, urgency: 1, effort: 3 },
    { id: "now", title: "Now", impact: 5, urgency: 4, effort: 1, riskReduction: 3 }
  ]);
  assert.equal(result[0].id, "now");
});

test("handles empty work lists", () => {
  assert.deepEqual(prioritize([]), []);
});
