package models

import "time"

type ModelWithTimes interface {
	GetTS() time.Time
	GetKey() string
}

func UpdateWithBetterTimestamp[T ModelWithTimes](m map[string]T, p T) map[string]T {
	curr, ok := m[p.GetKey()]
	if !ok {
		m[p.GetKey()] = p
		return m
	}
	// check ts
	// if is after, ignore
	if curr.GetTS().After(p.GetTS()) {
		return m
	}
	// if is equals, check round (higher wins)
	// if curr.Ts.Equal(p.Ts) {
	// 	if curr.Round > p.Round {
	// 		return m
	// 	}
	// }
	// if is before, or higher round, update
	m[p.GetKey()] = p
	return m
}
