<script lang="ts">
  import CategoryHeroText from "$components/CategoryHeroText.svelte";
  import MainContainer from "$components/MainContainer.svelte";
  import Article from "$components/Article.svelte";
  import BottomBackButton from "$components/BottomBackButton.svelte";
  import { ArticleType, bgColors, categoryColorMap, categoryIconMap } from "$lib/globals";
  import SummaryCard from "$components/SummaryCard.svelte";
  let { data } = $props();
  let category = $derived(data.category || "Projects");
  let posts = $derived(data.posts || []);
  let icon = $derived(categoryIconMap ? categoryIconMap[category] : undefined);
  let index = $derived(posts.length);
  let colorBase = $derived(categoryColorMap[category] ?? bgColors[(data.categoryIndex ?? 0) % bgColors.length]);
  let color = $derived(colorBase + " dark:" + colorBase.replace(/-[0-9]+/, "-500"));
</script>

<MainContainer>
  <CategoryHeroText {icon} {color} text={category} />
  {#each posts as post (post.path)}
    {@const mediaSlides = post.carousel || []}
    <SummaryCard {color} coverImage={post.meta.coverImage} summary={post.meta.summary} title={post.meta.title} links={post.meta.links} categories={post.meta.categories} tags={post.meta.tags} articlePath={post.path} {mediaSlides}>
      {@html post.content}
    </SummaryCard>
  {/each}
  <BottomBackButton {color} />
</MainContainer>
