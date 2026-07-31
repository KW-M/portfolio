<script lang="ts">
  import { goto } from "$app/navigation";

  import { IconArrowRight, IconLinkOut } from "$lib/assets";
  import EmblaCarousel from "./EmblaCarousel.svelte";
  import LqipPicture from "./LqipPicture.svelte";
  import LqipVideo from "./LqipVideo.svelte";
  import { ArticleType, categoryColorMap } from "$lib/globals";
  import { urlPathify } from "$lib/util";

  interface Props {
    children?: import("svelte").Snippet;
    title: string;
    currentCategory?: string;
    categories?: string[];
    tags?: string[];
    links?: { [key: string]: string };
    articlePath?: string;
    mediaSlides?: carouselMediaInfo[];
    coverImage?: string;
    color?: string;
    class?: string;
  }

  let { title = "", currentCategory = "", categories = [], tags = [], links = {}, articlePath = "", coverImage = "", mediaSlides = [], color = "bg-secondary-200", class: className = "", children }: Props = $props();
  const id = () => urlPathify(title);
  let mediaSlideIndex = 0;
</script>

<div id={id()} class={"relative mt-25 card border-0 mb-16 overflow-hidden shadow-2xl border-surface-800-200 divide-surface-200-800 block divide-y article-card prose prose-slate prose-blockquote:border-slate-300 prose-purple lg:prose-xl dark:prose-invert " + className}>
  {#if mediaSlides.length > 0}
    <header class="bg-surface-800 not-prose bg-opacity/80">
      {#if mediaSlides.length == 1}
        {@const coverMedia = mediaSlides[0]}
        {#if coverMedia.type === "img"}
          <LqipPicture picture={coverMedia} loadHiRez={true} rounded={false} />
        {:else if coverMedia.type === "video"}
          <LqipVideo video={coverMedia} loadHiRez={true} rounded={false} />
        {/if}
      {:else}
        <EmblaCarousel slides={mediaSlides} class="" {color} />
      {/if}
    </header>
  {/if}

  <article class="pt-8 md:pt-10 md:pb-5 relative pb-3 px-6 md:px-10 bg-surface-50-950 bg-opacity/90">
    <h2 class="h2 !mb-4 !mt-0 no-underline not-prose">{title}</h2>
    <div class="flex items-center justify-left flex-wrap text mt-4 gap-3">
      {#each tags as tag (tag)}
        {@const tagColor = "bg-secondary-400-600"}
        <!-- <a href={"/tag/" + tag} type="button" class={"chip text-sm preset-filled-primary-500 my-1 mx-1 no-underline " + tagColor}>{tag}</a> -->
        <span class={"badge text-sm preset-filled-secondary-400-600 no-underline " + tagColor}>#{tag}</span>
      {/each}
    </div>
    {@render children?.()}
    <div class="flex pb-4 pr-5 justify-start align-middle">
      {#each Object.entries(links) as [title, link]}
        <a href={link} class="chip text-xl mr-2 gap-4 preset-tonal-secondary">
          <span class="flex-1 shrink overflow-hidden">{title}</span>
          <IconLinkOut class="size-elem-xl"></IconLinkOut>
        </a>
      {/each}
    </div>
  </article>
</div>

<style lang="postcss">
  @reference "tailwindcss";

  .bottom-curve {
    border-bottom-width: 180px !important;
    border-right-width: 180px;
    border-bottom-right-radius: 340px;
    overflow: hidden;
    margin-bottom: -180px;
    margin-right: -180px;
    position: relative;
  }

  .category-chip-list {
    font-weight: bold;
    line-height: 1em;
  }

  /* :global(article > *:not(picture)) {
    @apply mx-6 md:mx-10;
  }
  :global(article > picture) {
    @apply w-full;
  } */
</style>
