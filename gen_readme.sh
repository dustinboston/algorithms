#!/bin/sh

printf "# Algorithms

Algorithms from Introduction to Alogrithms, written in JavaScript.

* [Insertion sort](#insertion-sort)
* [Selection sort](#selection-sort)
* [Merge sort](#merge-sort)
* [Linear search](#linear-search)

"

printf "## Insertion sort

\`\`\`js
$(cat insertion-sort.js)
\`\`\`

" 

printf "## Selection sort

\`\`\`js
$(cat selection-sort.js)
\`\`\`

" 

printf "## Merge sort

\`\`\`js
$(cat merge.js)

$(cat merge-sort.js)
\`\`\`

" 

printf "## Linear search

\`\`\`js
$(cat linear-search.js)
\`\`\`

" 
