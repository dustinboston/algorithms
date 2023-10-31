

export const assertEquals = (expected, actual) => {
  if (expected !== actual) {
    throw new Error(`expected: "${expected}", actual: "${actual}"`);
  }
}