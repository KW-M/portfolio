<script lang="ts">
  import { goto } from "$app/navigation";
  import { goBack } from "../actions/backButton";

  import { IconArrowRight, IconLinkOut } from "$lib/assets";
  import { backBtn } from "../actions/backButton";

  import CornerBtn from "./CornerBtn.svelte";
  import CornerCutoutBtn from "./CornerCutoutBtn.svelte";
  import CornerLinkBtn from "./CornerLinkBtn.svelte";
  import EmblaCarousel from "./EmblaCarousel.svelte";
  import LqipPicture from "./LqipPicture.svelte";
  import LqipVideo from "./LqipVideo.svelte";
  import { ArticleType, categoryColorMap } from "$lib/globals";
  import { urlPathify } from "$lib/util";

  interface Props {
    children?: import("svelte").Snippet;
    title: string;
    summary?: string;
    categories?: string[];
    tags?: string[];
    links?: { [key: string]: string };
    articlePath?: string;
    mediaSlides?: carouselMediaInfo[];
    coverImage?: string;
    color?: string;
    class?: string;
  }

  let { title = "", categories = [], tags = [], links = {}, articlePath = "", coverImage = "", mediaSlides = [], color = "bg-secondary-200", class: className = "", summary = "...", children }: Props = $props();
  const id = urlPathify(title);
  const coverMedia = mediaSlides[0];
</script>

<article {id} class={"relative card flex flex-col bg-surface-50-950 bg-opacity/90 mb-16 overflow-hidden shadow-2xl article-card prose prose-slate prose-blockquote:border-slate-300 prose-purple lg:prose-xl dark:prose-invert" + className}>
  <a href={articlePath} class="cursor-pointer bg-surface-800 not-prose bg-opacity/80 w-full max-h-60 overflow-clip flex flex-col justify-center align-middle">
    {#if coverMedia.type === "img"}
      <LqipPicture picture={coverMedia} loadHiRez={true} rounded={false} class="w-full cursor-pointer" />
    {:else if coverMedia.type === "video"}
      <LqipVideo video={coverMedia} loadHiRez={true} rounded={false} class="w-full cursor-pointer" />
    {/if}
  </a>

  <article class="pt-8 md:pt-10 md:pb-5 relative pb-10 px-6 md:px-10 flex flex-col justify-stretch gap-1">
    {#if articlePath != ""}
      <a href={articlePath} class="h2 m-0 no-underline not-prose w-full">{title}</a>
    {:else}
      <a href={"#" + id} class="h2 m-0 no-underline not-prose w-full">{title}</a>
    {/if}
    <div class="flex items-center justify-left flex-wrap text mt-4 gap-3">
      {#each tags as tag (tag)}
        {@const tagColor = "bg-secondary-400-600"}
        <!-- <a href={"/tag/" + tag} type="button" class={"chip text-sm preset-filled-primary-500 my-1 mx-1 no-underline " + tagColor}>{tag}</a> -->
        <span class={"badge text-sm preset-filled-secondary-400-600 no-underline " + tagColor}>#{tag}</span>
      {/each}
    </div>
    <p>{summary}</p>
    <!-- <div class="flex pb-4 pr-5 justify-start align-middle">
      {#each Object.entries(links) as [title, link]}
        <a href={link} class="chip text-xl mr-2 gap-4 preset-tonal-secondary">
          <span class="flex-1 shrink overflow-hidden">{title}</span>
          <IconLinkOut class="size-elem-xl"></IconLinkOut>
        </a>
      {/each}
    </div> -->
  </article>
  {#if articlePath != ""}
    <CornerCutoutBtn onclick={() => goto(articlePath)} icon={IconArrowRight}></CornerCutoutBtn>
  {/if}
</article>

<style lang="postcss">
  @reference "tailwindcss";
</style>
