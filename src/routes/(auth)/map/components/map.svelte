<script lang="ts">
  import { onMount } from 'svelte';

  import { createMarker } from '../helpers/marker-utils';
  import type { HydratedMapSite } from '../proxy+page.server';
  import { getBaseHydratedMarkers, setFilteredHydratedMarkers } from '../stores/map-marker-store';
  import { setMap } from '../stores/map-store';
  import { PUBLIC_GOOGLE_MAP_ID } from '$env/static/public';

  export let sites: HydratedMapSite[];
  export let Map: typeof google.maps.Map;
  export let AdvancedMarkerElement: typeof google.maps.marker.AdvancedMarkerElement;
  export let PinElement: typeof google.maps.marker.PinElement;
  export let LatLng: typeof google.maps.LatLng;

  let mapElement: HTMLDivElement;

  const intersectionObserver = new window.IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('drop');
        intersectionObserver.unobserve(entry.target);
      }
    }
  });

  onMount(async () => {
    try {
      const map = new Map(mapElement, {
        center: {
          lat: 51.505,
          lng: -0.15,
        },
        zoom: 12,
        mapId: PUBLIC_GOOGLE_MAP_ID,
        clickableIcons: false,
      });
      setMap(map);

      setTimeout(() => {
        sites.map((site) =>
          createMarker({
            site,
            map,
            AdvancedMarkerElement,
            PinElement,
            LatLng,
            intersectionObserver,
          }),
        );

        setFilteredHydratedMarkers(getBaseHydratedMarkers());
      }, 800);
    } catch (e) {
      console.log(e);
    }
  });
</script>

<div class="h-full" bind:this={mapElement} />
