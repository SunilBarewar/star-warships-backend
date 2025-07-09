import { parseCrew, parseHyperdrive } from './parsers.util.js';
import parseRangeQuery from './parseRangeQuery.util.js';

export function filterByCrew(starships, crewQuery) {
  const range = parseRangeQuery(crewQuery);
  
  return starships.filter(ship => {
    const [crewMin, crewMax] = parseCrew(ship.properties.crew);
    if (range.exact !== undefined) return crewMin <= range.exact && crewMax >= range.exact;
    if (range.min !== undefined && range.max !== undefined) return crewMax >= range.min && crewMin <= range.max;
    if (range.min !== undefined) return crewMax >= range.min;
    if (range.max !== undefined) return crewMin <= range.max;
    return true;
  });
}

export function filterByHyperdrive(starships, hyperdriveQuery) {
  const range = parseRangeQuery(hyperdriveQuery);
  return starships.filter(ship => {
    const rating = parseHyperdrive(ship.properties.hyperdrive_rating);
    if (isNaN(rating)) return false;
    if (range.exact !== undefined) return rating === range.exact;
    if (range.min !== undefined && range.max !== undefined) return rating >= range.min && rating <= range.max;
    if (range.min !== undefined) return rating >= range.min;
    if (range.max !== undefined) return rating <= range.max;
    return true;
  });
}

export function searchByName(starships, search) {
  if (!search) return starships;
  return starships.filter(ship =>
    ship.properties.name.toLowerCase().includes(search.toLowerCase())
  );
}

export function sortByHyperdrive(starships, order = 'asc') {
  return starships.slice().sort((a, b) => {
    const aRating = parseHyperdrive(a.properties.hyperdrive_rating);
    const bRating = parseHyperdrive(b.properties.hyperdrive_rating);
    if (isNaN(aRating)) return 1;
    if (isNaN(bRating)) return -1;
    return order === 'asc' ? aRating - bRating : bRating - aRating;
  });
}

 