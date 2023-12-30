<script lang="ts">
	import { dev } from '$app/environment';
</script>

<svelte:head>
	{#if dev}
		<script
			async
			src="https://scripts.simpleanalyticscdn.com/latest.dev.js"
		></script>
	{:else}
		<script
			async
			src="https://scripts.simpleanalyticscdn.com/latest.js"
		></script>
		<noscript
			><img
				src="https://queue.simpleanalyticscdn.com/noscript.gif"
				alt=""
				referrerpolicy="no-referrer-when-downgrade"
			/></noscript
		>
	{/if}
</svelte:head>
