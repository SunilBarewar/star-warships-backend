import { ENV_VARS } from "../config/envConfig.js";
import warshipsData from "../constants/data.const.js";
import {
  filterByCrew,
  filterByHyperdrive,
  searchByName,
  sortByHyperdrive,
} from "../utils/filters.util.js";

export function getStarships(req, res) {
  let { search = "", crew, hyperdrive, sort, page = 1, limit = 10 } = req.query;
  page = parseInt(page, 10);
  limit = parseInt(limit, 10);

  let filtered = warshipsData;

  filtered = searchByName(filtered, search);
  if (crew) filtered = filterByCrew(filtered, crew);
  if (hyperdrive) filtered = filterByHyperdrive(filtered, hyperdrive);
  if (sort === "asc" || sort === "desc")
    filtered = sortByHyperdrive(filtered, sort);

  const total = filtered.length;
  const totalPages = Math.ceil(total / limit);
  const start = (page - 1) * limit;
  const end = start + limit;
  const data = filtered.slice(start, end);

  res.json({
    data: data.map((ship) => ({
      uid: ship.uid,
      ...ship.properties,
    })),
    totalItems: total,
    currentPage: page,
    totalPages,
    itemsPerPage: limit,
    next:
      page < totalPages
        ? `${ENV_VARS.BASE_API_ENDPOINT}/api/starships?page=${page + 1}`
        : null,
    prev:
      page > 1
        ? `${ENV_VARS.BASE_API_ENDPOINT}/api/starships?page=${page - 1}`
        : null,
  });
}

// GET /api/starships/:id
export function getStarshipById(req, res) {
  const { id } = req.params;
  const ship = warshipsData.find((s) => s.uid === id || s._id === id);
  if (!ship) {
    return res.status(404).json({ error: "Starship not found" });
  }
  res.json({
    uid: ship.uid,
    ...ship.properties,
  });
}
