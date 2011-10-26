
# sudoku
      

Sudoku generator and solver for [node.js](http://nodejs.org)

## Live demo
[http://blago.dachev.com](http://blago.dachev.com)

## Installation

``` bash
    $ npm install sudoku
```

## Usage

``` javascript
    var sudoku = require('sudoku');

    var puzzle     = sudoku.makepuzzle();
    var solution   = sudoku.solvepuzzle(puzzle);
    var difficulty = sudoku.ratepuzzle(puzzle, 4);
```


## License
Copyright 2010, Blagovest Dachev.

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.