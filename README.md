# sudoku

Sudoku generator and solver for [Node.js](http://nodejs.org)

## Live demo
[http://blago.dachev.com](http://blago.dachev.com)

## Installation

```
    $ npm i sudoku
```

## Usage

```js
    const sudoku = require('sudoku');

    const puzzle     = sudoku.makepuzzle();
    const solution   = sudoku.solvepuzzle(puzzle);
    const difficulty = sudoku.ratepuzzle(puzzle, 4);
```


## License
Copyright 2010, Blagovest Dachev.
-  Modified on September 9, 2017 by Jesús Ángel González Novez.

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