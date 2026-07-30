<script lang="ts">
  import type { Action } from "svelte/action";

  interface Props {
    onClick?: any;
    icon_src?: string;
    corner?: string;
    classNames?: string;
  }

  let { onClick = () => {}, icon_src = "", corner = "tl", classNames = "" }: Props = $props();
</script>

<button onclick={onClick} class={"fixed w-12 h-16 m-0 bg-transparent bg-no-repeat rounded-none corner-btn pointer-events-auto" + classNames} class:corner-btn-tl={corner == "tl"} class:corner-btn-br={corner == "br"} class:corner-btn-tr={corner == "tr"} class:corner-btn-bl={corner == "bl"} style={`background-image:url("${icon_src}")`} aria-label="go to full article"></button>

<style>
  .corner-btn {
    background-size: 36px;
  }

  .corner-btn:hover,
  .corner-btn:active {
    transform: scale(1.1);
    opacity: 1;
  }

  .corner-btn-tl {
    /* @apply rounded-br-xl top-0 left-0; */
    background-position: top 0.8rem left 0.8rem;
  }

  .corner-btn-br {
    /* @apply rounded-tl-xl bottom-0 right-0; */
    background-position: bottom 0.8rem right 0.8rem;
  }

  .corner-btn-tr {
    /* @apply rounded-bl-xl top-0 right-0; */
    background-position: top 0.8rem right 0.8rem;
  }

  .corner-btn-bl {
    /* @apply bottom-0 left-0; */
    background-position: bottom 0.8rem left 0.8rem;
  }
</style>
