import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import lqip from 'vite-plugin-lqip';
export default defineConfig({
	plugins: [lqip(), sveltekit()]
});
