/**
 * Council Tax estimates by postcode prefix.
 * Uses regional averages since the VOA API requires bulk CSV imports.
 * Clearly labelled as estimates throughout.
 */

export interface CouncilTaxData {
  estimatedBand: string;
  annualAmount: number;
  monthlyAmount: number;
  councilName: string;
  isEstimate: true;
  note: string;
}

interface RegionProfile {
  typicalBand: string;
  bandDAnnual: number;
}

// Regional Band D averages (2024/25 council tax levels, approximate)
const REGION_PROFILES: Record<string, RegionProfile> = {
  // London boroughs
  'E': { typicalBand: 'D', bandDAnnual: 1700 },
  'EC': { typicalBand: 'D', bandDAnnual: 1650 },
  'N': { typicalBand: 'D', bandDAnnual: 1750 },
  'NW': { typicalBand: 'D', bandDAnnual: 1780 },
  'SE': { typicalBand: 'D', bandDAnnual: 1720 },
  'SW': { typicalBand: 'D', bandDAnnual: 1600 },
  'W': { typicalBand: 'D', bandDAnnual: 1550 },
  'WC': { typicalBand: 'D', bandDAnnual: 1500 },
  'BR': { typicalBand: 'D', bandDAnnual: 1800 },
  'CR': { typicalBand: 'D', bandDAnnual: 1820 },
  'DA': { typicalBand: 'D', bandDAnnual: 1850 },
  'EN': { typicalBand: 'D', bandDAnnual: 1800 },
  'HA': { typicalBand: 'D', bandDAnnual: 1780 },
  'IG': { typicalBand: 'D', bandDAnnual: 1820 },
  'KT': { typicalBand: 'D', bandDAnnual: 1900 },
  'RM': { typicalBand: 'D', bandDAnnual: 1850 },
  'SM': { typicalBand: 'D', bandDAnnual: 1830 },
  'TW': { typicalBand: 'D', bandDAnnual: 1870 },
  'UB': { typicalBand: 'D', bandDAnnual: 1800 },
  'WD': { typicalBand: 'D', bandDAnnual: 1900 },

  // South East
  'BN': { typicalBand: 'D', bandDAnnual: 2050 },
  'CT': { typicalBand: 'D', bandDAnnual: 2000 },
  'GU': { typicalBand: 'D', bandDAnnual: 2050 },
  'HP': { typicalBand: 'D', bandDAnnual: 1950 },
  'ME': { typicalBand: 'D', bandDAnnual: 2000 },
  'MK': { typicalBand: 'D', bandDAnnual: 2050 },
  'OX': { typicalBand: 'D', bandDAnnual: 2100 },
  'PO': { typicalBand: 'D', bandDAnnual: 2000 },
  'RG': { typicalBand: 'D', bandDAnnual: 1950 },
  'RH': { typicalBand: 'D', bandDAnnual: 2100 },
  'SL': { typicalBand: 'D', bandDAnnual: 1850 },
  'SO': { typicalBand: 'D', bandDAnnual: 1950 },
  'TN': { typicalBand: 'D', bandDAnnual: 2050 },

  // South West
  'BA': { typicalBand: 'D', bandDAnnual: 2100 },
  'BH': { typicalBand: 'D', bandDAnnual: 2050 },
  'BS': { typicalBand: 'D', bandDAnnual: 2100 },
  'DT': { typicalBand: 'D', bandDAnnual: 2200 },
  'EX': { typicalBand: 'D', bandDAnnual: 2150 },
  'GL': { typicalBand: 'D', bandDAnnual: 2050 },
  'PL': { typicalBand: 'D', bandDAnnual: 2100 },
  'SN': { typicalBand: 'D', bandDAnnual: 2050 },
  'SP': { typicalBand: 'D', bandDAnnual: 2100 },
  'TA': { typicalBand: 'D', bandDAnnual: 2150 },
  'TQ': { typicalBand: 'D', bandDAnnual: 2150 },
  'TR': { typicalBand: 'D', bandDAnnual: 2200 },

  // East of England
  'AL': { typicalBand: 'D', bandDAnnual: 1900 },
  'CB': { typicalBand: 'D', bandDAnnual: 2000 },
  'CM': { typicalBand: 'D', bandDAnnual: 1950 },
  'CO': { typicalBand: 'D', bandDAnnual: 2000 },
  'IP': { typicalBand: 'D', bandDAnnual: 2050 },
  'LU': { typicalBand: 'D', bandDAnnual: 1950 },
  'NR': { typicalBand: 'D', bandDAnnual: 2100 },
  'PE': { typicalBand: 'D', bandDAnnual: 2050 },
  'SG': { typicalBand: 'D', bandDAnnual: 1950 },
  'SS': { typicalBand: 'D', bandDAnnual: 1900 },

  // West Midlands
  'B': { typicalBand: 'D', bandDAnnual: 1900 },
  'CV': { typicalBand: 'D', bandDAnnual: 1950 },
  'DY': { typicalBand: 'D', bandDAnnual: 1850 },
  'HR': { typicalBand: 'D', bandDAnnual: 2100 },
  'ST': { typicalBand: 'D', bandDAnnual: 1900 },
  'TF': { typicalBand: 'D', bandDAnnual: 1950 },
  'WR': { typicalBand: 'D', bandDAnnual: 2050 },
  'WS': { typicalBand: 'D', bandDAnnual: 1850 },
  'WV': { typicalBand: 'D', bandDAnnual: 1900 },

  // East Midlands
  'DE': { typicalBand: 'D', bandDAnnual: 2000 },
  'LE': { typicalBand: 'D', bandDAnnual: 2000 },
  'LN': { typicalBand: 'D', bandDAnnual: 2050 },
  'NG': { typicalBand: 'D', bandDAnnual: 2100 },
  'NN': { typicalBand: 'D', bandDAnnual: 1950 },

  // Yorkshire
  'BD': { typicalBand: 'D', bandDAnnual: 1950 },
  'DN': { typicalBand: 'D', bandDAnnual: 1950 },
  'HD': { typicalBand: 'D', bandDAnnual: 2000 },
  'HG': { typicalBand: 'D', bandDAnnual: 2100 },
  'HU': { typicalBand: 'D', bandDAnnual: 2050 },
  'HX': { typicalBand: 'D', bandDAnnual: 2000 },
  'LS': { typicalBand: 'D', bandDAnnual: 1950 },
  'S': { typicalBand: 'D', bandDAnnual: 1950 },
  'WF': { typicalBand: 'D', bandDAnnual: 1950 },
  'YO': { typicalBand: 'D', bandDAnnual: 2100 },

  // North West
  'BB': { typicalBand: 'D', bandDAnnual: 2000 },
  'BL': { typicalBand: 'D', bandDAnnual: 2000 },
  'CA': { typicalBand: 'D', bandDAnnual: 2100 },
  'CH': { typicalBand: 'D', bandDAnnual: 1950 },
  'CW': { typicalBand: 'D', bandDAnnual: 1950 },
  'FY': { typicalBand: 'D', bandDAnnual: 2050 },
  'L': { typicalBand: 'D', bandDAnnual: 2000 },
  'LA': { typicalBand: 'D', bandDAnnual: 2150 },
  'M': { typicalBand: 'D', bandDAnnual: 1950 },
  'OL': { typicalBand: 'D', bandDAnnual: 2000 },
  'PR': { typicalBand: 'D', bandDAnnual: 2050 },
  'SK': { typicalBand: 'D', bandDAnnual: 1950 },
  'WA': { typicalBand: 'D', bandDAnnual: 1950 },
  'WN': { typicalBand: 'D', bandDAnnual: 2000 },

  // North East
  'DH': { typicalBand: 'D', bandDAnnual: 2100 },
  'DL': { typicalBand: 'D', bandDAnnual: 2050 },
  'NE': { typicalBand: 'D', bandDAnnual: 2100 },
  'SR': { typicalBand: 'D', bandDAnnual: 2050 },
  'TS': { typicalBand: 'D', bandDAnnual: 2100 },

  // Wales
  'CF': { typicalBand: 'D', bandDAnnual: 1750 },
  'LD': { typicalBand: 'D', bandDAnnual: 1800 },
  'LL': { typicalBand: 'D', bandDAnnual: 1750 },
  'NP': { typicalBand: 'D', bandDAnnual: 1800 },
  'SA': { typicalBand: 'D', bandDAnnual: 1850 },
  'SY': { typicalBand: 'D', bandDAnnual: 1900 },

  // Scotland
  'AB': { typicalBand: 'D', bandDAnnual: 1500 },
  'DD': { typicalBand: 'D', bandDAnnual: 1550 },
  'EH': { typicalBand: 'D', bandDAnnual: 1600 },
  'FK': { typicalBand: 'D', bandDAnnual: 1500 },
  'G': { typicalBand: 'D', bandDAnnual: 1550 },
  'IV': { typicalBand: 'D', bandDAnnual: 1500 },
  'KA': { typicalBand: 'D', bandDAnnual: 1550 },
  'KW': { typicalBand: 'D', bandDAnnual: 1500 },
  'KY': { typicalBand: 'D', bandDAnnual: 1500 },
  'ML': { typicalBand: 'D', bandDAnnual: 1550 },
  'PA': { typicalBand: 'D', bandDAnnual: 1550 },
  'PH': { typicalBand: 'D', bandDAnnual: 1500 },
  'TD': { typicalBand: 'D', bandDAnnual: 1500 },

  // Northern Ireland
  'BT': { typicalBand: 'D', bandDAnnual: 1400 },
};

