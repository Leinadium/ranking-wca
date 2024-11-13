<script lang="ts">
	import ButtonGroupItem from "../../ButtonGroup/Item/ButtonGroupItem.svelte";
	import ButtonGroupRoot from "../../ButtonGroup/Root/ButtonGroupRoot.svelte";
	import ButtonGroupText from "../../ButtonGroup/Text/ButtonGroupText.svelte";
	import type { TableRootProps } from "./types";

  let { currentPage = 1, totalPages, onPageChange }: TableRootProps = $props();

  // TODO: Ver como deve ser feita a paginação conforme docs da API
  // const itemsPerPage = 10;
  // let totalItems: number = 0;
  // const totalPages = Math.ceil(totalItems / itemsPerPage);

  let maxVisiblePages: number = 2; // Default to 6, but can be customized

  // Lógica para calcular os números de páginas visíveis
  let visiblePages = $derived(getVisiblePages(currentPage, totalPages, maxVisiblePages))

 // Função para calcular páginas visíveis considerando maxVisiblePages
 function getVisiblePages(currentPage: number, totalPages: number, maxVisiblePages: number): (number | string)[] {
    const pages: (number | string)[] = [];
    const halfVisible = Math.floor((maxVisiblePages - 1) / 2); // Calculate half the visible pages excluding the first and last

    // Always show the first page
    pages.push(1);

    // Show ellipsis if there's a gap between the first page and the current page
    if (currentPage > halfVisible + 2) {
      pages.push('...');
    }

    // Show the pages around the current page
    let startPage = Math.max(2, currentPage - halfVisible); // Start from at least page 2
    let endPage = Math.min(totalPages - 1, currentPage + halfVisible); // End at least 1 page before the last

    // Ensure the pages we push are within bounds and do not skip over them
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    // Show ellipsis if there's a gap between the current page and the last page
    if (currentPage < totalPages - halfVisible - 1) {
      pages.push('...');
    }

    // Always show the last page if it's not already in the list
    if (totalPages > 1 && !pages.includes(totalPages)) {
      pages.push(totalPages);
    }

    return pages;
  }

  const handlePageClick = (page: number) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };
</script>

<div class="table-pagination">
  <ButtonGroupRoot>
    <!-- Botão de ir para primeira página -->
    <ButtonGroupItem type="OUTLINED" color="PRIMARY" onClickFn={() => handlePageClick(1)} disabled={currentPage === 1}>
      <ButtonGroupText>{'<<'}</ButtonGroupText>
    </ButtonGroupItem>

    <!-- Botão de ir para página anterior -->
    <ButtonGroupItem type="OUTLINED" color="PRIMARY" onClickFn={() => handlePageClick(currentPage - 1)} disabled={currentPage === 1}>
      <ButtonGroupText>{'<'}</ButtonGroupText>
    </ButtonGroupItem>

    <!-- TODO: Implementar suporte ao selecionado -->
    <!-- class:selected={page === currentPage} -->
    <!-- Botões de número de páginas -->
    {#each visiblePages as page}
      <ButtonGroupItem
        type="OUTLINED"
        color="PRIMARY"
        onClickFn={() => {
          if (page !== '...') handlePageClick(page as number);
        }}
        disabled={page === '...'}
      >
        <ButtonGroupText>{page}</ButtonGroupText>
      </ButtonGroupItem>
    {/each}

    <!-- Botão de ir para próxima página -->
    <ButtonGroupItem type="OUTLINED" color="PRIMARY" onClickFn={() => handlePageClick(currentPage + 1)} disabled={currentPage === totalPages}>
      <ButtonGroupText>{'>'}</ButtonGroupText>
    </ButtonGroupItem>

    <!-- Botão de ir para última página -->
    <ButtonGroupItem type="OUTLINED" color="PRIMARY" onClickFn={() => handlePageClick(totalPages)} disabled={currentPage === totalPages}>
      <ButtonGroupText>{'>>'}</ButtonGroupText>
    </ButtonGroupItem>
  </ButtonGroupRoot>
</div>