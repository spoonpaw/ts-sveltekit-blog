<script lang="ts">
	import Head from '$lib/components/layout/Head.svelte';
	import Blogs from '$lib/components/Blogs.svelte';
	import type {IPost, ITag} from "$lib/types";

	export let data;
	const posts = data.posts as unknown as IPost[];
	const tags = data.tags as unknown as ITag[];
</script>

<Head title="Blog" />

<Blogs title="All Posts" {posts} {tags} />
