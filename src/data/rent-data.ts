/** Median monthly rents by UK region and bedroom count (ONS/VOA estimates) */

export interface RegionRentData {
  region: string;
  rents: Record<number, number>; // bedrooms -> monthly rent
  postcodePrefix: string[]; // postcode area prefixes that map to this region
}

export const regionRentData: RegionRentData[] = [
  {
    region: "London",
    rents: { 1: 1500, 2: 1800, 3: 2200, 4: 2800, 5: 3500 },
    postcodePrefix: [
      "E", "EC", "N", "NW", "SE", "SW", "W", "WC",
      "BR", "CR", "DA", "EN", "HA", "IG", "KT", "RM",
      "SM", "TW", "UB", "WD",
    ],
  },
  {
    region: "South East",
    rents: { 1: 900, 2: 1100, 3: 1350, 4: 1700, 5: 2100 },
    postcodePrefix: [
      "BN", "CT", "GU", "HP", "ME", "MK", "OX", "PO",
      "RG", "RH", "SL", "SO", "SS", "TN",
    ],
  },
  {
    region: "South West",
    rents: { 1: 750, 2: 950, 3: 1150, 4: 1450, 5: 1800 },
    postcodePrefix: [
      "BA", "BH", "BS", "DT", "EX", "GL", "PL", "SN",
      "SP", "TA", "TQ", "TR",
    ],
  },
  {
    region: "East",
    rents: { 1: 850, 2: 1050, 3: 1300, 4: 1600, 5: 2000 },
    postcodePrefix: [
      "AL", "CB", "CM", "CO", "IP", "LU", "NR", "PE",
      "SG", "SS",
    ],
  },
  {
    region: "West Midlands",
    rents: { 1: 650, 2: 800, 3: 1000, 4: 1250, 5: 1550 },
    postcodePrefix: [
      "B", "CV", "DY", "HR", "ST", "SY", "TF", "WR",
      "WS", "WV",
    ],
  },
  {
    region: "East Midlands",
    rents: { 1: 600, 2: 750, 3: 950, 4: 1200, 5: 1450 },
    postcodePrefix: ["DE", "LE", "LN", "NG", "NN"],
  },
  {
    region: "North West",
    rents: { 1: 600, 2: 750, 3: 950, 4: 1200, 5: 1500 },
    postcodePrefix: [
      "BB", "BL", "CA", "CH", "CW", "FY", "L", "LA",
      "M", "OL", "PR", "SK", "WA", "WN",
    ],
  },
  {
    region: "North East",
    rents: { 1: 500, 2: 600, 3: 750, 4: 950, 5: 1200 },
    postcodePrefix: ["DH", "DL", "NE", "SR", "TS"],
  },
  {
    region: "Yorkshire",
    rents: { 1: 550, 2: 700, 3: 900, 4: 1100, 5: 1400 },
    postcodePrefix: [
      "BD", "DN", "HD", "HG", "HU", "HX", "LS", "S",
      "WF", "YO",
    ],
  },
  {
    region: "Wales",
    rents: { 1: 550, 2: 700, 3: 850, 4: 1050, 5: 1300 },
    postcodePrefix: [
      "CF", "LD", "LL", "NP", "SA", "SY",
    ],
  },
  {
    region: "Scotland",
    rents: { 1: 600, 2: 800, 3: 1000, 4: 1250, 5: 1500 },
    postcodePrefix: [
      "AB", "DD", "DG", "EH", "FK", "G", "HS", "IV",
      "KA", "KW", "KY", "ML", "PA", "PH", "TD", "ZE",
    ],
  },
];

/**
 * Get a region from a postcode string.
 * Extracts the alphabetic prefix and matches to a region.
 */
export function getRegionFromPostcode(postcode: string): RegionRentData | null {
  const cleaned = postcode.toUpperCase().replace(/\s/g, "");
  // Extract area prefix (1-2 letters at start)
  const match = cleaned.match(/^([A-Z]{1,2})/);
  if (!match) return null;

  const prefix = match[1];

  // Try two-letter match first, then one-letter
  for (const region of regionRentData) {
    if (region.postcodePrefix.includes(prefix)) {
      return region;
    }
  }

  // Try single letter if two-letter didn't match
  if (prefix.length === 2) {
    const singleChar = prefix[0];
    for (const region of regionRentData) {
      if (region.postcodePrefix.includes(singleChar)) {
        return region;
      }
    }
  }

  return null;
}

/**
 * Get the median rent for a region and bedroom count.
 */
export function getMedianRent(
  region: RegionRentData,
  bedrooms: number
): number {
  const clamped = Math.max(1, Math.min(5, bedrooms));
  return region.rents[clamped];
}
