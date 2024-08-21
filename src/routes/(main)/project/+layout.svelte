<script lang="ts">
  import Article, { ArticleType } from "../../../components/Article.svelte";
  import BottomBackButton from "../../../components/BottomBackButton.svelte";
  import MainContainer from "../../../components/MainContainer.svelte";
  export let data;

  const currentRoute = data.currentRoute;
  const mediaSlides = data.mediaSlides;
  const categories = data.meta && data.meta.categories ? (data.meta.categories as string[]) : [];
  const links = data.meta && data.meta.links ? (data.meta.links as { [key: string]: string }) : {};
  const title = data.meta && data.meta.title ? (data.meta.title as string) : "";
  console.log(data);
</script>

<MainContainer>
  <Article {title} {categories} {mediaSlides} {links} articleType={ArticleType.solo}>
    <slot></slot>
  </Article>
  <BottomBackButton />
</MainContainer>

<style>
</style>
