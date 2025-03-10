# Routes

All routes are prefixed with an `/api`

## Status

### [✅] `GET /status/`

Get status of database update

```jsonc
{
  "lastUpdate": "string" // datetime in RFC3339
}
```

## Auth

### [✅] `GET /auth/endpoint`

Get authentication oauth endpoint

```jsonc
{
  "url": "string" // url for oauth endpoint
}
```

### [✅] `GET /auth/callback`

Information retrieved from oauth callback

```jsonc
{
  "accessToken": "string", // to be used in register state endpoint
  "expiresIn": "int", // ttl in seconds,
  "name": "string", // name of competitor
  "wcaId": "string",
  "register": {
    "canRegister": "bool", // can be registered (is from brazil)
    "stateId": "string | null", // current registered state
    "updated": "string | null" // datetime in RFC3339 of last update (cannot change again in X days)
  }
}
```

### [✅] `POST /auth/register`

body:

```jsonc
{
  "accessToken": "string",
  "wcaId": "string",     // optional
  "stateId": "string",   // e.g. RJ
}

response:

- `200`: ```<empty>```
- `400`: ```{"error": "wait 24h before registering again"}
- `4xx`: ```{"error": "..."}```

```

## Person

### [✅] `GET /person/info/<wca_id>`

Get general information of competitor

- `<wca_id>`: competitiors's wca id (e.g. 2018GUIM02)

```jsonc
{
  "name": "string", // name of competitor
  "state": "string", // state id (guessed or registered)
  "registered": "bool", // if is registered (to be able to add a check next to hist name)
  "totalCompetitions": "int", // number of competitions competed
  "stateCompetitions": "int" // number of competitions competed in his state
}
```

### [✅] `GET /person/<mode>/<id>`

Get average or single of competitor

- `<mode>`: "average" or "single"
- `<wca_id>`: competitor's wca id (e.g. 2018GUIM02)

```jsonc
{
  "name": "string",
  "state": "string", // state id
  "registered": "bool", // is registered
  "rankings": [
    {
      "event": "string", // event_id, e.g. 333
      "ranking": "int", // starting from 1
      "best": "int", // competitor's time (read format.md)
      "compId": "string", // https://www.worldcubeassociation.org/competitions/:id
      "compName": "string", // name of competition
      "compState": "string | null", // state of competition, may be null if multiple cities
      "times": "int[5]" // the average in which he obtained his average/single time. not really useful
    }
  ]
}
```

### [✅] `GET /person/table/<id>`

Get information of competitor in a similiar style as the wca's page. May be used directly in a table

- `<wca_id>`: (e.g. 2018GUIM02)

```jsonc
{
  "table": [
    {
      "event": "string", // e.g. 333, 444, sq1, mbld
      "single": "int", // single time (read format.md)
      "average": "int", // average time (read format.md)
      "rankingSingle": "int", // ranking by single by competitor's state
      "rankingAvarege": "int" // ranking by average by competitor's state
    }
  ]
}
```

## Ranking

Get ranking by average or single, by event, by state
Will support national ranking (state = BR)

Might be simplified, like the /table/ endpoint above

### [✅] `GET /ranking/<mode>/<event_id>/<state_id>`

- `<mode>`: "average" or "single"
- `<event_id>`: event id (e.g. 333OH, sq1)
- `<state_id>`: state id (e.g. RJ. BR (national ranking) is not supported yet)

- query arg: `p`: pagination page (starting from 0)
- query arg: `q`: pagination quantity per page (default no pagination, max 50)

```jsonc
[
  {
    "name": "string",
    "wcaId": "string",
    "stateId": "string",
    "best": "int",
    "registered": "bool",
    "compId": "string",
    "compName": "string",
    "compState": "string",
    "times": ["int", "int", "int", "int", "int"],
  },
]
```
