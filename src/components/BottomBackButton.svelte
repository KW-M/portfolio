<script lang="ts">
  import { backBtn } from "../actions/backButton";
  import { IconCaretBack, navIcons } from "$lib/assets";
  import { page } from "$app/stores";
  import { base } from "$app/paths";
  export let color = "bg-surface-800";
  $: currentPath = $page.route.id;
  const iconUrl = navIcons.back;
  const home = base;
</script>

<a href={home} use:backBtn={currentPath} class={"relative md:scale-150 btn mt-24 mb-96 left-1/2 -translate-x-1/2 btn-lg " + color}>
  <!-- <span class="size-7 opacity-95 bg-contain bg-no-repeat pointer-events-none" style={`background-image: url("${iconUrl}")`}></span> -->
  <IconCaretBack class="size-7 opacity-95 pointer-events-none" />
  <span>Back</span>
</a>
