import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const csvPath = join('C:', 'Users', 'daves', 'AppData', 'Local', 'Temp', 'rentercheck-data', 'cqc.csv');

const raw = readFileSync(csvPath, 'utf-8');
const lines = raw.split('\n');

console.log(`Total lines: ${lines.length}`);

// Extract healthcare facilities with simple CSV parsing
const facilities = [];
const postcodeSet = new Set();

for (const line of lines) {
  // Parse CSV respecting quotes
  const parts = [];
  let current = '';
  let inQuotes = false;
  for (const char of line) {
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      parts.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  parts.push(current.trim());

  const name = parts[0] || '';
  const postcode = (parts[3] || '').trim().toUpperCase();
  const type = (parts[6] || '').toLowerCase();

  if (!postcode || !name) continue;
  if (!/^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/i.test(postcode)) continue;

  let category = '';
  if (type.includes('doctors') || type.includes('gp')) category = 'gp';
  else if (type.includes('dentist')) category = 'dentist';
  else if (type.includes('hospital')) category = 'hospital';
  else if (type.includes('pharmacy')) category = 'pharmacy';
  else continue;

  const cleanPC = postcode.replace(/\s+/g, '');
  postcodeSet.add(cleanPC);
  facilities.push({ n: name, pc: postcode, t: category, _cleanPC: cleanPC });
}

console.log(`Extracted ${facilities.length} healthcare facilities`);
console.log(`Unique postcodes: ${postcodeSet.size}`);

// Bulk geocode via postcodes.io
const postcodeList = Array.from(postcodeSet);
const postcodeCoords = {};

for (let i = 0; i < postcodeList.length; i += 100) {
  const batch = postcodeList.slice(i, i + 100);
  try {
    const res = await fetch('https://api.postcodes.io/postcodes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ postcodes: batch }),
    });
    const data = await res.json();
    for (const result of (data.result || [])) {
      if (result.result) {
        postcodeCoords[result.query.replace(/\s+/g, '').toUpperCase()] = [
          Math.round(result.result.latitude * 10000) / 10000,
          Math.round(result.result.longitude * 10000) / 10000,
        ];
      }
    }
  } catch (e) {
    console.error(`Batch ${i} failed:`, e.message);
  }
  if (i % 500 === 0 && i > 0) console.log(`Geocoded ${i}/${postcodeList.length}`);
}

console.log(`Geocoded ${Object.keys(postcodeCoords).length} postcodes`);

// Build compact JSON: [name, type, lat, lng]
const output = facilities
  .map(f => {
    const coords = postcodeCoords[f._cleanPC];
    if (!coords) return null;
    return { n: f.n, t: f.t, la: coords[0], lo: coords[1] };
  })
  .filter(Boolean);

console.log(`Final: ${output.length} facilities with coordinates`);

const outPath = join(__dirname, '..', 'src', 'data', 'healthcare.json');
writeFileSync(outPath, JSON.stringify(output));
const sizeMB = (JSON.stringify(output).length / 1024 / 1024).toFixed(1);
console.log(`Written ${outPath} (${sizeMB}MB)`);
