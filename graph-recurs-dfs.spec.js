const { assert } = require("console");
const dfs = require('./graph-recurs-dfs.js');

let ptime;
function printStructure(g) {
  ptime = 1;
  return g.reduce((acc, u) => {
    let s = printAdjacentVertices(u);
    return `${acc}(${u.val}${s}${u.val})`;
  }, '');
}

function printAdjacentVertices(u) {
  ptime += 1;
  let s = ''
  u.adj.forEach(v => {
    s += `(${v.val}`;
    // distance matches current
    const d = v.d === ptime;
    // next adjacent vertex has been visited
    const n = ptime + 1 !== v.f;

    if (d && n) {
      s += printAdjacentVertices(v);
    }
    s += `${v.val})`;
  });
  ptime += 1;
  return s;
}

// Create verticies V
const nu = { val: 'u', adj: [] };
const nv = { val: 'v', adj: [] };
const nw = { val: 'w', adj: [] };
const nx = { val: 'x', adj: [] };
const ny = { val: 'y', adj: [] };
const nz = { val: 'z', adj: [] };

// Add edges E
nu.adj = nw.adj.concat([nv, nx]);
nv.adj.push(ny);
nw.adj = nw.adj.concat([ny, nz]);
nx.adj.push(nv);
ny.adj.push(nx);
nz.adj.push(nz);

const G = [nu, nv, nw, nx, ny, nz];
dfs(G);

// time is V + E (from u and w)
const expectedTime = 12;
assert(nw.f === expectedTime);

const expectedStructure = '(u(v(y(xx)y)v)(xx)u)(w(yy)(zz)w)';
const structure = printStructure([nu, nw]);
assert(expectedStructure === structure);