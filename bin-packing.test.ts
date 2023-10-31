import { ItemWeights, nextFit, firstFit, bestFit, firstFitDec, bestFitDec, BinArray } from './x-bin-packing.ts';

const itemWeights: ItemWeights = [66, 32, 63, 32, 40, 40, 41.5, 41.5, 40, 40, 40, 40, 63, 32, 63, 32, 41.5];


Deno.test("Test nextFit Algorithm", () => {
    const binCapacity = 96;
    const itemCount = itemWeights.length;
    const result = nextFit(itemWeights, itemCount, binCapacity);
    printBins('nextFit', result, binCapacity);
});

Deno.test("Test firstFit Algorithm", () => {
    const binCapacity = 96;
    const itemCount = itemWeights.length;
    const result = firstFit(itemWeights, itemCount, binCapacity);
    printBins('firstFit', result, binCapacity);
});

Deno.test("Test bestFit Algorithm", () => {
    const binCapacity = 96;
    const itemCount = itemWeights.length;
    const result = bestFit(itemWeights, itemCount, binCapacity);
    printBins('bestFit', result, binCapacity);
});

Deno.test("Test firstFitDec Algorithm", () => {
    const binCapacity = 96;
    const itemCount = itemWeights.length;
    const result = firstFitDec(itemWeights, itemCount, binCapacity);
    printBins('firstFitDec', result, binCapacity);
});

Deno.test("Test bestFitDec Algorithm", () => {
    const binCapacity = 96;
    const itemCount = itemWeights.length;
    const result = bestFitDec(itemWeights, itemCount, binCapacity);
    printBins('bestFitDec', result, binCapacity);
});

export function printBins(algorithmName: string, bins: BinArray, binCapacity: number): void {
    let binCounter = 0;
    let totalWaste = 0;

    console.log(`Algorithm: ${algorithmName}`);
    for (const currentBin of bins) {
        const binTotal = currentBin.reduce((acc, curr) => acc + curr, 0);
        const formattedTotal = binTotal.toString().padEnd(4, ' ');
        const formattedWeights = currentBin.join(' + ').padEnd(20);
        const wasteInBin = binCapacity - binTotal;

        totalWaste += wasteInBin;
        const formattedBinNumber = (binCounter + 1).toString().padStart(2);
        console.log(`Bin ${formattedBinNumber}: ${formattedTotal} = ${formattedWeights}; Wasted ${wasteInBin}`);
        binCounter++;
    }

    console.log(`Total bins: ${bins.length}, Total waste: ${totalWaste}`);
    console.log('');
}

