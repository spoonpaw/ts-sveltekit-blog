import { error } from '@sveltejs/kit';
import {type Author, getEntries} from "../../../utils/entries";

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
	const posts = getEntries('posts');
	const authors = getEntries('authors') as Author[];
	const { slug } = params;

	// Find the post by slug
	const post = posts.find((p) => p.slug === slug);

	// If no post is found, throw an error
	if (!post) {
		throw error(404, 'No post found');
	}

	// Find the author of the post
	const author = authors.find((a) => a.name === post.author);

	return {
		post: post,
		author: author
	};
}
