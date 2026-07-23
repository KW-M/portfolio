<script lang="ts">
  import CategoryHeroText from "$components/CategoryHeroText.svelte";
  import MainContainer from "$components/MainContainer.svelte";
  import Article, { ArticleType } from "$components/Article.svelte";
  import BottomBackButton from "$components/BottomBackButton.svelte";
  import { bgColors, categoryColorMap, categoryIconMap } from "$lib/globals";
  import HomeHeroText from "$components/HomeHeroText.svelte";
  export let data;
  $: category = data.category || "Projects";
  $: posts = data.posts || [];
  const icon = categoryIconMap["Highlights"];
  $: index = posts.length;
  $: colorBase = bgColors[1];
  $: color = colorBase; //+ " dark:" + colorBase.replace(/-[0-9]+/, "-500");
</script>

<MainContainer>
  <div class="card shadow-2xl relative z-10 dark:bg-black mx-auto w-max px-12 py-3 rounded-3xl prose bg-surface-50-950 my-24 text-center">
    <h5 class="h2 mt-6 mb-0 text-black">Hi! I'm Kyle.</h5>
    <!-- <h1 class="h2 text-black font-bold text-left my-4 mx-7">Kyle Worcester-Moore</h1> -->
    <h5 class="h5 mb-6 mt-0">Welcome to my portfolio!<br /></h5>
  </div>

  {#each posts as post (post.path)}
    {@const mediaSlides = post.carousel || []}
    <Article {color} coverImage={post.meta.coverImage} title={post.meta.title} links={post.meta.links} currentCategory={category} categories={post.meta.categories} tags={post.meta.tags} moreUrl={post.hasMore ? post.path : ""} {mediaSlides} articleType={ArticleType.summary}>
      {@html post.content}
    </Article>
  {/each}
  <!-- <BottomBackButton {color} /> -->
</MainContainer>

<style>
  .hero-header {
    margin-top: 33.3vh;
    margin-bottom: 20vh;
  }
</style>
