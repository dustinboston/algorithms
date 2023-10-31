const WHITE = 0;
const GRAY = 1;
const BLACK = 2;

// Breadth-first search
function bfs(g, s) {
  g.forEach(u => {
    u.color = WHITE;
    u.d = Infinity; // distance
    u.p = null; // parent
  });

  s.color = GRAY;
  s.d = 0;
  s.p = null;

  const Q = [s];

  while (Q.length) {
    const u = Q.shift();
    for (let i = 0; i < u.adj.length; i++) {
      const v = u.adj[i];
      if (v.color === WHITE) {
        v.color = GRAY;
        v.d = u.d + 1;
        v.p = u;
        Q.push(v);
      }
    }
    u.color = BLACK;
  }
}

function printPath(G, s, v) {
  if (v === s) {
    console.log(s.val);
  } else if (v.p === null) {
    console.log(`no path from ${s.val} to ${v.val} exists`);
  } else {
    printPath(G, s, v.p);
    console.log(v.val);
  }
}

const n9 = { val: 9, adj: [] };
const n4 = { val: 4, adj: [n9] };
const n6 = { val: 6, adj: [n4] };
const n7 = { val: 7, adj: [n6] };
const n5 = { val: 5, adj: [n7] };
const n2 = { val: 2, adj: [] };
const n3 = { val: 3, adj: [n4, n2, n5] };
const n1 = { val: 1, adj: [n3] };
const n8 = { val: 8, adj: [n6] };

// Adjacency list
const adj = [n1, n2, n3, n4, n5, n6, n7, n8, n9];

// Run bfs and set parents/distances on graph
bfs(adj, n1);

// Print path from a to b
printPath(adj, n1, n6);
