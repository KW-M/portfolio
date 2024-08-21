<script lang="ts" context="module">
  export enum ArticleType {
    plain = 0,
    solo = 1,
    summary = 3,
  }
</script>

<script lang="ts">
  import { goto } from "$app/navigation";
  import { goBack } from "../actions/backButton";

  import { navIcons } from "$lib/assets";
  import { backBtn } from "../actions/backButton";

  import CornerBtn from "./CornerBtn.svelte";
  import CornerCutoutBtn from "./CornerCutoutBtn.svelte";
  import CornerLinkBtn from "./CornerLinkBtn.svelte";
  import EmblaCarousel from "./EmblaCarousel.svelte";
  import LqipPicture from "./LqipPicture.svelte";
  import LqipVideo from "./LqipVideo.svelte";

  export let title = "";
  export let currentCategory: string = "";
  export let categories: string[] = [];
  export let links: { [key: string]: string } = {};
  export let moreUrl = "";
  export let mediaSlides: carouselMediaInfo[] = [];
  export let articleType: ArticleType = ArticleType.plain;
  const visibleCategories = categories.filter((c) => c != "Highlights");
  const id = title.replaceAll(" ", "-");
  $$props.class = "";
  let mediaSlideIndex = 0;
  const hasBottomButton = (articleType === ArticleType.summary && moreUrl != "") || articleType === ArticleType.solo;
</script>

<div {id} class={"relative card border-0 mb-16 overflow-hidden shadow-2xl border-surface-800-200 divide-surface-200-800 block divide-y article-card prose prose-slate prose-blockquote:border-slate-300 prose-purple lg:prose-xl " + $$props.class} class:solo-article-card={articleType === ArticleType.solo}>
  {#if mediaSlides.length > 0}
    <header class="bg-surface-800 not-prose bg-opacity-80">
      {#if mediaSlides.length == 1}
        {@const coverMedia = mediaSlides[0]}
        {#if coverMedia.type === "img"}
          <LqipPicture picture={coverMedia} loadHiRez={true} rounded={false} />
        {:else if coverMedia.type === "video"}
          <LqipVideo video={coverMedia} loadHiRez={true} rounded={false} />
        {/if}
      {:else}
        <EmblaCarousel slides={mediaSlides} class="" />
      {/if}
    </header>
  {/if}

  <!-- `space-y-4 ` -->
  <div class="relative !border-secondary-950-50">
    <article class="pt-8 pb-4 md:pt-10 md:pb-5 bg-surface-50-950 bg-opacity-90 relative" class:pb-10={hasBottomButton}>
      {#if moreUrl != ""}
        <a href={moreUrl} class="h2 !mb-4 text-center !mt-0 no-underline not-prose">{title}</a>
      {:else}
        <a href={"#" + id} class="h2 !mb-4 text-center !mt-0 no-underline not-prose">{title}</a>
      {/if}
      <!-- card border-surface-200-800 rounded-lg p-2 border-2 -->
      <div class="category-chip-list flex justify-center flex-wrap">
        {#each visibleCategories as category (category)}
          <a href={"/cat/" + category} type="button" class:disabled={category == currentCategory} class="chip text-sm preset-filled-primary-500 my-1 mx-1 no-underline">{category}</a>
        {/each}
      </div>
      <slot></slot>
      <div class="flex pb-4 pr-5 justify-start align-middle">
        {#each Object.entries(links) as [title, link]}
          <a href={link} class="btn mr-2 preset-outlined-tertiary-500 flex-1 flex max-w-60 overflow-hidden justify-start">
            <span class="flex-1 flex-shrink overflow-hidden">{title}</span>
            <span class="flex-0">&rarr;</span>
          </a>
        {/each}
      </div>
    </article>
    {#if hasBottomButton}
      {#if articleType !== ArticleType.solo}
        <!-- <CornerLinkBtn fixed={false} href={moreUrl} icon_src={navIcons.unfold} corner="br"></CornerLinkBtn> -->
        <CornerCutoutBtn onclick={() => goto(moreUrl)} iconUrl={navIcons.forward}></CornerCutoutBtn>
      {/if}
    {/if}
  </div>
</div>

<style>
  .bottom-curve {
    border-bottom-width: 180px !important;
    border-right-width: 180px;
    border-bottom-right-radius: 340px;
    overflow: hidden;
    margin-bottom: -180px;
    margin-right: -180px;
    position: relative;
  }

  .solo-article-card {
    margin-top: 30vh;
  }
  .category-chip-list {
    font-weight: bold;
    line-height: 1em;
  }

  :global(article > *:not(picture)) {
    @apply mx-6 md:mx-10;
  }
  :global(article > picture) {
    @apply w-full;
  }
</style>
