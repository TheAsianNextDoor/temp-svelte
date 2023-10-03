<script lang="ts">
  import { onDestroy } from 'svelte';
  import MapMenu from './components/map-menu.svelte';
  import Map from './components/map.svelte';
  import { mapModeSubscribe, type MapMode } from './stores/map-mode-store';
  import MapRoutesModal from './components/routes-modal.svelte';

  export let data;

  let mapMode: MapMode;

  const mapModeUnsub = mapModeSubscribe((value) => {
    mapMode = value;
  });

  onDestroy(() => {
    mapModeUnsub();
  });
</script>

<div class="z-20 relative">
  <MapMenu sites={data.sites} />
</div>
<div class="w-full h-full z-10 absolute">
  <Map
    sites={data.sites}
    Map={data.Map}
    AdvancedMarkerElement={data.AdvancedMarkerElement}
    PinElement={data.PinElement}
    LatLng={data.LatLng}
  />
</div>

{#if mapMode === 'routes'}
  <MapRoutesModal />
{/if}
