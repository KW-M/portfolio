<script lang="ts">
  import CategoryHeroText from "$components/CategoryHeroText.svelte";
  import MainContainer from "$components/MainContainer.svelte";
  import Article, { ArticleType } from "$components/Article.svelte";
  import BottomBackButton from "$components/BottomBackButton.svelte";
  import { bgColors, categoryColorMap, categoryIconMap } from "$lib/globals";
  export let data;
  $: category = data.category || "Projects";
  $: posts = data.posts || [];
  $: icon = categoryIconMap ? categoryIconMap[category] : "";
  $: index = posts.length;
  $: colorBase = categoryColorMap[category] ?? bgColors[(data.categoryIndex ?? 0) % bgColors.length];
  $: color = colorBase; //+ " dark:" + colorBase.replace(/-[0-9]+/, "-500");
</script>

<MainContainer>
  <CategoryHeroText {icon} {color} text={category} />
  {#each posts as post (post.path)}
    {@const mediaSlides = post.carousel || []}
    <Article {color} coverImage={post.meta.coverImage} title={post.meta.title} links={post.meta.links} currentCategory={category} categories={post.meta.categories} tags={post.meta.tags} moreUrl={post.hasMore ? post.path : ""} {mediaSlides} articleType={ArticleType.summary}>
      {@html post.content}
    </Article>
  {/each}
  <BottomBackButton {color} />
</MainContainer>
