<script lang="ts">
  import CategoryHeroText from "$components/CategoryHeroText.svelte";
  import MainContainer from "$components/MainContainer.svelte";
  import Article from "$components/Article.svelte";
  import BottomBackButton from "$components/BottomBackButton.svelte";
  import { ArticleType, bgColors, categoryColorMap, categoryIconMap } from "$lib/globals";
  import HomeHeroText from "$components/HomeHeroText.svelte";
  import SummaryCard from "$components/SummaryCard.svelte";
  let { data } = $props();
  let category = $derived(data.category || "Projects");
  let posts = $derived(data.posts || []);
  const icon = categoryIconMap["Highlights"];
  let index = $derived(posts.length);
  let colorBase = $derived(bgColors[1]);
  let color = $derived(colorBase); //+ " dark:" + colorBase.replace(/-[0-9]+/, "-500");
</script>

<MainContainer>
  <div class="card shadow-2xl relative z-10 preset-filled-surface-50-950 mx-auto w-max px-12 py-3 rounded-3xl prose my-24 text-center">
    <h5 class="h2 mt-6 mb-0">Hi. I'm Kyle.</h5>
    <!-- <h1 class="h2 text-black font-bold text-left my-4 mx-7">Kyle Worcester-Moore</h1> -->
    <h5 class="h5 mb-6 mt-2">Welcome to my portfolio!<br /></h5>
  </div>

  {#each posts as post (post.path)}
    {@const mediaSlides = post.carousel || []}
    <!-- <Article {color} coverImage={post.meta.coverImage} title={post.meta.title} links={post.meta.links || {}} currentCategory={category} categories={post.meta.categories || []} tags={post.meta.tags || []} articlePath={post.hasMore ? post.path : ""} {mediaSlides} articleType={ArticleType.summary}>
      <p>{@html post.meta.summary}</p>
    </Article> -->

    <SummaryCard {color} summary={post.meta.summary} coverImage={post.meta.coverImage} title={post.meta.title} links={post.meta.links || {}} categories={post.meta.categories || []} tags={post.meta.tags || []} articlePath={post.path} {mediaSlides}></SummaryCard>
  {/each}
  <!-- <BottomBackButton {color} /> -->
</MainContainer>

<style>
  .hero-header {
    margin-top: 33.3vh;
    margin-bottom: 20vh;
  }
</style>
