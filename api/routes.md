# Routes

All routes are prefixed with an `/api`

## Person

- `/person/both/<id>`
  - **in:** wca_id (e.g. 2018GUIM02)
  - **out:** TODO 

- `/person/average/<id>`
  - **in:** wca_id (e.g. 2018GUIM02)
  - **out:** TODO

- `/person/single/<id>`
  - **in:** wca_id (e.g. 2018GUIM02
  - **out:** TODO

## Ranking

- `/ranking/average/<event_id>/<state_id>
  - **in**: event (e.g. 333OH) and state (e.g. RJ)
  - **out:** ```
[
  {
    wcaID: "2017TESC01",
    name: "Pedro xxxxx",
    average: 15.91,
    ranking: 1,
    times: [10.91, 11.91, -1, 13.04, 56.10],
    registered: false,
    compName: "Brasileiro 2024"
  },
  {
    wcaID: "2018GUIM02",
    name: "Daniel xxxxx",
    average: 20.12,
    ranking: 2,
    times: [10.00, 12.00, 14.00, 16.00, 18.00],
    registered: true,
    compName: "Planetario 2023"
  }
]
```

- `/ranking/single/<event_id>/<state_id>
  - **in**: event (e.g. 333OH) and state (e.g. RJ)
  - **out:** ```
[
  {
    wcaID: "2017TESC01",
    name: "Pedro xxxxx",
    ranking: 1,
    single: 15.91,
    registered: false,
    compName: "Brasileiro 2024"
  },
  {
    wcaID: "2018GUIM02",
    name: "Daniel xxxxx",
    ranking: 2,
    single: 20.12,
    times: [10.00, 12.00, 14.00, 16.00, 18.00],
    registered: true,
    compName: "Planetario 2023"
  }
]
```

