<script lang="ts">
  import type { Action } from "svelte/action";

  interface Props {
    href?: string;
    icon: any;
    // export const aria = "";
    corner?: string;
    fixed?: boolean;
    useAction?: Action<HTMLAnchorElement, null>; // export let useActionData: Object = {};
  }

  let { href = "#", icon, corner = "tl", fixed = true, useAction = (_: HTMLAnchorElement) => {} }: Props = $props();

  const SvelteComponent = $derived(icon);
</script>

<a {href} use:useAction={null} class={"w-16 h-16 m-0 corner-btn pointer-events-auto opacity-80"} class:fixed class:absolute={!fixed} class:corner-btn-tl={corner == "tl"} class:corner-btn-br={corner == "br"} class:corner-btn-tr={corner == "tr"} class:corner-btn-bl={corner == "bl"} aria-label="go to full article">
  <SvelteComponent class="size-10 m-2 rotate-45" />
</a>

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
    /* @apply rounded-br-2xl top-0 left-0; */
    background-position: top 0.8rem left 0.8rem;
  }

  .corner-btn-br {
    /* @apply rounded-tl-2xl bottom-0 right-0; */
    background-position: bottom 0.8rem right 0.8rem;
  }

  .corner-btn-tr {
    /* @apply rounded-bl-2xl top-0 right-0; */
    background-position: top 0.8rem right 0.8rem;
  }

  .corner-btn-bl {
    /* @apply rounded-tr-2xl bottom-0 left-0; */
    background-position: bottom 0.8rem left 0.8rem;
  }
</style>
