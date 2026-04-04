const BASE_URL = 'https://api.postcodes.io';

export interface PostcodeResult {
  postcode: string;
  lat: number;
  lng: number;
  admin_district: string;
  region: string;
  country: string;
  parliamentary_constituency: string;
  rural_urban: string;
  codes: {
    nuts: string;
    lsoa: string;
    msoa: string;
    admin_district: string;
    parish: string;
  };
}

interface PostcodesApiResponse {
  status: number;
  result: {
    postcode: string;
    latitude: number;
    longitude: number;
    admin_district: string;
    region: string;
    country: string;
    parliamentary_constituency: string;
    rural_urban: string;
    codes: {
      nuts: string;
      lsoa: string;
      msoa: string;
      admin_district: string;
      parish: string;
    };
  } | null;
}

interface PostcodesValidateResponse {
  status: number;
  result: boolean;
}

export async function lookupPostcode(postcode: string): Promise<PostcodeResult | null> {
  try {
    const encoded = encodeURIComponent(postcode.trim());
    const res = await fetch(`${BASE_URL}/postcodes/${encoded}`);

    if (!res.ok) {
      return null;
    }

    const data: PostcodesApiResponse = await res.json();

    if (!data.result) {
      return null;
    }

    const r = data.result;

    return {
      postcode: r.postcode,
      lat: r.latitude,
      lng: r.longitude,
      admin_district: r.admin_district,
      region: r.region,
      country: r.country,
      parliamentary_constituency: r.parliamentary_constituency,
      rural_urban: r.rural_urban,
      codes: {
        nuts: r.codes.nuts,
        lsoa: r.codes.lsoa,
        msoa: r.codes.msoa,
        admin_district: r.codes.admin_district,
        parish: r.codes.parish,
      },
    };
  } catch {
    return null;
  }
}

export async function validatePostcode(postcode: string): Promise<boolean> {
  try {
    const encoded = encodeURIComponent(postcode.trim());
    const res = await fetch(`${BASE_URL}/postcodes/${encoded}/validate`);

    if (!res.ok) {
      return false;
    }

    const data: PostcodesValidateResponse = await res.json();
    return data.result;
  } catch {
    return false;
  }
}
