<script lang="ts">
	import { dev } from '$app/environment';
	import { page } from '$app/stores';

	export let id: string; // Set a default or allow it to be set from outside

	$: {
		const gtag = (window as any).gtag;
		if (typeof gtag !== 'undefined') {
			gtag('config', id, {
				page_title: document.title,
				page_path: $page.url.pathname
			});
		}
	}
</script>

<svelte:head>
	{#if !dev && id}
		<script lang="ts">
			// Define the id variable here so it's accessible within the script block
			export let id: string;

			// Load the Google Analytics script
			const script = document.createElement('script');
			script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
			script.async = true;

			// Initialize Google Analytics
			script.onload = () => {
				window.dataLayer = window.dataLayer || [];
				function gtag(...args) {
					window.dataLayer.push(args);
				}
				window.gtag = gtag;

				gtag('js', new Date());
				gtag('config', id);
			};

			document.head.appendChild(script);
		</script>
	{/if}
</svelte:head>
