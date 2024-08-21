<script lang="ts">
  import { backBtn } from "../actions/backButton";
  import { navIcons } from "$lib/assets";
  import { page } from "$app/stores";
  import { base } from "$app/paths";
  $: currentPath = $page.route.id;
  const iconUrl = navIcons.back;
  const home = base;
</script>

<a href={home} use:backBtn={currentPath} class="relative md:scale-150 btn mt-24 mb-96 left-1/2 -translate-x-1/2 btn-lg preset-filled-secondary-800-200 bg-no-repeat bg-center">
  <span class="size-7 opacity-95 bg-contain bg-no-repeat pointer-events-none" style={`background-image: url("${iconUrl}")`}></span>
  <span>Back</span>
</a>
