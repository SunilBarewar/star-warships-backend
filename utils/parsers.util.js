 

export function parseCrew(crewStr) {
  if (!crewStr) return [0, 0];
  // Remove commas and handle ranges
  if (crewStr.includes('-')) {
    const [min, max] = crewStr.split('-').map(s => parseInt(s.replace(/,/g, ''), 10));
    return [min || 0, max || 0];
  }
  const num = parseInt(crewStr.replace(/,/g, ''), 10);
  if (isNaN(num)) return [0, 0];
  return [num, num];
}

export function parseHyperdrive(hyperdriveStr) {
  if (!hyperdriveStr) return NaN;
  const num = parseFloat(hyperdriveStr);
  return isNaN(num) ? NaN : num;
}
 