import { purgeCss } from 'vite-plugin-tailwind-purgecss';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { imagetools } from 'vite-imagetools'
import lqip from 'vite-plugin-lqip';

export default defineConfig({
	plugins: [
		lqip(),
		// imagetools({

		// 	removeMetadata: true,
		// 	defaultDirectives: (url) => {
		// 		const params = url.searchParams;
		// 		if (params.has('imageDetails')) {
		// 			params.set('as', 'meta:format;width;height;src');
		// 		}
		// 		if (params.has('carouselPicture')) {
		// 			params.set('as', 'picture');
		// 			params.set('height', '800');
		// 			params.set('format', 'avif;webp;jpg')
		// 		}
		// 		return new URLSearchParams();
		// 	},

		// }),
		sveltekit(), purgeCss()
	]
});
