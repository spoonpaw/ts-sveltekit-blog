import { config, navLinks } from '$lib/config';
import { getEntries } from "../../utils/entries";

export const prerender = true;

const trimSlash = (str: string): string => str.replace(/^\/|\/$/g, '');

interface Post {
	slug: string;
	isPrivate: boolean;
	// Add other properties of posts as needed
}

interface Page {
	href: string;
	// Add other properties of pages as needed
}

export async function GET() {
	const pages: Page[] = navLinks;

    // Transform Entry objects into Post objects
    const posts: Post[] = getEntries('posts').map(entry => {
        return {
            slug: entry.slug, // Assuming `slug` is a property of Entry
            isPrivate: entry.isPrivate, // Assuming `isPrivate` is a property of Entry
            // Map other necessary properties from Entry to Post
        };
    });

	const body = sitemap(posts, pages);

	return new Response(body, {
		headers: {
			'Cache-Control': `max-age=0, s-maxage=${3600}`,
			'Content-Type': 'application/xml'
		}
	});
}

const sitemap = (posts: Post[], pages: Page[]): string => `<?xml version="1.0" encoding="UTF-8" ?>
  <urlset
    xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
    xmlns:xhtml="https://www.w3.org/1999/xhtml"
    xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
    xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
    xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
  >
    <url>
      <loc>${config.siteUrl}</loc>
      <changefreq>daily</changefreq>
      <priority>0.7</priority>
    </url>
    ${pages
	.map(
		(page) => `
    <url>
      <loc>${config.siteUrl}/${trimSlash(page.href)}</loc>
      <changefreq>daily</changefreq>
      <priority>0.7</priority>
    </url>
    `
	)
	.join('')}
    ${posts
	.map((post) =>
		post.isPrivate
			? null
			: `
    <url>
      <loc>${config.siteUrl}/${post.slug}</loc>
      <changefreq>daily</changefreq>
      <priority>0.7</priority>
    </url>
    `
	)
	.join('')}
  </urlset>`;

