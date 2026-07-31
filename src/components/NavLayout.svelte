<script lang="ts">
  import { IconArrowRight, IconEmail, IconExperiments, IconGithub, IconLinkedin, IconLinkOut, IconMystery, IconScience } from "$lib/assets";
  import { categoryColorMap, categoryIconMap } from "$lib/globals";
  import { urlPathify } from "$lib/util";
  import { onMount } from "svelte";
  import MainContainer from "./MainContainer.svelte";
  import { browser } from "$app/env";
  import profilePicture from "$images/profile-photo.jpg";

  interface Props {
    categories?: string[];
    showEmojis?: () => {};
  }

  let { categories, showEmojis } = $props();

  let mysteryClicked = () => {
    if (showEmojis) showEmojis();
    let goDown = () => {
      window.scrollBy({ top: 60, behavior: "instant" });
      if (document.documentElement.scrollHeight > window.pageYOffset + window.innerHeight) requestAnimationFrame(goDown);
      else console.log("Reached bottom of page!");
    };
    requestAnimationFrame(goDown);
  };
</script>

{#snippet projectCategoriesCard()}
  <section class="card preset-filled-surface-50-950 inset-ring-4 inset-ring-primary-700-300 shadow-xl px-8 py-8 prose prose-slate">
    <h2 class="h3">Projects</h2>
    <div class="flex items-center justify-left flex-wrap text gap-3">
      {#each categories as category}
        {@const IconComponent = categoryIconMap[category]}
        <a href={`/cat/${urlPathify(category)}`} class={`chip inset-shadow-sm text-base ${categoryColorMap[category]}`}><IconComponent class="size-elem-xl"></IconComponent>{category} </a>
      {/each}
    </div>
  </section>
{/snippet}
{#snippet contactCard()}
  <section class="card flex-1 bg-opacity-50 preset-filled-surface-50-950 backdrop-blur-lg shadow-xl px-8 py-8 prose prose-slate">
    <h2 class="h3">Contact</h2>
    <div class="flex flex-col items-stretch justify-center flex-wrap text gap-4">
      <a href="https://github.com/kw-m" class="chip text-base preset-filled-tertiary-700-300"><IconGithub class="size-elem-xl" />Github <IconArrowRight class="ml-auto size-elem-xl"></IconArrowRight></a>
      <a href="https://www.linkedin.com/in/kyle-worcester-moore/" class="chip preset-filled-tertiary-700-300 text-base"><IconLinkedin class="size-elem-xl" />LinkedIn <IconArrowRight class="ml-auto size-elem-xl"></IconArrowRight></a>
      <a href="#" class="chip text-base preset-filled-tertiary-700-300"><IconEmail class="size-elem-xl" />Email comming soon...<IconArrowRight class="ml-auto size-elem-xl"></IconArrowRight></a>
    </div>
  </section>
{/snippet}
{#snippet aboutCard()}
  <section class="relative card preset-filled-surface-50-950 shadow-xl px-8 py-8 prose prose-slate">
    <h2 class="h3">About</h2>
    <img src={profilePicture} class="absolute -top-10 shadow-xl right-14 size-28 rounded-full" aria-hidden="true" alt="Self photo" />
    <p class="text-lg">Hardware-software engineer who loves finding interdisciplinary solutions to tough problems. Wants to help put humanity on a path towards a sustainable future. Likes discovering all the wonderful and wacky corners of our home planet.</p>
  </section>
{/snippet}
{#snippet mysteryCard()}
  <section class="card bg-opacity-50 preset-filled-surface-50-950 backdrop-blur-lg shadow-xl px-8 py-8 prose prose-slate">
    <h2 class="h3 text-center">?</h2>
    <div class="flex flex-col items-center justify-center flex-wrap text gap-4">
      <button class="btn btn-icon-9xl py-4 cursor-help" aria-label="Mystery button" onclick={mysteryClicked}> <IconMystery /></button>
    </div>
  </section>
{/snippet}

<MainContainer class="h-screen min-h-fit  flex flex-col items-center justify-center gap-4 pt-40 pb-60">
  <div class="hidden sm:grid grid-cols-2 gap-6 max-w-full w-180">
    <div class="flex flex-col items-stretch justify-center gap-6">{@render projectCategoriesCard()}{@render contactCard()}</div>
    <div class="flex flex-col items-stretch justify-center gap-6">{@render aboutCard()}{@render mysteryCard()}</div>
  </div>

  <div class="top grid sm:hidden grid-cols-1 gap-6 max-w-full w-180">
    {@render aboutCard()}
    {@render projectCategoriesCard()}
    {@render contactCard()}
    {@render mysteryCard()}
  </div>
</MainContainer>
