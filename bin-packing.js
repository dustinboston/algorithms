const { test } = require('node:test');

// @see https://www.geeksforgeeks.org/bin-packing-problem-minimize-number-of-used-bins/

const items = [66,32,63,32,40,40,41.5,41.5,40,40,40,40,63,32,63,32,41.5];

/**
 * First fit decreasing algorithm
 * @param {number[]} itemValues - weights, lengths, etc.
 * @param {number} binCapacity - amount each bin can hold
 * @param {number} numItems = the number of items to expect
 */ 
function nextFit(weight, n, c) {
  const res = [[]];
  let binRem = c;
  for (let i = 0; i < n; i++) {
    if (weight[i] > binRem) {
      res.push([weight[i]]);
      binRem = c - weight[i];
    } else {
      res[res.length - 1].push(weight[i]);
      binRem -= weight[i]; 
    }
  }
  return res;
}

(() => {
  const c = 96;
  const n = items.length;
  const res = nextFit(items, n, c);
  printBins('nextFit', res, c);
})();

function firstFit(weight, n, c) {
  let res = [];
  const binRem = new Array(n);
  for (let i = 0; i < n; i++) {
    let j = 0;
    for(j; j < res.length; j++) {
      if (binRem[j] >= weight[i]) {
        binRem[j] = binRem[j] - weight[i];
        res[j].push(weight[i]);
        break;
      }
    }
    if (j === res.length) {
      binRem[res.length] = c - weight[i];
      res.push([weight[i]]);
    }
  }
  return res;
}

(() => {
  const c = 96;
  const n = items.length;
  const res = firstFit(items, n, c);
  printBins('firstFit', res, c);
})();

function bestFit(weight, n, c) {
  const res = [];
  const binRem = Array(n).fill(0);

  for (let i = 0; i < n; i++) {
    let min = c + 1;
    let bi = 0;
    let j = 0;
    for(j; j < res.length; j++) {
      if (binRem[j] >= weight[i] && binRem[j] - weight[i] < min) {
        bi = j;
        min = binRem[j] - weight[i];
      }
    }
    if (min === c + 1) {
      binRem[res.length] = c - weight[i];
      res.push([weight[i]]);
    } else {
      binRem[bi] -= weight[i];
      res[bi].push(weight[i]);
    }
  }
  return res;
}

(() => {
  const c = 96;
  const n = items.length;
  const res = bestFit(items, n, c);
  printBins('bestFit', res, c);
})();

(() => {
  const c = 96;
  const n = items.length;
  const res = bestFit(items, n, c);
  printBins('bestFit', res, c);
})();

function firstFitDec(weight, n, c) {
  weight.sort((a, b) => b - a);
  return firstFit(weight, n, c);
}

(() => {
  const c = 96;
  const n = items.length;
  const res = firstFitDec(items, n, c);
  printBins('firstFitDec', res, c);
})();

function bestFitDec(weight, n, c) {
  weight.sort((a, b) => b - a);
  return bestFit(weight, n, c);
}

(() => {
  const c = 96;
  const n = items.length;
  const res = bestFitDec(items, n, c);
  printBins('bestFitDec', res, c);
})();

function printBins(algo, bins, cap) {
  let i = 0;
  let totalWaste = 0;
  console.log('algo: %s', algo);
  for (const bin of bins) {
    const total = bin.reduce((a, c) => a + c, 0)
    const totalStr = total.toString().padEnd(4, ' ');
    const valsStr = bin.join(' + ').padEnd(20);
    const waste = cap - total; 
    totalWaste += waste;
    const binNum = (i + 1).toString().padStart(2);
    console.log(`bin ${binNum}: ${totalStr} = ${valsStr}; wasted ${waste}`);
    i++;
  }
  console.log(`total bins: ${bins.length}, total waste: ${totalWaste}`);
  console.log('');
}

