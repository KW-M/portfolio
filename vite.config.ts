import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import lqip from 'vite-plugin-lqip';
import Icons from 'unplugin-icons/vite'

// loader helpers
import { FileSystemIconLoader } from 'unplugin-icons/loaders'

export default defineConfig({
	plugins: [
		lqip(),
		sveltekit(),
		Icons({
			compiler: 'svelte',
			customCollections: {
				'my-icons': FileSystemIconLoader('./src/images/icons', svg => svg.replace(/^<svg /, '<svg fill="currentColor" '))
			}
		})
	],
	build: {
		assetsInlineLimit: 0,
	}
});
