import { error } from '@sveltejs/kit';
import { slug } from 'github-slugger';
import { getEntries } from "../../../utils/entries";

interface Post {
	tags?: string[];
	content: string;
	slug: string;
	// Add other properties that posts might have
}

function slugsArray(tags: string[] = []): string[] {
	return tags.map(t => slug(t));
}

function isPost(entry: any): entry is Post {
	return entry
		&& typeof entry === 'object'
		&& 'slug' in entry
		&& 'content' in entry; // Ensure 'content' is present
}

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
	const { tag } = params;
	const entries = getEntries('posts');
	const posts = entries.filter(isPost); // Ensure entries are Post objects
	const filteredPosts = posts.filter(post => post.tags && slugsArray(post.tags).includes(tag));

	if (!filteredPosts.length) {
		throw error(404, 'No post found');
	}

	return {
		tag: tag,
		posts: filteredPosts
	};
}
