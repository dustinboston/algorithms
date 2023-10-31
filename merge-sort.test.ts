import { merge, mergeSort } from './002-merge-sort.ts';
import { assert, assertEquals } from './deps.ts';

Deno.test('mergeSort', () => {
	const A = [5, 2, 4, 7, 1, 3, 2, 6];
	mergeSort(A, 0, A.length - 1);
	assertEquals(A.toString(), '1,2,2,3,4,5,6,7');
});

Deno.test('merge', () => {
	const A = [2, 4, 5, 7, 1, 2, 3, 6];
	merge(A, 0, 3, A.length - 1);
	assert(A.toString(), '1,2,2,3,4,5,6,7');
});
