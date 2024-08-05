<script lang="ts">
  // import { ProgressBar } from "@skeletonlabs/skeleton";
  export let text = "";
  export let icon: string;

  const inOptions = { duration: 400, delay: 500 };
  const outOptions = { duration: 400 };
</script>

<div class="hero-header">
  {#if icon}
    <img src={icon} alt="icon" class="mx-auto mb-4" />
  {/if}
  <h1 class="text-center mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl break-words">{text}</h1>
  <!-- <h3 in:fade={inOptions} class="text-center tracking-tight leading-none text-gray-900 main-hero-subtitle">Projects</h3> -->
</div>

<style>
  .hero-header {
    margin-top: 33.3vh;
    margin-bottom: 20vh;
  }
</style>
