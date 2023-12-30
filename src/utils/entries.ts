import {browser} from '$app/environment';
import {slug} from 'github-slugger';
import {config, user} from '$lib/config';

if (browser) {
	throw new Error(`projects can only be imported server-side`);
}

type EntryType = 'posts' | 'projects' | 'authors';

interface BaseEntry {
	metadata: {
		author?: string;
		tags?: string[];
		video?: string;
		type?: string;
		draft?: boolean;
		date?: Date;
		[key: string]: any;
	};
	default: {
		render: () => { html: string };
	};
	date?: Date;

	[key: string]: any;
}

// New Author interface
export interface Author extends BaseEntry {
	name: string;
	avatar: string;
	occupation: string;
	company: string;
	email: string;
	twitter: string;
	linkedin: string;
	github: string;
	// ... other properties as per your markdown
}

type Entry = BaseEntry | Author;

const getPosts = () => Object.entries(import.meta.glob('/content/posts/**/*.md', {eager: true}));
const getProjects = () => Object.entries(import.meta.glob('/content/projects/**/*.md', {eager: true}));
const getAuthors = () => Object.entries(import.meta.glob('/content/authors/**/*.md', {eager: true}));

const getEntriesByType = (entryType: EntryType): [string, Entry | Author][] => {
	let entries: [string, any][];
	switch (entryType) {
		case 'posts':
			entries = getPosts();
			break;
		case 'projects':
			entries = getProjects();
			break;
		case 'authors':
			entries = getAuthors();
			break;
		default:
			throw new Error(`unknown entry type ${entryType}`);
	}

	// Assuming each entry is a tuple [filepath, parsedObject]
	return entries as [string, Entry | Author][];
};

const getMetadata = (entryType: EntryType, filepath: string, entry: Entry) => {
	return {
		...entry.metadata,
		author: entryType === 'posts' && !config.multiuser ? user.name : entry.metadata.author,
		content: entry.default.render().html,
		slug: filepath.replace(/(\/index)?\.md/, '').split('/').pop(),
		youtube: entry.metadata.video
			? entry.metadata.video.replace(/(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)(\.com)?\/(watch\?v=)?/, '')
			: null,
		tag: entry.metadata.type?.split(' ')?.shift()?.toLowerCase() || null,
		tags: entry.metadata.tags || []
	};
};


function transformToEntry(data: any): Entry {
	// Transform data to the Entry structure
	return {
		// ... transform and return the Entry structure
		// Example:
		metadata: data.metadata,
		default: data.default,
		date: data.date
	};
}

function transformToAuthor(data: any): Author {
	// Transform raw data to the Author structure
	return {
		...transformToEntry(data), // Reuse the Entry transformation logic
		name: data.name,
		avatar: data.avatar,
		occupation: data.occupation,
		company: data.company,
		email: data.email,
		twitter: data.twitter,
		linkedin: data.linkedin,
		github: data.github,
		// ... other author-specific properties
	};
}

export const getEntries = (entryType: EntryType): (Entry | Author)[] => {
	let entries = getEntriesByType(entryType);

	return entries.map(([filepath, entryData]) => {
		let entry: Entry | Author;
		if (entryType === 'authors') {
			entry = transformToAuthor(entryData) as unknown as Author; // Strategic use of 'unknown'
		} else {
			entry = transformToEntry(entryData) as unknown as Entry; // Strategic use of 'unknown'
		}

		const metadata = getMetadata(entryType, filepath, entry);

		if (entryType === 'authors') {
			// Use a double assertion via 'unknown' to satisfy TypeScript
			return { ...metadata } as unknown as Author;
		} else {
			// Use a double assertion via 'unknown' to satisfy TypeScript
			return { ...metadata } as unknown as Entry;
		}
	})
		.filter((entry) => !entry.draft)
		.sort((a, b) => (a.date || new Date(0)) < (b.date || new Date(0)) ? 1 : -1)
		.map((entry, index, allEntries) => ({
			...entry,
			next: allEntries[index - 1],
			prev: allEntries[index + 1]
		})) as (Entry | Author)[]; // Asserting the type of the entire array
};

interface Tag {
	text: string;
	slug: string;
	count: number;
}

export const getTags = () => {
	const posts = getEntries('posts');
	let tags = posts
		.flatMap((post) => post.tags)
		.map((tag) => ({text: tag, slug: slug(tag), count: 1}))
		.reduce<Tag[]>((arr, tag) => {
			let index = arr.findIndex((t) => t.slug === tag.slug);
			if (index > -1) arr[index].count++;
			else arr.push(tag);
			return arr;
		}, [])
		.sort((a, b) => (b.text < a.text ? 1 : -1));

	return tags;
};
