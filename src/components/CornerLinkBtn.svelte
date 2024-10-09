<script lang="ts">
  import type { Action } from "svelte/action";

  export let href = "#";
  export let icon_src = "";
  // export const aria = "";
  export let corner = "tl";
  export let fixed = true;
  export let useAction: Action<HTMLAnchorElement, null> = (_: HTMLAnchorElement) => {};
  // export let useActionData: Object = {};
</script>

<a {href} use:useAction={null} class={"w-16 h-16 m-0 bg-transparent bg-no-repeat rounded-none corner-btn pointer-events-auto"} class:fixed class:absolute={!fixed} class:corner-btn-tl={corner == "tl"} class:corner-btn-br={corner == "br"} class:corner-btn-tr={corner == "tr"} class:corner-btn-bl={corner == "bl"} style={`background-image:url("${icon_src}")`} aria-label="go to full article"> </a>

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
    @apply rounded-br-2xl top-0 left-0;
    background-position: top 0.8rem left 0.8rem;
  }

  .corner-btn-br {
    @apply rounded-tl-2xl bottom-0 right-0;
    background-position: bottom 0.8rem right 0.8rem;
  }

  .corner-btn-tr {
    @apply rounded-bl-2xl top-0 right-0;
    background-position: top 0.8rem right 0.8rem;
  }

  .corner-btn-bl {
    @apply rounded-tr-2xl bottom-0 left-0;
    background-position: bottom 0.8rem left 0.8rem;
  }
</style>
