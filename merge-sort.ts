/**
 * Merge sort
 *
 * Recursively divides the array, sorts each part, then merges the sorted
 * sub-sequences together.
 *
 * - Recursive divide and conquer
 * - Worst-case running time: O(n log n)
 * - Rate of growth: O(n)
 *
 * @param arr - The array to be sorted
 * @param startIndex - Starting index of the array segment
 * @param endIndex - Ending index of the array segment
 */
export function mergeSort(
	arr: number[],
	startIndex: number,
	endIndex: number,
): void {
	if (startIndex < endIndex) {
		const middleIdx = Math.floor((startIndex + endIndex) / 2);
		mergeSort(arr, startIndex, middleIdx);
		mergeSort(arr, middleIdx + 1, endIndex);
		merge(arr, startIndex, middleIdx, endIndex);
	}
}

/**
 * Merge Function used in Merge Sort
 *
 * - Worst-case running time: O(n)
 * - Rate of growth: O(n)
 *
 * @param arr - The array containing segments to be merged
 * @param startIndex - Starting index of the first segment
 * @param middleIndex - Ending index of the first segment / Starting index of the second segment - 1
 * @param endIndex - Ending index of the second segment
 */
export function merge(
	arr: number[],
	startIndex: number,
	middleIndex: number,
	endIndex: number,
): void {
	const leftArraySize = middleIndex - startIndex + 1;
	const rightArraySize = endIndex - middleIndex;

	const leftArray: number[] = new Array(leftArraySize);
	const rightArray: number[] = new Array(rightArraySize);

	for (let i = 0; i < leftArraySize; i++) {
		leftArray[i] = arr[startIndex + i];
	}

	for (let j = 0; j < rightArraySize; j++) {
		rightArray[j] = arr[middleIndex + j + 1];
	}

	leftArray.push(Infinity);
	rightArray.push(Infinity);

	let leftIndex = 0;
	let rightIndex = 0;

	for (let arrIndex = startIndex; arrIndex <= endIndex; arrIndex++) {
		if (leftArray[leftIndex] <= rightArray[rightIndex]) {
			arr[arrIndex] = leftArray[leftIndex];
			leftIndex++;
		} else {
			arr[arrIndex] = rightArray[rightIndex];
			rightIndex++;
		}
	}
}
