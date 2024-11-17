<script lang="ts">
	import StateFlag from '../common/StateFlag.svelte';
	import { STATE_NAMES } from '$lib/consts';
	import { timeToString } from '$lib/utils';
</script>

<table>
	<thead>
		<tr>
			<th scope="col">#</th>
			<th scope="col">Nome</th>
			<th scope="col">Resultado</th>
			<th scope="col">Representando</th>
			<th scope="col">Competição</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<th scope="row">1</th>
			<td>Nome sobrenome 1</td>
			<td>{timeToString(10.31)}</td>
			<td><StateFlag stateId="RJ" /> {STATE_NAMES['RJ']}</td>
			<td><StateFlag stateId="RJ" /> Planetário Open 2024</td>
		</tr>
		<tr>
			<th scope="row">2</th>
			<td>Nome sobrenome 2</td>
			<td>{timeToString(10.32)}</td>
			<td><StateFlag stateId="RJ" /> {STATE_NAMES['RJ']}</td>
			<td><StateFlag stateId="RJ" /> Planetário Open 2024</td>
		</tr>
		<tr>
			<th scope="row">3</th>
			<td>Nome sobrenome 3</td>
			<td>{timeToString(10.33)}</td>
			<td><StateFlag stateId="RJ" /> {STATE_NAMES['RJ']}</td>
			<td><StateFlag stateId="RJ" /> Planetário Open 2024</td>
		</tr>
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

	th,
	td {
		height: 1rem;
	}

	th:nth-child(1) {
		width: 1rem;
	}

	th:nth-child(2),
	td:nth-child(2) {
		padding-left: 1rem;
		width: 30%;
		text-align: start;
	}
</style>
