<script>

	import GridItem from "../components/common/Grid/Item/GridItem.svelte";
	import PageTitle from "../components/common/PageTitle/PageTitle.svelte";
	import Typography from "../components/common/Typography/Typography.svelte";

</script>

<svelte:head>
	<title>Sobre | Cubos Estaduais</title>
</svelte:head>

<GridItem direction={'COLUMN'} gap={4}>
	<GridItem direction={'COLUMN'} alignItems={'flex-start'} gap={1}>
		<PageTitle text={'O que é o Cubos Estaduais?'} />
		<Typography type={'bodyOne'} color={'NEUTRAL_DARK_1'}>
			O Cubos Estaduais é um ranking não oficial dos resultados da Associação Mundial de Cubo Mágico (WCA), separado pelos estados do Brasil.
			A WCA possui <a href="https://www.worldcubeassociation.org/results/rankings/333/single" target="_blank" rel="noopener noreferrer">rankings</a> oficiais, mas somente oferece um ranking nacional. Este serviço utiliza os dados mais atuais da WCA para calcular um ranking para cada um dos estados do Brasil. O ranking estadual automaticamente atribui estados aos competitores brasileiros para fornecer um ranking completo.
			A atribuição do estado do competitor é feita de forma automática, baseando-se nos estados das competições que o competitor participou, mas também é possível atualizar o próprio estado caso a atribuição esteja incorreta.
			Para visualizar um ranking completo do país e de outros países, consulte o <a href="https://www.worldcubeassociation.org" target="_blank" rel="noopener noreferrer">site oficial da WCA</a>.
		</Typography>
	</GridItem>

	<GridItem direction={'COLUMN'} alignItems={'flex-start'} gap={1}>
		<PageTitle text={'Como escolher meu estado?'} />
		<Typography type={'bodyOne'} color={'NEUTRAL_DARK_1'}>
			Os estados são atribuídos automaticamente com base nas competições participadas. O estado do competidor é o estado na qual ele mais competiu dentro os outros estados. Essa atribuição automática só acontece quando a maioria das competições do competidor foi no Brasil.
			Caso deseja editar o seu estado atribuído, entre com a sua conta WCA e altere seu estado. O seu estado e seu ranking será atualizado na próxima atualização dos dados, que ocorre pelo menos uma vez por dia.
		</Typography>
	</GridItem>
</GridItem>

<style>
	a {
		text-decoration: underline;
		color: var(--color-accent-warning-base);
	}
</style>