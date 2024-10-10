<script lang="ts">
  import { baseClouds, IconHighlights } from "$lib/assets";
  import { fade } from "svelte/transition";
  // import { ProgressBar } from "@skeletonlabs/skeleton";

  export let text = "";
  export let icon: typeof IconHighlights;
  export let color: string = "bg-white dark:bg-black";
  const textColor = color.replaceAll("bg", "text");

  const inOptions = { duration: 400, delay: 500 };
  const outOptions = { duration: 400 };
</script>

<div class={`hero-header shadow-sm mx-auto w-max px-6 py-3 rounded-full ${color}`}>
  {#if icon}
    <svelte:component this={icon} class={"absolute drop-shadow-lg -top-8 left-1/2 -translate-y-full  -translate-x-1/2 w-16 h-16 " + textColor}></svelte:component>

    <!-- <svelte:component this={icon} class={"mx-auto mb-4 drop-shadow-lg w-16 h-16 " + color}></svelte:component> -->
    <!-- <svelte:component this={icon} class={"mx-auto mb-4 drop-shadow-lg w-16 h-16 " + color}></svelte:component> -->
  {/if}
  <h1 class={`relative text-center text-4xl font-extrabold tracking-tight leading-none text-surface-950-50 md:text-5xl break-words`}>
    {text}
    <!-- <div class="-z-10 fade-in-css absolute size-80 bg-white/40 dark:bg-black/30 -mt-4 rounded-full left-1/2 top-1/2 scale-150 -translate-x-1/2 -translate-y-1/2 blur-3xl"></div> -->
    <!-- <div class="-z-10 absolute size-[16em] mt-6 ml-5 opacity-10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-contain bg-center bg-no-repeat" style={`background-image:url("${baseClouds[2].src}")`}></div> -->
  </h1>
  <!-- <h3 in:fade={inOptions} class="text-center tracking-tight leading-none text-gray-900 main-hero-subtitle">Projects</h3> -->
</div>

<style>
  .hero-header {
    margin-top: 33.3vh;
    margin-bottom: 20vh;
  }

  .fade-in-css {
    animation: fadeIn 5s ease-in-out forwards;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
</style>
