<script lang="ts">
  import CategoryHeroText from "../../../components/CategoryHeroText.svelte";
  import { categoryIcons, navIcons } from "$lib/assets";
  import MainContainer from "../../../components/MainContainer.svelte";
  import Article, { ArticleType } from "../../../components/Article.svelte";
  import CornerLinkBtn from "../../../components/CornerLinkBtn.svelte";
  export let data;
  const { category, posts } = data;
  console.log(posts);

  // import { graphicsExperiments, wikitrustDesktopVideo, wikitrustMobileVideo } from "$lib/assets";
  // const mediaSlides = graphicsExperiments.map((pic, i) => {
  //   return {
  //     id: i,
  //     type: "img",
  //     alt: "Image " + i,
  //     ...pic,
  //   } as carouselMediaInfo;
  // });
  // mediaSlides.splice(0, 0, Object.assign(wikitrustMobileVideo, { id: 9 }));
  // mediaSlides.splice(4, 0, Object.assign(wikitrustDesktopVideo, { id: 10 }));
  // console.log(mediaSlides);
</script>

<MainContainer>
  <CategoryHeroText icon={categoryIcons.electronics} text={category} />
  {#each posts as post}
    {@const mediaSlides = post.carousel || []}
    <Article coverImage={post.meta.coverImage} title={post.meta.title} categories={post.meta.categories} moreUrl={post.path} {mediaSlides} articleType={ArticleType.summary}>
      {@html post.content}
      <!-- <div class="float-right m-0 clear-start w-32 h-32 bg-amber-500"></div> -->
      {#if post.hasMore}
        <CornerLinkBtn href={post.path} icon_src={navIcons.unfold} corner="br" />
      {/if}
    </Article>
  {/each}
</MainContainer>
