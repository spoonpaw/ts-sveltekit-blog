export interface IAuthor {
	name: string;
	avatar: string;
	twitter: string;
}

export interface IPost {
	title: string;
	date: string;
	draft: boolean;
	summary: string;
	image: string;
	author: string;
	content: string;
	prev?: { slug: string; title: string; };
	next?: { slug: string; title: string; };
	slug: string;
	tags: string[];
	// Add other properties if needed
}

export interface IProject {
	title: string;
	date: string;
	draft: boolean;
	description: string;
	href: string;
	image: string;
}

export interface ITag {
	name: string;
	slug: string;
	text: string;
	count: number;
}
