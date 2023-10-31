/**
 * Insertion Sort
 * 
 * - Good for small lists
 * - Incrementally sorts in-place
 * - Worst-case running time: O(n^2)
 * - Rate of growth: O(1)
 * 
 * @example
 * ```ts
 * import { insertionSort } from './01-insertion-sort.ts';
 * 
 * const a = [5, 2, 4, 6, 1, 3];
 * insertionSort(a); 
 * //=> [1, 2, 3, 4, 5]
 * ```
 */
export function insertionSort(arr: number[]): void {
    let currentIndex: number, key: number, previousIndex: number;

    for (currentIndex = 1; currentIndex < arr.length; currentIndex += 1) {
        key = arr[currentIndex];
        previousIndex = currentIndex - 1;
        while (previousIndex >= 0 && arr[previousIndex] > key) {
            arr[previousIndex + 1] = arr[previousIndex];
            arr[previousIndex] = key;
            previousIndex -= 1;
        }
    }
}