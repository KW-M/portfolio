<script lang="ts" context="module">
  export enum ArticleType {
    plain = 0,
    solo = 1,
    summary = 3,
  }
</script>

<script lang="ts">
  import EmblaCarousel from "./EmblaCarousel.svelte";

  export let title = "";
  export let categories: string[] = [];
  export let moreUrl = "";
  export let mediaSlides: carouselMediaInfo[] = [];
  export let articleType: ArticleType = ArticleType.plain;
  const visibleCategories = categories.filter((c) => c != "Highlights");
  $$props.class = "";
  let mediaSlideIndex = 0;
  const hasBottomButton = (articleType === ArticleType.summary && moreUrl != "") || articleType === ArticleType.solo;
</script>

<div class={"relative card border-0 mb-16 overflow-hidden shadow-2xl border-surface-200-800 divide-surface-200-800 block divide-y article-card prose prose-slate prose-blockquote:border-slate-300 prose-purple lg:prose-xl " + $$props.class} class:solo-article-card={articleType === ArticleType.solo}>
  {#if mediaSlides.length > 0}
    <header class="bg-surface-800 not-prose bg-opacity-80">
      <!-- -->
      <!-- <img src={coverImage} class="aspect-[21/9] w-full grayscale object-contain" alt="banner" /> -->
      <!-- <Carousel enabled={isExpanded} loadHiRez={isExpanded} slides={mediaSlides} bind:index={mediaSlideIndex} bind:mounted={transitionReady} class="bg-black/50 image-carousel-header py-8 snap-x flex-row flex snap-carousel-container"></Carousel>
    <SwiperCarousel enabled={isExpanded} loadHiRez={isExpanded} slides={mediaSlides} class="bg-black/50 image-carousel-header py-8 snap-x flex-row flex snap-carousel-container"></SwiperCarousel> -->
      <EmblaCarousel slides={mediaSlides} class="" />
    </header>
  {/if}

  <!-- `space-y-4 ` -->
  <div class="relative !border-secondary-950" class:bottom-curve={hasBottomButton}>
    <article class="pt-8 pb-4 md:pt-10 md:pb-5 bg-slate-100 bg-opacity-90" class:pb-10={hasBottomButton}>
      {#if moreUrl != ""}
        <a href={moreUrl} class="h2 !mb-4 text-center !mt-0 no-underline not-prose">{title}</a>
      {:else}
        <h2 class=" !mb-4 text-center !mt-0">{title}</h2>
      {/if}
      <!-- card border-surface-200-800 rounded-lg p-2 border-2 -->
      <div class="category-chip-list flex justify-center flex-wrap">
        {#each visibleCategories as category}
          <a href={"/cat/" + category} type="button" class="chip preset-filled-primary-500 my-1 mx-1 no-underline">{category}</a>
        {/each}
      </div>
      <slot></slot>
    </article>
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
