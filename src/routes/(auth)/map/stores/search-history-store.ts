import { writable } from 'svelte/store';

/**
 * The search history for the autocomplete input
 */
const store = writable<string[]>([]);
const { subscribe: historyListSubscribe, update } = store;

const addToHistoryList = (item: string) => {
  update((value) => {
    if (value.length > 5) {
      value.pop();
    }

    value.unshift(item);

    return value;
  });
};

export { historyListSubscribe, addToHistoryList };
