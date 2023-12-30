<script lang="ts">
	import Head from '$lib/components/layout/Head.svelte';
	import Blog from '$lib/components/Blog.svelte';
	import Comments from '$lib/components/comment/index.svelte';
	import type {IAuthor, IPost} from "$lib/types";

	export let data;
	const post = data.post as unknown as IPost;
	const author = data.author as unknown as IAuthor;
</script>

<Head title={post.title} />

<Blog {post} {author} />
<Comments />
