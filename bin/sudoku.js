#!/usr/bin/env node

const sudoku = require('../');

const printboard = (board) => {
    let out = '';

    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            out += ["", " ", " ", "  ", " ", " ", "  ", " ", " "][col];
            out += printcode(board[sudoku.posfor(row, col)]);
        }
        out += ['\n', '\n', '\n\n', '\n', '\n', '\n\n', '\n', '\n', '\n'][row];
    }

    return out;
};

const printcode = (n) => {
    if (n === null) {
        return '_';
    }

    return n + 1 + '';
};

const puzzle     = sudoku.makepuzzle();
const solution   = sudoku.solvepuzzle(puzzle);
const difficulty = sudoku.ratepuzzle(puzzle, 4);

console.log('DATA:');
console.log(JSON.stringify(data));
console.log('PUZZLE:');
console.log(printboard(puzzle));
console.log('SOLUTION:');
console.log(printboard(solution));
console.log('RATING:', difficulty);

