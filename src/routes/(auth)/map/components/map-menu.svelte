<script lang="ts">
  import { onDestroy } from 'svelte';
  import MenuLeft from 'svelte-material-icons/MenuLeft.svelte';
  import MenuRight from 'svelte-material-icons/MenuRight.svelte';
  import Filter from 'svelte-material-icons/FilterOutline.svelte';
  import Routes from 'svelte-material-icons/Routes.svelte';
  import { sineIn } from 'svelte/easing';
  import { fly } from 'svelte/transition';

  import { mapFilterSubscribe, showMapFilter } from '../stores/map-filter-store';
  import MapSearchInfo from './map-search-info.svelte';
  import MapFilter from './map-filter.svelte';
  import { hideMapMenu, showMapMenu, mapMenuSubscribe } from '../stores/map-menu-store';
  import type { HydratedMapSite } from '../proxy+page.server';
  import { getMapMode, setMapModeBase, setMapModeRoutes } from '../stores/map-mode-store';
  import { clearMapRoutes } from '../stores/map-routes-store';

  export let sites: HydratedMapSite[];

  const setRoutesMode = () => {
    if (getMapMode() === 'routes') {
      clearMapRoutes();
      setMapModeBase();
    } else if (getMapMode() === 'base') {
      setMapModeRoutes();
    }
  };

  let isMenuVisible: boolean;
  const unsubMenu = mapMenuSubscribe((value) => {
    isMenuVisible = value;
  });
  onDestroy(unsubMenu);

  let isMenuFilterVisible: boolean;
  const unsubFilter = mapFilterSubscribe((value) => {
    isMenuFilterVisible = value;
  });
  onDestroy(unsubFilter);

  const getFlyTransition = (x: number) => ({ duration: 300, easing: sineIn, x, opacity: 100 });
</script>

<!-- Menu -->
{#if isMenuVisible}
  <div transition:fly={getFlyTransition(-408)}>
    <div class="sidebar-width overflow-y-auto absolute bg-white h-screen">
      {#if isMenuFilterVisible}
        <MapFilter />
      {:else}
        <MapSearchInfo bind:sites />
      {/if}
    </div>

    <div class="right-of-menu flex absolute mt-6">
      {#if !isMenuFilterVisible}
        <button
          class="flex justify-center shadow-md items-center w-20 h-8 rounded-lg bg-slate-50 ml-6"
          on:click={showMapFilter}
        >
          <Filter size="18px" />
          Filters
        </button>
      {/if}
      <button
        class="flex justify-center shadow-md items-center w-20 h-8 rounded-lg bg-slate-50 ml-6"
        on:click={setRoutesMode}
      >
        <Routes size="18px" />
        Routes
      </button>
    </div>
    <button class="arrow right-of-menu" on:click={hideMapMenu}>
      <MenuLeft size="23px" />
    </button>
  </div>
{/if}
<!-- Menu -->

{#if !isMenuVisible}
  <button transition:fly={getFlyTransition(408)} class="arrow" on:click={showMapMenu}>
    <MenuRight size="23px" />
  </button>
{/if}

<style>
  .sidebar-width {
    width: 408px;
    border-right: 1px solid gray;
  }

  .arrow {
    border-radius: 0 8px 8px 0;
    border-left: 1px solid gray;
    height: 3rem;
    width: 1.5rem;
    position: absolute;
    background-color: white;
    display: block;
    top: calc(50vh - 3rem);
  }

  .right-of-menu {
    left: 408px;
  }
</style>
