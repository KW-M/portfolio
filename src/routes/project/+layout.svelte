<script lang="ts">
  import Article from "$components/Article.svelte";
  import BottomBackButton from "$components/BottomBackButton.svelte";
  import MainContainer from "$components/MainContainer.svelte";
  import { ArticleType } from "$lib/globals.js";
  const { data, children } = $props();

  const mediaSlides = data.mediaSlides;
  const categories = data.meta && data.meta.categories ? (data.meta.categories as string[]) : [];
  const tags = data.meta && data.meta.tags ? (data.meta.tags as string[]) : [];
  const links = data.meta && data.meta.links ? (data.meta.links as { [key: string]: string }) : {};
  const title = data.meta && data.meta.title ? (data.meta.title as string) : "";
</script>

<MainContainer>
  <Article {title} {tags} {categories} {mediaSlides} {links}>
    {@render children?.()}
  </Article>
  <BottomBackButton />
</MainContainer>

<style>
</style>
