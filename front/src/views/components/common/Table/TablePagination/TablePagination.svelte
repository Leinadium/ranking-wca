<script lang="ts">
	import ButtonGroupItem from "../../ButtonGroup/Item/ButtonGroupItem.svelte";
	import ButtonGroupRoot from "../../ButtonGroup/Root/ButtonGroupRoot.svelte";
	import ButtonGroupText from "../../ButtonGroup/Text/ButtonGroupText.svelte";
	import type { TablePaginationStyleConfigs, TablePaginationProps } from "./types";

  // TODO: Alterar itemsPerPage quando tiver implementação na API
  let {
    currentPage = 1,
    totalItems,
    itemsPerPage = 3,
    maxVisiblePages = 3,
    onPageChange
  }: TablePaginationProps = $props();

  /**
   * A paginação deve:
   * - Sempre mostrar a primeira e a última páginas
   * - Mostrar as páginas ao redor da atual limitando a quantidade máxima de botões visíveis permitidos (maxVisiblePages)
   * - Mostrar reticências se houver páginas demais entre a primeira e a atual ultrapassando o maxVisiblePages
   * - Começar pelo menos na página 2
   * - Terminar pelo menos 1 página antes da última
   */
 function getVisiblePages(currentPage: number, totalPages: number, maxVisiblePages: number): (number | string)[] {
    const pages: (number | string)[] = [];
    const halfVisible = Math.floor((maxVisiblePages - 1) / 2); // Calcular metade das páginas visíveis excluindo a primeira e a última

    pages.push(1);

    if (currentPage > halfVisible + 2) {
      pages.push('...');
    }

    let startPage = Math.max(2, currentPage - halfVisible);
    let endPage = Math.min(totalPages - 1, currentPage + halfVisible);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - halfVisible - 1) {
      pages.push('...');
    }

    if (totalPages > 1 && !pages.includes(totalPages)) {
      pages.push(totalPages);
    }

    return pages;
  }

  function handlePageClick(page: number, currentPage: number) {
    if (page === currentPage) return
    onPageChange(page);
  };

  function goToFirstPage(currentPage: number) {
    handlePageClick(1, currentPage)
  }

  function goToPreviousPage(currentPage: number) {
    handlePageClick(currentPage - 1, currentPage)
  }

  function goToNextPage(currentPage: number) {
    handlePageClick(currentPage + 1, currentPage)
  }

  function goToLastPage(pagesCount: number, currentPage: number) {
    handlePageClick(pagesCount, currentPage)
  }

  function goToPage(page: number | string, currentPage: number) {
    // Não realiza nenhuma ação quando usuário clicar no botão com '...'
    if (typeof page !== 'number') return
    handlePageClick(page, currentPage);
  }

  const STYLE_CONFIGS: TablePaginationStyleConfigs = {
    TYPE: 'OUTLINED',
    COLOR: 'NEUTRAL',
    SIZE: 'SMALL',
  }

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  let visiblePages = $derived(getVisiblePages(currentPage, totalPages, maxVisiblePages))
</script>

<div class="table__pagination">
  <ButtonGroupRoot>
    <!-- Botão de ir para primeira página -->
    <ButtonGroupItem
      type={STYLE_CONFIGS.TYPE}
      color={STYLE_CONFIGS.COLOR}
      size={STYLE_CONFIGS.SIZE}
      onClickFn={() => goToFirstPage(currentPage)}
      disabled={currentPage === 1}
    >
      <ButtonGroupText size={STYLE_CONFIGS.SIZE}>{'<<'}</ButtonGroupText>
    </ButtonGroupItem>

    <!-- Botão de ir para página anterior -->
    <ButtonGroupItem
      type={STYLE_CONFIGS.TYPE}
      color={STYLE_CONFIGS.COLOR}
      size={STYLE_CONFIGS.SIZE}
      onClickFn={() => goToPreviousPage(currentPage)}
      disabled={currentPage === 1}
    >
      <ButtonGroupText size={STYLE_CONFIGS.SIZE}>{'<'}</ButtonGroupText>
    </ButtonGroupItem>

    <!-- Botões de número de páginas -->
    {#each visiblePages as page}
      <ButtonGroupItem
        type={STYLE_CONFIGS.TYPE}
        color={STYLE_CONFIGS.COLOR}
        size={STYLE_CONFIGS.SIZE}
        onClickFn={() => goToPage(page, currentPage)}
        disabled={page === '...'}
        active={page === currentPage}
      >
        <ButtonGroupText size={STYLE_CONFIGS.SIZE}>{page}</ButtonGroupText>
      </ButtonGroupItem>
    {/each}

    <!-- Botão de ir para próxima página -->
    <ButtonGroupItem
      type={STYLE_CONFIGS.TYPE}
      color={STYLE_CONFIGS.COLOR}
      size={STYLE_CONFIGS.SIZE}
      onClickFn={() => goToNextPage(currentPage)}
      disabled={currentPage === totalPages}
    >
      <ButtonGroupText size={STYLE_CONFIGS.SIZE}>{'>'}</ButtonGroupText>
    </ButtonGroupItem>

    <!-- Botão de ir para última página -->
    <ButtonGroupItem
      type={STYLE_CONFIGS.TYPE}
      color={STYLE_CONFIGS.COLOR}
      size={STYLE_CONFIGS.SIZE}
      onClickFn={() => goToLastPage(totalPages, currentPage)}
      disabled={currentPage === totalPages}
    >
      <ButtonGroupText size={STYLE_CONFIGS.SIZE}>{'>>'}</ButtonGroupText>
    </ButtonGroupItem>
  </ButtonGroupRoot>
</div>