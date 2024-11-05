# Routes

All routes are prefixed with an `/api`

## Status

```text
-------------------------------------------------
[✅] GET /status/
{
  last_update: "2024-11-05T13:00:00Z" [RFC3339]
}
```

## Auth

```text
[✅] GET /auth/endpoint
{
  url: "https://worldcubeassociation.org/
}
```

```text
[✅] GET /auth/callback
{
  access_token: "xxxx",
  expires_in: 720
}
```

## Person

### Average and single

```text
-------------------------------------------------
[✅] GET /person/info/<id>
    args:
        wca_id (e.g. 2018GUIM02)
{
  name: "Daniel Guimarães",
  state: "RJ",
  registered: false,
  totalCompetitions: 12,
  stateCompetitions: 8,
}
-------------------------------------------------
[✅] GET /person/<mode>/<id>
    args:
        mode ("average" or "single")
        wca_id (e.g. 2018GUIM02)
{
  name: "Daniel xxxxx",
  state: "RJ",
  registered: false,
  rankings: [
    {
      event: "333",
      ranking: 1,
      best: 10.32,
      compName: "Brasileiro 2024",
      times: [10.00, 12.00, 14.00, 16.00, 18.00],
    },
    {
      event: "333OH",
      ranking: 10,
      best: 13.76,
      compName: "Brasileiro 2024",
      times: [10.00, 12.00, 14.00, 16.00, 18.00],
    },
    ...
  ]
}
-------------------------------------------------
[❌] GET /person/table/<id>
    args:
        wca_id (e.g. 2018GUIM02)
{
  table: [
    {
      event: "333",
      single: 10.32,
      average: 11.69,
      rankingSingle: 10,
      rankingAvarege: 100,
    },
    {
      event: "444",
      single: 54.90,
      average: 66.09,
      rankingSingle: 100,
      rankingAverage: 200,
    },
    ...
  ]
}
-------------------------------------------------
```

## Ranking

### By mode, event and state

```text
[❌] GET /ranking/<mode>/<event_id>/<state_id>
    args:
        mode ("average" or "single")
        event (e.g. 333OH)
        state (e.g. RJ)
[
  {
    wcaId: "2017TESC01",
    name: "Pedro xxxxx",
    best: 15.91,
    ranking: 1,
    times: [10.91, 11.91, -1, 13.04, 56.10],
    registered: false,
    compName: "Brasileiro 2024"
  },
  {
    wcaId: "2018GUIM02",
    name: "Daniel xxxxx",
    best: 20.12,
    ranking: 2,
    times: [10.00, 12.00, 14.00, 16.00, 18.00],
    registered: true,
    compName: "Planetario 2023"
  }
]
```
