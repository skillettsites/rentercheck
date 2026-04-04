const BASE_URL = 'https://epc.opendatacommunities.org/api/v1/domestic/search';

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

interface EPCApiRow {
  address: string;
  'current-energy-rating': string;
  'current-energy-efficiency': string;
  'property-type': string;
  'built-form': string;
  'floor-description': string;
  'walls-description': string;
  'roof-description': string;
  'windows-description': string;
  'main-heating-description': string;
  'hotwater-description': string;
  'lodgement-date': string;
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

export async function getEPCData(postcode: string): Promise<EPCData | null> {
  try {
    const email = process.env.EPC_EMAIL;
    const apiKey = process.env.EPC_API_KEY;

    if (!email || !apiKey) {
      console.warn('EPC API credentials not configured (EPC_EMAIL, EPC_API_KEY)');
      return null;
    }

    const encoded = encodeURIComponent(postcode.trim());
    const token = Buffer.from(`${email}:${apiKey}`).toString('base64');

    const res = await fetch(`${BASE_URL}?postcode=${encoded}&size=50`, {
      headers: {
        Authorization: `Basic ${token}`,
        Accept: 'application/json',
      },
    });

    if (!res.ok) {
      return null;
    }

    const data = await res.json();
    const rows: EPCApiRow[] = data.rows ?? [];

    if (rows.length === 0) {
      return null;
    }

    const records: EPCRecord[] = rows.map((row) => ({
      address: row.address ?? '',
      currentEnergyRating: row['current-energy-rating'] ?? '',
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

    // Compute summary stats
    const validEfficiencies = records.filter((r) => r.currentEnergyEfficiency > 0);
    const averageEfficiency =
      validEfficiencies.length > 0
        ? Math.round(
            validEfficiencies.reduce((sum, r) => sum + r.currentEnergyEfficiency, 0) /
              validEfficiencies.length
          )
        : 0;

    const bands = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
    const bandCounts: Record<string, number> = {};
    for (const band of bands) {
      bandCounts[band] = 0;
    }
    for (const record of records) {
      const rating = record.currentEnergyRating.toUpperCase();
      if (rating in bandCounts) {
        bandCounts[rating]++;
      }
    }

    const bandDistribution: Record<string, number> = {};
    for (const band of bands) {
      bandDistribution[band] = records.length > 0
        ? Math.round((bandCounts[band] / records.length) * 100)
        : 0;
    }

    // Most common property type
    const typeCounts: Record<string, number> = {};
    for (const record of records) {
      const pType = record.propertyType || 'Unknown';
      typeCounts[pType] = (typeCounts[pType] ?? 0) + 1;
    }
    const mostCommonPropertyType = Object.entries(typeCounts).sort(
      (a, b) => b[1] - a[1]
    )[0]?.[0] ?? 'Unknown';

    return {
      records,
      summary: {
        averageEfficiency,
        averageRating: efficiencyToRating(averageEfficiency),
        bandDistribution,
        mostCommonPropertyType,
        totalRecords: records.length,
      },
    };
  } catch {
    return null;
  }
}
