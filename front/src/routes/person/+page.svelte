<script lang="ts">
	import PersonTable from '../../views/components/person/PersonTable.svelte';
	import FullAvatar from '../../views/components/person/FullAvatar.svelte';

	let wcaId = '2018GUIM02';
</script>

<div class="person-page">
	<FullAvatar {wcaId} />
	<PersonTable />

	<div class="invite-login">
		<span
			>Esse é seu perfil e deseja alterar seu estado?
			<a href="/#">Entre com sua conta WCA</a>
		</span>
	</div>
</div>

<style>
	.person-page {
		box-sizing: border-box;
		width: 100%;
		height: 100%;
		margin-top: 1rem;
		overflow-y: scroll;
		overflow-x: scroll;

		display: flex;
		flex-flow: column nowrap;
		justify-content: start;
		align-items: center;
		gap: 4rem;

		padding-bottom: 4rem;
		text-align: center;
	}

	span,
	a {
		color: #999;
	}
	a {
		text-decoration: none;
		text-decoration-line: underline;
		font-weight: bold;
	}
</style>
