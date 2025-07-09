# Star Wars Fleet Management API

## GET /api/starships

Returns a paginated, filterable, and sortable list of starships.

### Query Parameters

- `search` (string, optional):
  - Search starships by name (case-insensitive substring match).
  - Example: `?search=Falcon`

- `crew` (string, optional):
  - Filter by crew size using flexible range syntax:
    - `1-9` → crew between 1 and 9 (inclusive)
    - `1` → crew exactly 1
    - `1+` or `>1` → crew greater than or equal to 1
    - `<1` → crew less than 1
    - `>1` → crew greater than 1
  - Example: `?crew=1-5`, `?crew=50+`, `?crew=1`, `?crew=<10`

- `hyperdrive` (string, optional):
  - Filter by hyperdrive rating using flexible range syntax:
    - `0.1-1.5` → rating between 0.1 and 1.5 (inclusive)
    - `1` → rating exactly 1
    - `1+` or `>1` → rating greater than or equal to 1
    - `<1` → rating less than 1
    - `>1` → rating greater than 1
  - Example: `?hyperdrive=0.5-2.0`, `?hyperdrive=<1.0`, `?hyperdrive=1+`

- `sort` (string, optional):
  - Sort by hyperdrive rating. Allowed values: `asc`, `desc`.
  - Example: `?sort=asc`

- `page` (number, optional):
  - Page number for pagination (default: 1).
  - Example: `?page=2`

- `limit` (number, optional):
  - Number of results per page (default: 10).
  - Example: `?limit=20`

### Example Requests

- `/api/starships?search=Falcon&crew=1-8&hyperdrive=0.5-2.0&sort=asc&page=1&limit=5`
- `/api/starships?crew=50+`
- `/api/starships?hyperdrive=<1.0&sort=desc`
- `/api/starships?crew=1`
- `/api/starships?hyperdrive=>0.5`

### Response Format

```
{
  "data": [
    {
      "uid": "10",
      "name": "Millennium Falcon",
      "model": "YT-1300 light freighter",
      ...
    },
    ...
  ],
  "total": 2,
  "page": 1,
  "totalPages": 1
}
```

## GET /api/starships/:id

Returns details for a single starship by its `uid` or `_id`.

--- 