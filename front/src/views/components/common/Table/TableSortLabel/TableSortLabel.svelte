<script lang="ts">
	import ButtonIcon from "../../Button/Icon/ButtonIcon.svelte";
  import ButtonRoot from "../../Button/Root/ButtonRoot.svelte";
	import GridItem from "../../Grid/Item/GridItem.svelte";
	import SvgIcon from "../../Icon/SVG/SVGIcon.svelte";
  import type { TableSortLabelProps } from "./types";

  let { children, sortDirection = 'asc', column, onSortChange }: TableSortLabelProps = $props();

  const toggleSort = () => {
    const newDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    onSortChange(newDirection, column);
  };
</script>

<GridItem gap={0} justifyContent={'flex-start'} alignItems={'center'}>
  {@render children()}
  
  <ButtonRoot
    type={'BASIC'}
    color={'NEUTRAL'}
    classes="table__label--sortable"
    onClickFn={toggleSort}
  >
    <ButtonIcon>
      {#if sortDirection === 'asc'}
        <SvgIcon name={'faSortUp'}/>
      {:else}
        <SvgIcon name={'faSortDown'}/>
      {/if}
    </ButtonIcon>
  </ButtonRoot>
</GridItem>