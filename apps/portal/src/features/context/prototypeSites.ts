export const PROTOTYPE_SITES = [
  {
    site: "BHX4",
    country: "United Kingdom",
    region: "UK",
    facilityType: "Fulfilment Centre",
    serviceModel: "IFM",
    tier: "Plus",
  },
];

export type SiteConfig = (typeof PROTOTYPE_SITES)[number];
