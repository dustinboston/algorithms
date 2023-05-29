function apriori(data, minSupport) {
  // Get all unique AB1 characters
  let allChars = new Set();
  for (let [word, ab1] of data) {
    for (let char of ab1) {
      allChars.add(char);
    }
  }
  
  let frequentSets = new Map();
  let k = 1;
  
  // Find frequent 1-itemsets
  let candidateSets = new Map();
  for (let char of allChars) {
    candidateSets.set(char, 0);
  }
  
  for (let [word, ab1] of data) {
    for (let char of ab1) {
      candidateSets.set(char, candidateSets.get(char) + 1);
    }
  }
  
  for (let [char, support] of candidateSets) {
    if (support >= minSupport) {
      frequentSets.set(new Set([char]), support);
    }
  }
  
  // Find frequent k-itemsets (k > 1)
  k++;
  
  while (frequentSets.size > 0) {
    candidateSets = generateCandidateSets(frequentSets, k);
    frequentSets = new Map();
    
    for (let [word, ab1] of data) {
      for (let [candidateSet, support] of candidateSets) {
        if (isSubset(candidateSet, ab1)) {
          candidateSets.set(candidateSet, support + 1);
        }
      }
    }
    
    for (let [candidateSet, support] of candidateSets) {
      if (support >= minSupport) {
        frequentSets.set(candidateSet, support);
      }
    }
    
    k++;
  }
  
  return frequentSets;
}

function generateCandidateSets(frequentSets, k) {
  let candidateSets = new Map();
  let frequentItems = Array.from(frequentSets.keys());
  
  for (let i = 0; i < frequentItems.length; i++) {
    for (let j = i+1; j < frequentItems.length; j++) {
      let item1 = frequentItems[i];
      let item2 = frequentItems[j];
      if (itemsHaveSamePrefix(item1, item2, k-2)) {
        let candidateSet = new Set([...item1, ...item2]);
        if (!hasInfrequentSubset(candidateSet, frequentSets, k-1)) {
          candidateSets.set(candidateSet, 0);
        }
      }
    }
  }
  
  return candidateSets;
}

function itemsHaveSamePrefix(item1, item2, k) {
  for (let i = 0; i < k; i++) {
    if (item1[i] !== item2[i]) {
      return false;
    }
  }
  return true;
}

function hasInfrequentSubset(candidateSet, frequentSets, k) {
  for (let subset of getSubsets(candidateSet, k)) {
    if (!frequentSets.has(subset)) {
      return true;
    }
  }
  return false;
}

function getSubsets(candidateSet, k) {
  let subsets = [];
  let items = Array.from(candidateSet);
  
  function getSubsetsHelper(start, subset) {
    if (subset.size === k) {
      subsets.push(new Set(subset));
    } else {
      for (let i = start; i < items.length; i++) {
        subset.add(items[i]);
        getSubsetsHelper(i+1, subset);
        subset.delete(items[i]);
      }
    }
  }
  
  getSubsetsHelper(0, new Set());
 
