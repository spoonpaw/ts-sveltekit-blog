<script lang="ts">
	import Head from '$lib/components/layout/Head.svelte';
	import Blogs from '$lib/components/Blogs.svelte';
	import type {IPost} from "$lib/types";

	export let data;
	const posts = data.posts as unknown as IPost[];
</script>

<Head title={data.tag} />

<Blogs title={data.tag} posts={posts} search={false} />
