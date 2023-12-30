<script lang="ts">
	import { dev } from '$app/environment';

	export let domain: string = '';
</script>

<svelte:head>
	{#if !dev && domain}
		<script defer data-domain={domain} src="https://plausible.io/js/script.js"></script>
	{/if}
</svelte:head>
