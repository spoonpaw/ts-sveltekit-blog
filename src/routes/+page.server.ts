import { error } from '@sveltejs/kit';
import { getEntries } from '../utils/entries';
import type {IPost} from "$lib/types";

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	const posts = getEntries('posts') as unknown as IPost[];
	if (!posts) {
		throw error(404, 'No post found');
	}

	return {
		// eslint-disable-next-line no-unused-vars
		posts: posts
	};
}
