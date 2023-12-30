import { error } from '@sveltejs/kit';
import {getEntries} from "../../utils/entries";

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	const projects = getEntries('projects');
	if (!projects) {
		throw error(404, 'No project found');
	}

	return {
		// eslint-disable-next-line no-unused-vars
		projects: projects
	};
}
