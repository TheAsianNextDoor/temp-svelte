<script lang="ts">
  import { flip } from 'svelte/animate';
  import { dndzone } from 'svelte-dnd-action';
  import { mapRoutesSubscribe, setMapRoutes } from '../stores/map-routes-store';
  import { onDestroy } from 'svelte';
  import type { HydratedMapMarker } from '../stores/map-marker-store';

  let items: HydratedMapMarker[] = [];

  const mapRoutesUnsub = mapRoutesSubscribe((val) => {
    items = val;
  });
  onDestroy(mapRoutesUnsub);

  const flipDurationMs = 100;
  function handleDndConsider(e) {
    const newOrderedList = e.detail.items;
    setMapRoutes(newOrderedList);
  }
  function handleDndFinalize(e) {
    const newOrderedList = e.detail.items;
    setMapRoutes(newOrderedList);
  }
</script>

<div class="grid-container w-full">
  <div>
    {#each items as _, i}
      <div class="h-8 m-1">{i}:</div>
    {/each}
  </div>
  <section
    use:dndzone={{ items, flipDurationMs }}
    on:consider={handleDndConsider}
    on:finalize={handleDndFinalize}
  >
    {#each items as item, i (item.id)}
      <div
        class={`cursor-grab h-8 border border-black m-1`}
        animate:flip={{ duration: flipDurationMs }}
      >
        {item.site.site_name}
      </div>
    {/each}
  </section>
</div>

<style>
  .grid-container {
    display: grid;
    grid-auto-flow: column;
    grid-template-columns: 25px auto;
  }
</style>
