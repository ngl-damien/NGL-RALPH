import test from "node:test";
import assert from "node:assert/strict";
import { assessEvidence } from "../src/core/evidence.js";

test("does not promote unsupported assertions to verified evidence", () => {
  const result = assessEvidence({
    objective: "Confirm deployment",
    claims: [{ statement: "Deployment succeeded", strength: "asserted", verified: true }]
  });
  assert.equal(result.outcome, "unsupported");
  assert.equal(result.verifiedCount, 0);
});

test("accepts direct evidence only when a source is identified", () => {
  const result = assessEvidence({
    objective: "Confirm test result",
    claims: [{ statement: "Tests passed", source: "CI run 123", strength: "direct", verified: true }]
  });
  assert.equal(result.outcome, "supported");
  assert.equal(result.verifiedCount, 1);
});

test("rejects an empty objective", () => {
  assert.throws(() => assessEvidence({ objective: " " }), /objective/);
});
