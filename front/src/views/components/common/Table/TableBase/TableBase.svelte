<script lang="ts">
	import type { TableBaseProps } from "./types";
    import './style.css';

    let { children }: TableBaseProps = $props();
</script>

<div class="table__container--scrollable">
    <table class="table__base">
        {@render children()}
    </table>
</div>