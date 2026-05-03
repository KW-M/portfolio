<script lang="ts">
  // import { onMount, onDestroy } from "svelte";
  // import { getVisibleSpiralPoints } from "../lib/spiralGen";
  // import { categoryIcons, IconEnvironment, IconExperiments, IconGraphics, IconHighlights, IconSystemIntegration, IconScience, IconWebDev } from "../lib/assets";
  // import { fade } from "svelte/transition";
  // import { PAGE_FADE_DELAY, PAGE_FADE_DURATION } from "$lib/consts";
  // import { browser } from "$app/environment";
  import { base } from "$app/paths";
  import { bgColors, categoryColorMap, categoryIconMap, disableBrowserBackSwipe, navOpen } from "$lib/globals";

  export let open: boolean = false;
  // export let categoryNames: string[] = [];
  const categories = Object.keys(categoryIconMap).map((name, i) => ({ name, icon: categoryIconMap[name] || "", color: categoryColorMap[name] || bgColors[i % bgColors.length] }));
</script>

<div class="bottom-0 left-0 right-0 px-8 z-50 h-20 fixed text-black flex-row flex items-center justify-center overflow-x-auto overflow-y-hidden transition-all duration-300" class:translate-y-full={!open} class:opacity-0={!open} on:mouseenter={() => disableBrowserBackSwipe.set(true)} on:mouseleave={() => disableBrowserBackSwipe.set(false)} role="navigation" aria-label="Category navigation">
  <div class="fixed left-0 bottom-0 h-20 w-16 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
  {#each categories as category}
    {@const color = category.color + " dark:" + category.color.replace(/-[0-9]+/, "-500")}
    <a href={`${base}/cat/${category.name}`} class={"btn btn-md mx-3 hover:opacity-100 focus:opacity-100 hover:shadow-xl active:shadow-md " + color}>
      {category.name}
    </a>
  {/each}
  <div class="fixed right-0 h-20 bottom-0 w-16 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>
</div>
