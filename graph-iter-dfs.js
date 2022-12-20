const { assert } = require("console");
const Stack = require('./stack.js');

const WHITE = 0;
const GRAY = 1;
const BLACK = 2;

// Iterative depth first search
function iterativeDFS(g) {
  g.forEach(u => {
    u.color = WHITE;
    u.p = null; // parent
  });

  let time = 0;
  const stack = [];

  g.forEach(u => {
    if (u.color === WHITE) {
      stack.push(u);

      while (stack.length) {
        let v = stack.pop();

        if (v.color === WHITE) {
          v.color = GRAY;
          time += 1;
          v.d = time;
        } else if (v.color === BLACK) {
          continue;
        }

        // Iterate in reverse to traverse nodes in order
        let pushedCount = 0;
        for (let i = v.adj.length - 1; i > -1; i--) {
          let w = v.adj[i];
          if (w.color === WHITE) {
            w.p = v;
            stack.push(w);
            pushedCount += 1;
          }
        }

        // pushedCount determines when we have 
        // completed a path by incrementing the counter
        // whenever an adjacent node has been pushed.
        // Once no adjacent nodes are pushed, the
        // counter will be empty which indicates that
        // we are finished. We must now go back up
        // the graph marking all parents black as well.
        if (!pushedCount) {
          v.color = BLACK;
          v.f = time = time + 1;
          if (v.p) stack.push(v.p);
        }
      }
    }
  });
}

module.exports = iterativeDFS;