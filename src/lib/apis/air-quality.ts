/**
 * Air quality data using the Open-Meteo Air Quality API (free, no key required).
 * Returns current pollutant levels and an overall rating.
 */

export interface AirQualityData {
  aqi: number;
  pm25: number;
  pm10: number;
  no2: number;
  ozone: number;
  rating: 'Good' | 'Moderate' | 'Poor' | 'Very Poor';
  note: string;
}

interface OpenMeteoAirQualityResponse {
  current?: {
    pm10?: number;
    pm2_5?: number;
    nitrogen_dioxide?: number;
    ozone?: number;
    european_aqi?: number;
  };
}

function getAQIRating(aqi: number): AirQualityData['rating'] {
  if (aqi <= 25) return 'Good';
  if (aqi <= 50) return 'Moderate';
  if (aqi <= 75) return 'Poor';
  return 'Very Poor';
}

export async function getAirQualityData(lat: number, lng: number): Promise<AirQualityData> {
  try {
    const url = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lng}&current=pm10,pm2_5,nitrogen_dioxide,ozone,european_aqi`;

    const res = await fetch(url, {
      signal: AbortSignal.timeout(5000),
    });

    if (!res.ok) {
      throw new Error(`Air quality API returned ${res.status}`);
    }

    const data: OpenMeteoAirQualityResponse = await res.json();

    if (!data.current) {
      throw new Error('No current air quality data available');
    }

    const aqi = data.current.european_aqi ?? 30;
    const pm25 = data.current.pm2_5 ?? 0;
    const pm10 = data.current.pm10 ?? 0;
    const no2 = data.current.nitrogen_dioxide ?? 0;
    const ozone = data.current.ozone ?? 0;

    return {
      aqi,
      pm25: Math.round(pm25 * 10) / 10,
      pm10: Math.round(pm10 * 10) / 10,
      no2: Math.round(no2 * 10) / 10,
      ozone: Math.round(ozone * 10) / 10,
      rating: getAQIRating(aqi),
      note: 'Current air quality from European AQI. Lower values indicate cleaner air.',
    };
  } catch {
    return {
      aqi: 0,
      pm25: 0,
      pm10: 0,
      no2: 0,
      ozone: 0,
      rating: 'Moderate',
      note: 'Unable to fetch air quality data at this time.',
    };
  }
}
