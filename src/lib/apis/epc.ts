const NEW_API_BASE = 'https://api.get-energy-performance-data.communities.gov.uk';
const LEGACY_API_BASE = 'https://epc.opendatacommunities.org/api/v1/domestic/search';

// Band midpoints for estimating numeric efficiency from letter grades
const BAND_MIDPOINTS: Record<string, number> = {
  A: 95, B: 86, C: 74, D: 62, E: 47, F: 30, G: 10,
};

export interface EPCRecord {
  address: string;
  currentEnergyRating: string;
  currentEnergyEfficiency: number;
  propertyType: string;
  builtForm: string;
  floorDescription: string;
  wallsDescription: string;
  roofDescription: string;
  windowsDescription: string;
  mainHeatingDescription: string;
  hotwaterDescription: string;
  lodgementDate: string;
}

export interface EPCSummary {
  averageEfficiency: number;
  averageRating: string;
  bandDistribution: Record<string, number>;
  mostCommonPropertyType: string;
  totalRecords: number;
}

export interface EPCData {
  records: EPCRecord[];
  summary: EPCSummary;
}

function efficiencyToRating(efficiency: number): string {
  if (efficiency >= 92) return 'A';
  if (efficiency >= 81) return 'B';
  if (efficiency >= 69) return 'C';
  if (efficiency >= 55) return 'D';
  if (efficiency >= 39) return 'E';
  if (efficiency >= 21) return 'F';
  return 'G';
}

function formatPostcode(postcode: string): string {
  const cleaned = postcode.replace(/\s+/g, '').toUpperCase();
  if (cleaned.length < 5) return cleaned;
  return `${cleaned.slice(0, -3)} ${cleaned.slice(-3)}`;
}

function computeSummary(records: EPCRecord[]): EPCSummary {
  const bands = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
  const bandCounts: Record<string, number> = {};
  for (const band of bands) bandCounts[band] = 0;

  for (const record of records) {
    const rating = record.currentEnergyRating.toUpperCase();
    if (rating in bandCounts) bandCounts[rating]++;
  }

  const validEfficiencies = records.filter((r) => r.currentEnergyEfficiency > 0);
  const averageEfficiency =
    validEfficiencies.length > 0
      ? Math.round(validEfficiencies.reduce((sum, r) => sum + r.currentEnergyEfficiency, 0) / validEfficiencies.length)
      : 0;

  const bandDistribution: Record<string, number> = {};
  for (const band of bands) {
    bandDistribution[band] = records.length > 0 ? Math.round((bandCounts[band] / records.length) * 100) : 0;
  }

  const typeCounts: Record<string, number> = {};
  for (const record of records) {
    const pType = record.propertyType || 'Unknown';
    typeCounts[pType] = (typeCounts[pType] ?? 0) + 1;
  }
  const mostCommonPropertyType = Object.entries(typeCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? 'Unknown';

  return {
    averageEfficiency,
    averageRating: efficiencyToRating(averageEfficiency),
    bandDistribution,
    mostCommonPropertyType,
    totalRecords: records.length,
  };
}

// New MHCLG API (Bearer token)
async function getEPCDataNew(postcode: string): Promise<EPCData | null> {
  const rawToken = process.env.EPC_API_TOKEN;
  const token = rawToken?.replace(/\\n/g, '').replace(/\n/g, '').trim();
  if (!token) return null;

  try {
    const formatted = formatPostcode(postcode);
    const res = await fetch(
      `${NEW_API_BASE}/api/domestic/search?postcode=${encodeURIComponent(formatted)}&page_size=100`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      }
    );

    if (!res.ok) return null;

    const json = await res.json();
    const data = json.data;
    if (!Array.isArray(data) || data.length === 0) return null;

    const records: EPCRecord[] = data.map((rec: Record<string, string>) => {
      const band = (rec.currentEnergyEfficiencyBand || '').toUpperCase();
      return {
        address: rec.address || '',
        currentEnergyRating: band,
        currentEnergyEfficiency: BAND_MIDPOINTS[band] || 0,
        propertyType: rec.propertyType || '',
        builtForm: rec.builtForm || '',
        floorDescription: rec.floorDescription || '',
        wallsDescription: rec.wallsDescription || '',
        roofDescription: rec.roofDescription || '',
        windowsDescription: rec.windowsDescription || '',
        mainHeatingDescription: rec.mainHeatDescription || '',
        hotwaterDescription: rec.hotWaterDescription || '',
        lodgementDate: rec.lodgementDate || '',
      };
    });

    return { records, summary: computeSummary(records) };
  } catch {
    return null;
  }
}

// Legacy API fallback (Basic auth, retiring mid-2026)
async function getEPCDataLegacy(postcode: string): Promise<EPCData | null> {
  const email = (process.env.EPC_EMAIL || '').replace(/\\n/g, '').replace(/\n/g, '').trim();
  const key = (process.env.EPC_API_KEY || '').replace(/\\n/g, '').replace(/\n/g, '').trim();
  if (!email || !key) return null;

  try {
    const encoded = encodeURIComponent(postcode.replace(/\s+/g, ''));
    const token = Buffer.from(`${email}:${key}`).toString('base64');

    const res = await fetch(`${LEGACY_API_BASE}?postcode=${encoded}&size=50`, {
      headers: {
        Authorization: `Basic ${token}`,
        Accept: 'application/json',
      },
    });

    if (!res.ok) return null;

    const data = await res.json();
    const rows = data.rows ?? [];
    if (rows.length === 0) return null;

    const records: EPCRecord[] = rows.map((row: Record<string, string>) => ({
      address: row.address ?? '',
      currentEnergyRating: (row['current-energy-rating'] ?? '').toUpperCase(),
      currentEnergyEfficiency: parseInt(row['current-energy-efficiency'] ?? '0', 10),
      propertyType: row['property-type'] ?? '',
      builtForm: row['built-form'] ?? '',
      floorDescription: row['floor-description'] ?? '',
      wallsDescription: row['walls-description'] ?? '',
      roofDescription: row['roof-description'] ?? '',
      windowsDescription: row['windows-description'] ?? '',
      mainHeatingDescription: row['main-heating-description'] ?? '',
      hotwaterDescription: row['hotwater-description'] ?? '',
      lodgementDate: row['lodgement-date'] ?? '',
    }));

    return { records, summary: computeSummary(records) };
  } catch {
    return null;
  }
}

// Try new API first, fall back to legacy
export async function getEPCData(postcode: string): Promise<EPCData | null> {
  const result = await getEPCDataNew(postcode);
  if (result) return result;
  return getEPCDataLegacy(postcode);
}
