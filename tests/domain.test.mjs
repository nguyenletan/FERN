import assert from "node:assert/strict";
import test from "node:test";
import buildResponse, { SUGGESTED_QUESTIONS } from "../apps/portal/src/features/ask-fern/demoResponses.ts";
import { DATA_STATUS_CONFIG, SOURCE_STATUS_CONFIG } from "../packages/platform/src/domain/dataStatus.ts";

for (const query of [...SUGGESTED_QUESTIONS, "An unknown question"]) {
  test(`Unconnected demo reports a gap: ${query}`, () => {
    const response = buildResponse(query);
    assert.equal(response.query, query);
    assert.equal(response.classification, "GAP");
    assert.equal(response.confidence, "Low");
    assert.match(response.answer, /cannot currently/);
    assert.equal(response.sources, response.sourcesDetail.length);
  });
}

test("Missing data, stale data, validation and source connection remain distinct", () => {
  assert.notEqual(DATA_STATUS_CONFIG.GAP.label, DATA_STATUS_CONFIG.VERIFIED.label);
  assert.notEqual(DATA_STATUS_CONFIG.STALE.label, DATA_STATUS_CONFIG.REQUIRES_VALIDATION.label);
  assert.notEqual(
    SOURCE_STATUS_CONFIG.NOT_CONNECTED.label,
    SOURCE_STATUS_CONFIG.DATA_UNAVAILABLE.label,
  );
});
