<script lang="ts">
  import { navIcons } from "$lib/assets";
  import { backBtn } from "../../actions/backButton";
  import Article, { ArticleType } from "../../components/Article.svelte";
  import CornerLinkBtn from "../../components/CornerLinkBtn.svelte";
  import MainContainer from "../../components/MainContainer.svelte";
  export let data;

  console.log(data);
  const currentRoute = data.currentRoute;
  const mediaSlides = data.mediaSlides;
  const categories = data.meta.categories as string[];
  const title = data.meta.title as string;

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
  <Article {title} {categories} {mediaSlides} articleType={ArticleType.solo}>
    <slot></slot>
    <CornerLinkBtn href="/" useAction={backBtn} useActionData={{ currentRoute }} icon_src={navIcons.back} corner="br" />
  </Article>
</MainContainer>

<style>
</style>
