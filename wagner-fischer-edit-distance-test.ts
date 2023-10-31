import { editDistance } from './wagner-fischer-edit-distance.ts';
import { assertEqual } from "https://deno.land/std@0.204.0/assert/mod.ts";

Deno.test('should calculate the edit distance between sitting and kitten', () => {
  const a = 'sitting';
  const b = 'kitten';
  const table = editDistance(a, b);
  assertEqual(table.length, a.length);
  assertEqual(table[0].length, b.length);
  assertEqual(table[a.length - 1][b.length - 1], 3);
});

Deno.test('should calculate the edit distance between Sunday and Saturday', () => {
  const a = 'Sunday';
  const b = 'Saturday';
  const table = editDistance(a, b);
  assertEqual(table.length, a.length);
  assertEqual(table[0].length, b.length);
  assertEqual(table[a.length - 1][b.length - 1], 3);
})

