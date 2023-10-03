<script lang="ts">
  export let left = 500;
  export let top = 500;
  export let containerClass = 'rounded-lg shadow-md right-16 top-20 bg-white w-72 h-96';

  let moving = false;

  function onMouseDown() {
    moving = true;
  }

  function onMouseMove(
    e: MouseEvent & {
      currentTarget: EventTarget & Window;
    },
  ) {
    if (moving) {
      left += e.movementX;
      top += e.movementY;
    }
  }

  function onMouseUp() {
    moving = false;
  }
</script>

<section
  class={`absolute z-10 flex flex-col ${containerClass}`}
  style="left: {left}px; top: {top}px;"
>
  <!-- eslint-disable-next-line svelte/valid-compile  -->
  <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
  <div on:mousedown={onMouseDown} role="dialog" class="draggable w-full">
    <slot name="header" />
  </div>
  <slot name="content" />
</section>

<svelte:window on:mouseup={onMouseUp} on:mousemove={onMouseMove} />

<style>
  .draggable {
    user-select: none;
    cursor: move;
  }
</style>
