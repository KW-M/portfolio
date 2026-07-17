import { mdsvex } from "mdsvex";
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: [vitePreprocess({ script: true }), mdsvex(),],

	kit: {

		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter({
			fallback: '404.html',
			precompress: false,
			pages: 'build',
			assets: 'build',
		}),
		paths: {
			base: process.argv.includes('dev') ? '' : ''
		},
		alias: {
			// This maps $components to your components directory
			'$components': 'src/components',
			// This maps a specific asset or configuration file
			'$images': 'src/images',
			// This maps a specific asset or configuration file
			'$routes': 'src/routes'
		}

	},

	extensions: [".svelte", ".svx", ".html"]
};

export default config;
