<script lang="ts">
  interface Props {
    src?: string;
    alt?: string; //   export let width = 0;
  }

  let { src = "", alt = "" }: Props = $props();
  
  //   export let height = 0;
  //   export let class = "";
</script>

<img {src} {alt} />
