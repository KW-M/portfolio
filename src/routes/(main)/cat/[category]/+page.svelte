<script lang="ts">
  import CategoryHeroText from "../../../../components/CategoryHeroText.svelte";
  import { categoryIcons, navIcons } from "$lib/assets";
  import MainContainer from "../../../../components/MainContainer.svelte";
  import Article, { ArticleType } from "../../../../components/Article.svelte";
  import BottomBackButton from "../../../../components/BottomBackButton.svelte";
  export let data;
  $: category = data.category || "Projects";
  $: posts = data.posts || [];
</script>

<MainContainer>
  <CategoryHeroText icon={categoryIcons.electronics} text={category} />
  {#each posts as post (post.path)}
    {@const mediaSlides = post.carousel || []}
    <Article coverImage={post.meta.coverImage} title={post.meta.title} links={post.meta.links} categories={post.meta.categories} currentCategory={category} moreUrl={post.hasMore ? post.path : ""} {mediaSlides} articleType={ArticleType.summary}>
      {@html post.content}
      <!-- <div class="float-right m-0 clear-start w-32 h-32 bg-amber-500"></div> -->
      <!-- {#if post.hasMore}
        <CornerLinkBtn href={post.path} icon_src={navIcons.unfold} corner="br" />
      {/if} -->
    </Article>
  {/each}
  <BottomBackButton />
</MainContainer>
