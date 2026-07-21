<script>
  import { browser } from "$app/environment";
  import { urlPathify } from "$lib/util";
  import Err404 from "../components/Err404.svelte";

  // redirect to lowecase page if the path is not lowercase
  if (browser && window.location.pathname !== urlPathify(window.location.pathname)) {
    window.location.href = urlPathify(window.location.pathname) + window.location.search + window.location.hash;
  }
</script>

<main id="main">
  <Err404 />
</main>
