import adapter from '@sveltejs/adapter-auto';
import {vitePreprocess} from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';
import mdsvexConfig from './mdsvex.config.js'; // Assuming you have mdsvex.config.js

/** @type {import('@sveltejs/kit').Config} */
const config = {
    extensions: ['.svelte', ...mdsvexConfig.extensions], // Include extensions from mdsvexConfig

    kit: {
        adapter: adapter(),

        // If you're using CSP, include this
        csp: { mode: 'auto' }
    },

    // Include mdsvex in the preprocess array
    preprocess: [mdsvex(mdsvexConfig), vitePreprocess()]
};

export default config;
