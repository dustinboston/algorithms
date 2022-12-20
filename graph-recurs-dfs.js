const { assert } = require("console");

const WHITE = 0;
const GRAY = 1;
const BLACK = 2;

let time;

// Recursive depth first search 
function dfs(g) {
  g.forEach(u => {
    u.color = WHITE;
    u.p = null; // parent
  });

  time = 0;

  g.forEach(u => {
    if (u.color === WHITE) {
      dfsVisit(u);
    }
  })
}

function dfsVisit(u) {
  u.color = GRAY;
  time += 1;
  u.d = time;
  
  u.adj.forEach(v => {
    if (v.color === WHITE) {
      v.p = u;
      dfsVisit(v);
    }
  });

  u.color = BLACK;
  u.f = time = time + 1;
}

module.exports = dfs;