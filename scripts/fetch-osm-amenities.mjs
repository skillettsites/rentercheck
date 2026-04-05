import { writeFileSync, existsSync, readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OVERPASS = 'https://overpass-api.de/api/interpreter';

async function queryOverpass(query) {
  const res = await fetch(OVERPASS, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'User-Agent': 'RenterCheck-DataBuild/1.0',
    },
    body: `data=${encodeURIComponent(query)}`,
    signal: AbortSignal.timeout(120000),
  });
  if (!res.ok) throw new Error(`Overpass returned ${res.status}`);
  const text = await res.text();
  if (!text.startsWith('{')) throw new Error('Non-JSON response');
  const data = JSON.parse(text);
  return data.elements || [];
}

function extractEntry(el) {
  const lat = el.lat || el.center?.lat;
  const lon = el.lon || el.center?.lon;
  if (!lat || !lon) return null;
  const name = el.tags?.name || el.tags?.brand || '';
  if (!name) return null;
  return { n: name, la: Math.round(lat * 10000) / 10000, lo: Math.round(lon * 10000) / 10000 };
}

// Split UK into regional bounding boxes to avoid Overpass timeouts
const REGIONS = [
  { name: 'London', bbox: '51.28,-0.51,51.69,0.34' },
  { name: 'SouthEast', bbox: '50.7,-1.9,51.5,1.5' },
  { name: 'SouthWest', bbox: '49.9,-5.7,51.5,-1.9' },
  { name: 'EastAnglia', bbox: '51.5,-0.5,53.0,1.8' },
  { name: 'Midlands', bbox: '52.0,-3.2,53.2,0.0' },
  { name: 'NorthWest', bbox: '53.0,-3.2,54.6,-1.8' },
  { name: 'NorthEast', bbox: '53.5,-2.5,55.8,0.0' },
  { name: 'Wales', bbox: '51.3,-5.3,53.5,-2.6' },
  { name: 'Scotland', bbox: '54.6,-7.6,58.7,-0.7' },
];

async function fetchForRegions(tag, value, label) {
  const all = [];
  const seen = new Set();
  for (const region of REGIONS) {
    const [s, w, n, e] = region.bbox.split(',');
    console.log(`  ${label} in ${region.name}...`);
    try {
      const query = `[out:json][timeout:90];(node["${tag}"="${value}"](${s},${w},${n},${e});way["${tag}"="${value}"](${s},${w},${n},${e}););out center;`;
      const elements = await queryOverpass(query);
      for (const el of elements) {
        const entry = extractEntry(el);
        if (!entry) continue;
        const key = `${entry.la},${entry.lo}`;
        if (seen.has(key)) continue;
        seen.add(key);
        all.push(entry);
      }
      console.log(`    ${elements.length} raw, ${all.length} total unique`);
    } catch (err) {
      console.log(`    FAILED: ${err.message}`);
    }
    // Brief pause between queries
    await new Promise(r => setTimeout(r, 3000));
  }
  return all;
}

async function main() {
  const outDir = join(__dirname, '..', 'src', 'data');

  // Parks
  console.log('=== PARKS ===');
  const parks = await fetchForRegions('leisure', 'park', 'Parks');
  const greenPath = join(outDir, 'greenspaces.json');
  writeFileSync(greenPath, JSON.stringify(parks));
  console.log(`Written greenspaces.json: ${parks.length} entries (${(JSON.stringify(parks).length / 1024 / 1024).toFixed(1)}MB)\n`);

  console.log('Waiting 15s...\n');
  await new Promise(r => setTimeout(r, 15000));

  // Supermarkets
  console.log('=== SUPERMARKETS ===');
  const supermarkets = await fetchForRegions('shop', 'supermarket', 'Supermarkets');

  console.log('Waiting 15s...\n');
  await new Promise(r => setTimeout(r, 15000));

  // Convenience stores
  console.log('=== CONVENIENCE ===');
  const convenience = await fetchForRegions('shop', 'convenience', 'Convenience');

  const amenPath = join(outDir, 'amenities.json');
  writeFileSync(amenPath, JSON.stringify({ supermarkets, convenience }));
  console.log(`\nWritten amenities.json: ${supermarkets.length} supermarkets, ${convenience.length} convenience (${(JSON.stringify({ supermarkets, convenience }).length / 1024 / 1024).toFixed(1)}MB)`);

  console.log('\nDone!');
}

main().catch(console.error);
