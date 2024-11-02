<script lang="ts">
	import EventText from '../common/EventText.svelte';
	import { timeToString } from '$lib/utils';
	import type { PersonTableProps } from '../../types/person/props';

	let {
		data = [
			{
				event: '333',
				single: 10.32,
				average: 11.69,
				rankingSingle: 10,
				rankingAverage: 100
			},
			{
				event: '444',
				single: 54.9,
				average: 66.09,
				rankingSingle: 100,
				rankingAverage: 200
			},
			{
				event: 'sq1',
				single: 12.0,
				average: 15.55,
				rankingSingle: 2,
				rankingAverage: 2
			},
			{
				event: '333mbf',
				single: 5.12,
				average: 8.73,
				rankingSingle: 10,
				rankingAverage: 100,
			}
		]
	}: PersonTableProps = $props();
</script>

<table>
	<thead>
		<tr>
			<th scope="col">Evento</th>
			<th scope="col">Ranking</th>
			<th scope="col">Tempo único</th>
			<th scope="col">Média</th>
			<th scope="col">Ranking</th>
		</tr>
	</thead>
	<tbody>
		{#each Object.entries(data) as [eventId, eventData]}
			<tr>
				<th scope="row"><EventText id={eventId} /> </th>
				<td>{eventData.rankingSingle}</td>
				<td>{timeToString(eventData.single)}</td>
				<td>{timeToString(eventData.average)}</td>
				<td>{eventData.rankingAverage}</td>
			</tr>
		{/each}
	</tbody>
</table>

<style>
	table {
		border-collapse: collapse;
		white-space: nowrap;
		width: 100%;
		max-width: 100%;

		text-align: right;
		overflow-x: auto;
	}

	thead {
		box-sizing: border-box;
		border-bottom: 2px solid rgb(221, 221, 221);
	}

	tbody tr:nth-child(odd) {
		background-color: var(--color-mediumgray);
	}

	th:nth-child(1) {
		width: 40%;
		text-align: start;
		padding-left: 1vw;
	}
</style>
