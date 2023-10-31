import { assert } from './deps.ts';
import { insertionSort } from './001-insertion-sort.ts';

Deno.test('insertionSort', () => {
    const a = [5, 2, 4, 6, 1, 3];
    insertionSort(a);
    assert(a.toString() === '1,2,3,4,5,6');
});