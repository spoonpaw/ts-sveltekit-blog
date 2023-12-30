// mdsvex.config.js

import { visit } from 'unist-util-visit';
import rehypeExternalLinks from 'rehype-external-links';

// Inline definition of getAttr function
function getAttr(str, elem, attr) {
	const regex = new RegExp(`<${elem}[^>]*?${attr}=(["\\'])?((?:.(?!\\1|>))*.?)\\1?`, 'ig');
	let res = regex.exec(str);
	return res && res.length >= 2 ? res[2] : null;
}

// Inline definition of youtube plugin
function youtube() {
	return (tree) => {
		visit(tree, (node) => {
			if (!node.value?.startsWith('<youtube ')) return node;

			let id = getAttr(node.value, 'youtube', 'id');
			let title = getAttr(node.value, 'youtube', 'title');

			node.value = `<iframe title="${title}" src="https://www.youtube.com/embed/${id}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen width="747" height="420" />`;
			return node;
		});
	};
}

// Inline definition of remark plugins
const remarkPlugins = {
	// Add other remark plugins here if needed
	youtube
};

export default {
	extensions: ['.md'],
	smartypants: {
		dashes: 'oldschool'
	},
	remarkPlugins: Object.values(remarkPlugins),
	rehypePlugins: [
		[rehypeExternalLinks, { target: '_blank', rel: ['noopener', 'noreferrer'] }]
		// Add other rehype plugins here if needed
	]
};
