const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const context = vm.createContext({ window: { addEventListener() {} }, document: { addEventListener() {} } });
const script = [...html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)].map(match => match[1]).join('\n');
vm.runInContext(script, context);
const read = expression => JSON.parse(vm.runInContext(`JSON.stringify(${expression})`, context));
const refineries = read('REFINERIES');
const states = read('STATES');
const dispatch = read('MERIT_PLANTS');

// Independently transcribed PPAC values, April 1, 2026; units converted to MMTPA.
const expected = new Map([
  ['IOCL Digboi', 0.65], ['IOCL Guwahati', 1.2], ['IOCL Koyali', 13.7],
  ['IOCL Barauni', 6], ['IOCL Haldia', 8], ['IOCL Mathura', 8],
  ['IOCL Panipat', 15], ['IOCL Bongaigaon', 2.7], ['IOCL Paradip', 15],
  ['HPCL Mumbai', 9.5], ['HPCL Vizag', 15], ['BPCL Mumbai', 12],
  ['BPCL Kochi', 15.5], ['BPCL Bina', 7.8], ['CPCL Manali', 10.5],
  ['CPCL Cauvery Basin', 0], ['Numaligarh Refinery', 3], ['ONGC Tatipaka', 0.066],
  ['MRPL Mangalore', 15], ['HMEL Bathinda', 11.3], ['HRRL Barmer', 9],
  ['Jamnagar DTA', 33], ['Jamnagar SEZ', 35.2], ['Nayara Vadinar', 20]
]);
assert.equal(refineries.length, expected.size);
for (const refinery of refineries) assert.equal(refinery.capacity, expected.get(refinery.name), refinery.name);
assert.equal(Number(refineries.reduce((sum, r) => sum + r.capacity, 0).toFixed(3)), 267.116);
assert.equal(new Set(refineries.map(r => r.id)).size, refineries.length);
for (const state of states) {
  const total = refineries.filter(r => r.state === state.name).reduce((sum, r) => sum + r.capacity, 0);
  assert.equal(state.refining_mmtpa, Number(total.toFixed(3)), state.name);
}
assert.deepEqual(read("getStateVulnColor('Karnataka')"), read("getStateVulnColor('Andhra Pradesh')"));
assert.deepEqual(read("getStateVulnColor('Orissa')"), read("getStateVulnColor('Odisha')"));
assert.deepEqual(read("getStateVulnColor('unassessed')"), [100, 100, 100, 10]);
assert.equal(dispatch.length, 335);
assert.equal(new Set(dispatch.map(p => p.id)).size, dispatch.length);
assert.equal(dispatch.find(p => p.s === 'Gujarat' && p.r === 2).n, 'UHPS');
assert.equal(dispatch.find(p => p.s === 'Gujarat' && p.r === 2).sc, 0);
assert.equal(dispatch.find(p => p.s === 'Karnataka' && p.r === 1).sc, null);
assert.equal(dispatch.find(p => p.s === 'Tamil Nadu' && p.r === 26).n, 'BALCO');
assert.equal(read("formatMetric(0, 'MWh')"), '0 MWh');
assert.equal(read("formatMetric(null, 'MWh')"), 'Not reported');
assert.equal(read("formatMetric(0, 'Rs/kWh', 2)"), '0.00 Rs/kWh');
for (const p of read('PORTS')) assert.equal('capacity' in p, false, 'Port/refinery capacity must not be conflated');
for (const r of read('ROUTES')) {
  assert.equal('volume_mtpa' in r, false);
  assert.equal('transit_days' in r, false);
}
assert.deepEqual(read('TRANSIT_OBSERVATIONS.map(r => r.count)'), [11, 8, 3]);
assert.match(read('TRANSIT_OBSERVATIONS[2].window'), /partial day/);
assert.deepEqual(read('Object.keys(CASCADE_DATA)'), read('TIMELINE_ORDER'));
assert.doesNotMatch(html, /0 vessels May 18|two consecutive days of zero|423736|10-15% refinery yield|hormuz-transit-pool|first major reinsurer|Mundra_pipeline/);
assert.doesNotMatch(html, /attributionControl:\s*false/);
console.log('PASS: PPAC inventory, state totals, MERIT provenance regressions, missing values, source exclusions and timeline schema.');
