// Parses a range query string (e.g., '1-9', '1', '1+', '<1', '>1') into { min, max, exact }
export default function parseRangeQuery(query) {
  if (!query) return {};
  query = query.trim();
  if (/^\d+$/.test(query)) {
    // Exact value
    return { exact: Number(query) };
  }
  if (/^\d+\+$/.test(query)) {
    // 1+ means >= 1
    return { min: Number(query.slice(0, -1)) };
  }
  if (/^>\d+(\.\d+)?$/.test(query)) {
    // >1 or >1.5
    return { min: Number(query.slice(1)) + Number.EPSILON };
  }
  if (/^<\d+(\.\d+)?$/.test(query)) {
    // <1 or <1.5
    return { max: Number(query.slice(1)) - Number.EPSILON };
  }
  if (/^\d+-\d+$/.test(query)) {
    // 1-9
    const [min, max] = query.split('-').map(Number);
    return { min, max };
  }
  if (/^\d+(\.\d+)?-\d+(\.\d+)?$/.test(query)) {
    // 0.1-1.5
    const [min, max] = query.split('-').map(Number);
    return { min, max };
  }
  return {};
}

