<script lang="ts">
    import type { SelectorProps } from '../../types/state/props'
	import StateFlag from '../common/StateFlag.svelte';
    let props: SelectorProps = $props();

</script>

<label for="selector-{props.name}">Choose a pet:</label>

<select name={props.name} id="selector-{props.name}">
    {#each props.options as opt}
    <option value={opt.id}>
        {opt.text}
        {#if opt.flagId}
            <StateFlag stateId={opt.flagId} />
        {/if}
    </option>    
    {/each}
</select>


<style>

</style>