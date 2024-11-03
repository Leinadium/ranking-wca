<script lang="ts">
    import type { SelectorProps } from '../../types/state/props'
	import StateFlag from '../common/StateFlag.svelte';
    
    // let props: SelectorProps = $props();
    const props: SelectorProps = {
        name: "aaaa",
        label: "Estado",
        options: [
            {id: 'rj', text: 'Rio de Janeiro'},
            {id: 'sp', text: 'São Paulo'},
            {id: 'mg', text: 'Minas Gerais'},
            {id: 'es', text: 'Espírito Santo'},
            {id: 'pr', text: 'Paraná'},
            {id: 'br', text: 'Brasil'},
        ],
        selectCallback: (x) => console.log(x)
    }

    let current: string = $state("br")
    $effect(() => {if (current != "" )props.selectCallback(current)})

</script>

<label for="selector-{props.name}">{props.label}:</label>

<select name={props.name} id="selector-{props.name}" bind:value={current}>
    {#each props.options as opt}
    <option value={opt.id}>{opt.text}</option>
    {/each}
</select>


<style>

</style>