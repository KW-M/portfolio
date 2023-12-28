<script lang="ts">
  export let picture: { alt?: string; img: { src: string; width?: number; height?: number }; sources: { [format: string]: { src: string; width: number; height: number }[] } };
  console.log(picture);
  let sources: { srcset: string; type: string }[] = [];
  for (const [format, images] of Object.entries(picture.sources)) {
    sources.push({
      srcset: images.map((i) => `${i.src}`).join(", "),
      type: `image/${format}`,
    });
  }
</script>

<picture>
  {#each sources as source}
    <source srcset={source.srcset} type={source.type} />
  {/each}
  <img src={picture.img.src} alt={picture.alt || ""} width={picture.img.width || ""} height={picture.img.height || ""} />
</picture>
