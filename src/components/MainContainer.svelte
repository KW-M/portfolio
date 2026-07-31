<script lang="ts">
  import { fade } from "svelte/transition";
  import { PAGE_FADE_DELAY, PAGE_FADE_DURATION } from "$lib/consts";
  import { navOpen } from "$lib/globals";
  interface Props {
    children?: import("svelte").Snippet;
    class?: string;
  }

  let { children, class: className = "" }: Props = $props();
</script>

<main id="main" in:fade|global={{ duration: PAGE_FADE_DURATION, delay: PAGE_FADE_DELAY }} out:fade|global={{ duration: PAGE_FADE_DURATION }} class={`mx-auto px-5 z-10 max-w-fit relative transition-all ease-in-out duration-300 ${className}`} class:nav-open-blur={$navOpen}>
  {@render children?.()}
</main>

<style>
  .nav-open-blur {
    filter: blur(20px);
    opacity: 0;
    pointer-events: none;
  }
</style>
