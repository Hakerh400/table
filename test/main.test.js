'use strict';

const fs = require('fs');
const path = require('path');
const assert = require('assert');
const O = require('omikron');
const jstest = require('@hakerh400/jstest');
const Table = require('..');

const eq = assert.strictEqual;
const {test, part} = jstest;

const cwd = __dirname;
const dataDir = path.join(cwd, 'data');

part('Table', () => {
  test('No columns, no rows', () => {
    const table = new Table([]);
    const str = table.toString();
    eq(str, `++${'\n||'.repeat(3)}\n++`);
  });

  test('No columns, single row', () => {
    const table = new Table([]);
    table.addRow([]);
    const str = table.toString();
    eq(str, `++${'\n||'.repeat(7)}\n++`);
  });

  test('No columns, hundred rows', () => {
    const n = 100;
    const table = new Table([]);
    O.repeat(n, () => table.addRow([]));
    const str = table.toString();
    eq(str, `++${'\n||'.repeat(n * 4 + 3)}\n++`);
  });

  test('10 columns, 15 rows', () => {
    const w = 10;
    const h = 15;
    const table = new Table(O.ca(w, i => `Column ${i + 1}`));
    O.repeat(h, y => {
      table.addRow(O.ca(w, x => `(${x + 1}, ${y + 1})`));
    });
    const str = table.toString();
    eq(str, O.lf(O.rfs(path.join(dataDir, `table-${w}x${h}.txt`), 1)));
  });
});