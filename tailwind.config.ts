import { join } from 'path'
import type { Config } from 'tailwindcss'
// import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import { skeleton } from '@skeletonlabs/skeleton/plugin';
import BlueBird from './themeBlueBird';
// import * as themes from '@skeletonlabs/skeleton/themes';

/** @type {import('tailwindcss').Config} \*/
export default {
  content: [
    './src/**/*.{html,js,svelte,ts}',
    join(require.resolve('@skeletonlabs/skeleton-svelte'), '../**/*.{html,js,svelte,ts}')
  ],
  theme: {
    extend: {},
  },
  plugins: [
    // forms,
    typography,
    skeleton({
      themes: [BlueBird]
    })
  ],
} satisfies Config;
