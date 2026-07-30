import { mdsvex } from 'mdsvex';
import tailwindcss from '@tailwindcss/vite';
import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';


import lqip from 'vite-plugin-lqip';

// icons
import Icons from 'unplugin-icons/vite'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'

export default defineConfig({
	// resolve
	// // alias: {
	// // 	"$components": path.resolve(__dirname, "./src/components"),
	// // 	"$images": path.resolve(__dirname, "./src/lib/assets/images"),
	// // 	"$routes": path.resolve(__dirname, "./src/routes"),
	// // 	"$lib": path.resolve(__dirname, "./src/lib"),
	// // },
	plugins: [
		lqip(),
		tailwindcss({
			optimize: false,
		}),
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) => filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},
			adapter: adapter({
				fallback: '404.html',
				precompress: false,
				pages: 'build',
				assets: 'build',
			}),
			preprocess: [mdsvex({ extensions: ['.svx', '.md'] })],
			extensions: ['.svelte', '.svx', '.md'],
			paths: {
				base: process.argv.includes('dev') ? '' : ''
			},
			alias: {
				// This maps $components to your components directory
				'$components': 'src/components',
				// This maps a specific asset or configuration file
				'$images': 'src/lib/assets/images',
				// This maps a specific asset or configuration file
				'$routes': 'src/routes'
			}
		}),
		Icons({
			compiler: 'svelte',
			customCollections: {
				'my-icons': FileSystemIconLoader('./src/images/icons', svg => svg.replace(/^<svg /, '<svg fill="currentColor" '))
			}
		}),

	]
});