// Band multipliers relative to Band D
const BAND_MULTIPLIERS: Record<string, number> = {
  A: 6 / 9,
  B: 7 / 9,
  C: 8 / 9,
  D: 1,
  E: 11 / 9,
  F: 13 / 9,
  G: 15 / 9,
  H: 2,
};

function getPostcodePrefix(postcode: string): string {
  const clean = postcode.replace(/\s+/g, '').toUpperCase();
  // Try 2-char prefix first, then 1-char
  const twoChar = clean.substring(0, 2);
  if (/^[A-Z]{2}$/.test(twoChar) && REGION_PROFILES[twoChar]) {
    return twoChar;
  }
  const oneChar = clean.substring(0, 1);
  if (REGION_PROFILES[oneChar]) {
    return oneChar;
  }
  return twoChar;
}

export async function getCouncilTaxData(
  postcode: string,
  adminDistrict?: string
): Promise<CouncilTaxData> {
  const prefix = getPostcodePrefix(postcode);
  const profile = REGION_PROFILES[prefix] || { typicalBand: 'D', bandDAnnual: 2000 };

  const band = profile.typicalBand;
  const multiplier = BAND_MULTIPLIERS[band] || 1;
  const annualAmount = Math.round(profile.bandDAnnual * multiplier);
  const monthlyAmount = Math.round(annualAmount / 12);

  return {
    estimatedBand: band,
    annualAmount,
    monthlyAmount,
    councilName: adminDistrict || 'Local Authority',
    isEstimate: true,
    note: 'Estimate based on regional averages. Actual amount varies by property band and council. Check your council website for exact figures.',
  };
}
