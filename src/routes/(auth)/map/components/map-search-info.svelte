<script lang="ts">
  import { onDestroy } from 'svelte';
  import AutoComplete from './auto-complete.svelte';
  import { selectedEntitySubscribe } from '../stores/map-menu-store';
  import type { HydratedMapSite } from '../proxy+page.server';

  export let sites: HydratedMapSite[];

  let selectedSite: HydratedMapSite;

  const unsubSelectedSite = selectedEntitySubscribe((value) => {
    selectedSite = value?.site;
  });
  onDestroy(unsubSelectedSite);
</script>

<AutoComplete bind:sites />
<pre>{JSON.stringify(selectedSite, null, 2)}</pre>
