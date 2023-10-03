<script>
  import DraggableWindow from '$lib/components/draggable-window.svelte';
  import DraggableList from './draggable-list.svelte';
</script>

<DraggableWindow
  left={document.body.clientWidth - 288 - 10}
  top={document.body.clientHeight - document.body.clientHeight / 2 - 384 / 2 - 50}
>
  <div class="bg-slate-400 h4 text-center rounded-t-lg" slot="header">Route Calculation</div>
  <div class=" ml-4 mt-4 mb-4 overflow-auto box-border flex flex-1 flex-col" slot="content">
    <DraggableList />
  </div>
</DraggableWindow>
