import test from "node:test";
import assert from "node:assert/strict";
import { googleAddress } from "../packages/platform/src/facilities/googlePlaces.ts";
test("Google address mapping handles UK postal town and leaves operational data absent", () => {
  const a = googleAddress({
    id: "example",
    displayName: "Example Building",
    formattedAddress: "Example address",
    addressComponents: [
      { longText: "Example Town", types: ["postal_town"] },
      { longText: "AB1 2CD", types: ["postal_code"] },
      { longText: "United Kingdom", types: ["country"] },
    ],
  });
  assert.equal(a.city, "Example Town");
  assert.equal(a.postcode, "AB1 2CD");
  assert.equal(a.googlePlaceId, "example");
  assert.equal(a.country, "United Kingdom");
  assert.equal(a.buildingNumber, "");
  assert.ok(!("site" in a));
  assert.ok(!("facilityType" in a));
});
test("Google missing address components stay empty rather than inferred", () => {
  const a = googleAddress({ displayName: "Postcode result" });
  assert.equal(a.city, "");
  assert.equal(a.location, "");
  assert.equal(a.googlePlaceId, "");
});
test("Google US postal suffix and locality are mapped by component type", () => {
  const a = googleAddress({
    addressComponents: [
      { longText: "12345", types: ["postal_code"] },
      { longText: "6789", types: ["postal_code_suffix"] },
      { longText: "Example City", types: ["locality"] },
      { longText: "10", types: ["street_number"] },
      { longText: "Sample Street", types: ["route"] },
    ],
  });
  assert.equal(a.postcode, "12345-6789");
  assert.equal(a.city, "Example City");
  assert.equal(a.street, "Sample Street");
  assert.equal(a.buildingNumber, "10");
});
