#!/usr/bin/env node

var sudoku = require('../');

function printboard(board) {
	var out = '';

	for (var row = 0; row < 9; row++) {
		for (var col = 0; col < 9; col++) {
			out += [""," "," ","  "," "," ","  "," "," "][col];
      		out += printcode(board[sudoku.posfor(row, col)]);
		}
		out += ['\n','\n','\n\n','\n','\n','\n\n','\n','\n','\n'][row];
	}

	return out;
}

function printcode(n) {
	if (n == null) {
		return '_';
	}

	return n + 1 + '';
}

var puzzle     = sudoku.makepuzzle();
var solution   = sudoku.solvepuzzle(puzzle);
var difficulty = sudoku.ratepuzzle(puzzle, 4);
var data       = {puzzle:puzzle, solution:solution};

console.log('DATA:');
console.log(JSON.stringify(data));
console.log('PUZZLE:');
console.log(printboard(puzzle));
console.log('SOLUTION:');
console.log(printboard(solution));
console.log('RATING:', difficulty);

