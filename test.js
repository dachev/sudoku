const test = require("node:test");
const assert = require("node:assert/strict");
const { solvepuzzle } = require("./dist-node/index.js");

test("rejects a board with the wrong length", () => {
  assert.equal(solvepuzzle([]), null);
});

test("rejects out-of-range cell values", () => {
  const board = Array(81).fill(null);
  board[0] = 100;
  assert.equal(solvepuzzle(board), null);
});

test("rejects non-integer cell values", () => {
  const board = Array(81).fill(null);
  board[0] = 3.5;
  assert.equal(solvepuzzle(board), null);
});

test("rejects duplicate values in a row", () => {
  const board = Array(81).fill(null);
  board[0] = 5;
  board[1] = 5;
  assert.equal(solvepuzzle(board), null);
});

test("rejects duplicate values in a column", () => {
  const board = Array(81).fill(null);
  board[0] = 5;
  board[9] = 5;
  assert.equal(solvepuzzle(board), null);
});

test("rejects duplicate values in a box", () => {
  const board = Array(81).fill(null);
  board[0] = 5;
  board[10] = 5;
  assert.equal(solvepuzzle(board), null);
});

test("rejects duplicate zeros", () => {
  const board = Array(81).fill(null);
  board[0] = 0;
  board[9] = 0;
  assert.equal(solvepuzzle(board), null);
});

test("solves an empty board", () => {
  const solution = solvepuzzle(Array(81).fill(null));
  assert.equal(Array.isArray(solution), true);
  assert.equal(solution.length, 81);
});
