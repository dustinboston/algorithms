// Implements the most basic version of Myers diff, 
//
// - http://xmailserver.org/diff2.pdf
// - https://blog.jcoglan.com/2017/02/12/the-myers-diff-algorithm-part-1/
// - https://github.com/RobertElderSoftware/roberteldersoftwarediff/
// - https://medium.com/uncaught-exception/javascript-array-negative-index-using-proxies-ed096dc84416

console.log(diff('ABCABBA', 'CBABAC'));
console.log(diff('CARE', 'BEAR'));

function shortestEdit(a, b) {
    const n = a.length;
    const m = b.length;
    const max = m + n;

    const v = createWrappableArray(new Array(2 * max + 2));
    v[1] = 0;
    let trace = createWrappableArray([]);
    for (let d = 0; d <= max + 1; d++) {
        trace.push(createWrappableArray([].concat(v)));

        for (let k = -d; k <= d + 1; k += 2) {
          let x;
          if (k === -d || (k !== d && v[k - 1] < v[k + 1])) {
            x = v[k + 1];
          } else {
            x = v[k - 1] + 1;
          }

          let y = x - k;
          while (x < n && y < m && a[x] === b[y]) {
            x++;
            y++;
          }

          v[k] = x;
          if (x >= n && y >= m) {
            return trace;
            // return d;
          }
        }
    }
}

function backtrack(a, b) {
  let x = a.length;
  let y = b.length;
  const path = [];
  const trace = shortestEdit(a, b);

  for (let d = trace.length - 1; d > -1; d--) {
    const v = trace[d];
    const k = x - y;

    let prevK;
    if (k === -d || (k !== d && v[k - 1] < v[k + 1])) {
      prevK = k + 1;
    } else {
      prevK = k - 1;
    }

    let prevX = v[prevK];
    let prevY = prevX - prevK;
    
    while (x > prevX && y > prevY) {
      path.push([x - 1, y - 1, x, y]);
      x = x - 1;
      y = y - 1;
    }

    if (d > 0) {
      path.push([prevX, prevY, x, y]);
    }

    x = prevX;
    y = prevY;
  }

  return path;
}

function diff(a, b) {
  console.log('Diff of', a, b);
  const result = [];

  backtrack(a, b).forEach(v => {
    const [prevX, prevY, x, y] = v;
    const aVal = a[prevX];
    const bVal = b[prevY];

    const d = {
      type: null,
      oldVal: null,
      newVal: null,
      oldPos: null,
      newPos: null
    }

    if (x === prevX) {
      d.type = '+';
      d.newVal = bVal;
      d.newPos = y - 1;
    } else if (y === prevY) {
      d.type = '-';
      d.oldVal = aVal;
      d.oldPos = y;
    } else {
      d.type = '=';
      d.newVal = bVal;
      d.oldVal = aVal;
      d.oldPos = x - 1;
      d.newPos = y - 1;
    }

    result.unshift(d);
  });

  return result;
}

function createWrappableArray(arrayToWrap) {
  return new Proxy(arrayToWrap, {
    get(target, prop) {
      if (typeof prop === 'string' && !isNaN(prop)) {
        prop = parseInt(prop, 10);
        if (prop < 0) {
            prop += target.length;
        }
        return target[prop];
      } else {
        return Reflect.get(...arguments)
      }
    },
    set(target, prop, val) {
      if (!isNaN(prop)) {
        let p = parseInt(prop, 10);
        if (p < 0) {
            p += target.length;
        }
        target[p] = val;
        return true;
      } else {
        return Reflect.set(...arguments)
      }
    }
  });
}

