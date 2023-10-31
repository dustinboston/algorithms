/**
 * Bin Packing Algorithms
 * 
 * Bin packing is an optimization problem that aims to find the most 
 * efficient way to pack a set of items into bins with fixed capacity.
 * The goal is to minimize the number of bins used, and possibly the wasted 
 * space within them.
 */
export type BinContents = number[];
export type ItemWeights = number[];
export type BinArray = BinContents[];

/**
 * Packs each item in the next available bin or creates a new bin.
 * - Runtime: O(n)
 */
export function nextFit(weights: ItemWeights, itemCount: number, binCapacity: number): BinArray {
  const bins: BinArray = [[]];
  let remainingCapacity = binCapacity;

  for (let index = 0; index < itemCount; index++) {
    const currentWeight = weights[index];
    if (currentWeight > remainingCapacity) {
      bins.push([currentWeight]);
      remainingCapacity = binCapacity - currentWeight;
    } else {
      bins[bins.length - 1].push(currentWeight);
      remainingCapacity -= currentWeight;
    }
  }
  return bins;
}

/**
 * Places each item in the first bin that can accommodate it.
 * - Runtime: O(n^2)
 */
export function firstFit(weights: ItemWeights, itemCount: number, binCapacity: number): BinArray {
  const bins: BinArray = [];
  const binRemainders: number[] = new Array(itemCount);

  for (let index = 0; index < itemCount; index++) {
    const currentWeight = weights[index];
    let j = 0;

    for (j; j < bins.length; j++) {
      if (binRemainders[j] >= currentWeight) {
        binRemainders[j] -= currentWeight;
        bins[j].push(currentWeight);
        break;
      }
    }
    if (j === bins.length) {
      binRemainders[bins.length] = binCapacity - currentWeight;
      bins.push([currentWeight]);
    }
  }
  return bins;
}

/**
 * Places each item in the bin that will have the least leftover 
 * space after the item is packed.
 * - Runtime: O(n^2)
 */
export function bestFit(weights: ItemWeights, itemCount: number, binCapacity: number): BinArray {
  const bins: BinArray = [];
  const binRemainders: number[] = Array(itemCount).fill(0);

  for (let index = 0; index < itemCount; index++) {
    let smallestRemainder = binCapacity + 1;
    let bestBinIndex = 0;
    let j = 0;

    for (j; j < bins.length; j++) {
      const remainderAfterFit = binRemainders[j] - weights[index];
      if (binRemainders[j] >= weights[index] && remainderAfterFit < smallestRemainder) {
        bestBinIndex = j;
        smallestRemainder = remainderAfterFit;
      }
    }

    if (smallestRemainder === binCapacity + 1) {
      binRemainders[bins.length] = binCapacity - weights[index];
      bins.push([weights[index]]);
    } else {
      binRemainders[bestBinIndex] -= weights[index];
      bins[bestBinIndex].push(weights[index]);
    }
  }
  return bins;
}

/**
 * Same as firstFit, but sorts items in decreasing order first.
 * - Runtime: O(n^2) + O(n log n)
 */
export function firstFitDec(weights: ItemWeights, itemCount: number, binCapacity: number): BinArray {
  weights.sort((a, b) => b - a);
  return firstFit(weights, itemCount, binCapacity);
}

/**
 *  Same as bestFit, but sorts items in decreasing order first.
 * - Runtime: O(n^2) + O(n log n)
 */
export function bestFitDec(weights: ItemWeights, itemCount: number, binCapacity: number): BinArray {
  weights.sort((a, b) => b - a);
  return bestFit(weights, itemCount, binCapacity);
}
