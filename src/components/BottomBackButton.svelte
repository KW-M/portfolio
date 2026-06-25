<script lang="ts">
  import { backBtn } from "../actions/backButton";
  import { IconCaretBack } from "$lib/assets";
  import { page } from "$app/stores";
  import { base } from "$app/paths";
  export let color = "bg-secondary-300";
  $: currentPath = $page.route.id;
  const home = base;
</script>

<a href={home} use:backBtn={currentPath} class={"relative md:scale-150 btn mt-24 mb-96 left-1/2 -translate-x-1/2 shadow-xl active:shadow-md btn-lg text-black " + color}>
  <IconCaretBack class="size-6 opacity-95 pointer-events-none" />
  <span>Back</span>
</a>
