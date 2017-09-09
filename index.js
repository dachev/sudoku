const range = (length) => {
    return new Array(length).fill().map((x, i) => i);
};

const makepuzzle = (board) => {
    let puzzle  = [];
    let deduced = makeArray(81, null);
    let order   = range(81);

    shuffleArray(order);

    for (let pos of order) {
        if (deduced[pos] === null) {
            puzzle.push({pos: pos, num: board[pos]});
            deduced[pos] = board[pos];
            deduce(deduced);
        }
    }

    shuffleArray(puzzle);

    for (let i = puzzle.length - 1; i >= 0; i--) {
        let e = puzzle[i];
        removeElement(puzzle, i);

        let rating = checkpuzzle(boardforentries(puzzle), board);
        if (rating === -1) {
            puzzle.push(e);
        }
    }

    return boardforentries(puzzle);
};

const ratepuzzle = (puzzle, samples) => {
    let total = 0;

    for (let i = 0; i < samples; i++) {
        let tuple = solveboard(puzzle);

        if (tuple.answer === null) {
            return -1;
        }

        total += tuple.state.length;
    }

    return total / samples;
};

const checkpuzzle = (puzzle, board) => {
    if (typeof board === 'undefined') {
        board = null;
    }

    let tuple1 = solveboard(puzzle);
    if (tuple1.answer === null) {
        return -1;
    }

    if (board !== null && boardmatches(board, tuple1.answer) === false) {
        return -1;
    }

    let difficulty = tuple1.state.length;
    let tuple2     = solvenext(tuple1.state);

    if (tuple2.answer !== null) {
        return -1;
    }

    return difficulty;
};

const solvepuzzle = (board) => {
    return solveboard(board).answer;
};

const solveboard = (original) => {
    let board   = [].concat(original);
    let guesses = deduce(board);

    if (guesses === null) {
        return {state: [], answer: board};
    }

    let track = [{guesses: guesses, count: 0, board: board}];
    return solvenext(track);
};

const solvenext = (remembered) => {
    while (remembered.length > 0) {
        let tuple1 = remembered.pop();

        if (tuple1.count >= tuple1.guesses.length) {
            continue;
        }

        remembered.push({guesses: tuple1.guesses, count: tuple1.count + 1, board: tuple1.board});
        let workspace = [].concat(tuple1.board);
        let tuple2    = tuple1.guesses[tuple1.count];

        workspace[tuple2.pos] = tuple2.num;

        let guesses = deduce(workspace);

        if (guesses === null) {
            return {state: remembered, answer: workspace};
        }

        remembered.push({guesses: guesses, count: 0, board: workspace});
    }

    return {state: [], answer: null};
};

const deduce = (board) => {
    while (true) {
        let stuck = true;
        let guess = null;
        let count = 0;

        // fill in any spots determined by direct conflicts
        let tuple1  = figurebits(board);
        let allowed = tuple1.allowed;
        let needed  = tuple1.needed;

        for (let pos = 0; pos < 81; pos++) {
            if (board[pos] === null) {
                let numbers = listbits(allowed[pos]);
                if (numbers.length === 0) {
                    return [];
                }
                else if (numbers.length === 1) {
                    board[pos] = numbers[0];
                    stuck      = false;
                }
                else if (stuck === true) {
                    let t = numbers.map((val, key) => {
                        return {pos: pos, num: val};
                    });

                    let tuple2 = pickbetter(guess, count, t);
                    guess      = tuple2.guess;
                    count      = tuple2.count;
                }
            }
        }

        if (stuck === false) {
            let tuple3 = figurebits(board);
            allowed    = tuple3.allowed;
            needed     = tuple3.needed;
        }

        // fill in any spots determined by elimination of other locations
        for (let axis = 0; axis < 3; axis++) {
            for (let x = 0; x < 9; x++) {
                let numbers = listbits(needed[axis * 9 + x]);

                for (let n of numbers) {
                    let bit   = 1 << n;
                    let spots = [];

                    for (let y = 0; y < 9; y++) {
                        let pos = posfor(x, y, axis);
                        if (allowed[pos] & bit) {
                            spots.push(pos);
                        }
                    }

                    if (spots.length === 0) {
                        return [];
                    }
                    else if (spots.length === 1) {
                        board[spots[0]] = n;
                        stuck           = false;
                    }
                    else if (stuck) {
                        let t = spots.map((val, key) => {
                            return {pos: val, num: n};
                        });

                        let tuple4 = pickbetter(guess, count, t);
                        guess      = tuple4.guess;
                        count      = tuple4.count;
                    }
                }
            }
        }

        if (stuck) {
            if (guess !== null) {
                shuffleArray(guess);
            }

            return guess;
        }
    }
};

const figurebits = (board) => {
    let needed  = [];
    let allowed = board.map((val, key) => {
        return val === null ? 511 : 0;
    }, []);

    for (let axis = 0; axis < 3; axis++) {
        for (let x = 0; x < 9; x++) {
            let bits = axismissing(board, x, axis);
            needed.push(bits);

            for (let y = 0; y < 9; y++) {
                let pos      = posfor(x, y, axis);
                allowed[pos] = allowed[pos] & bits;
            }
        }
    }

    return {allowed: allowed, needed: needed};
};

const posfor = (x, y, axis) => {
    if (typeof axis === 'undefined') {
        axis = 0;
    }

    if (axis === 0) {
        return x * 9 + y;
    } else if (axis === 1) {
        return y * 9 + x;
    }

    return ([0, 3, 6, 27, 30, 33, 54, 57, 60][x] + [0, 1, 2, 9, 10, 11, 18, 19, 20][y])
};

const axismissing = (board, x, axis) => {
    let bits = 0;

    for (let y = 0; y < 9; y++) {
        let e = board[posfor(x, y, axis)];

        if (e !== null) {
            bits |= 1 << e;
        }
    }

    return 511 ^ bits;
};

const listbits = (bits) => {
    let list = [];
    for (let y = 0; y < 9; y++) {
        if ((bits & (1 << y)) !== 0) {
            list.push(y);
        }
    }

    return list;
};

// TODO: make sure callers utilize the return value correctly
const pickbetter = (b, c, t) => {
    if (b === null || t.length < b.length) {
        return {guess: t, count: 1};
    }
    else if (t.length > b.length) {
        return {guess: b, count: c};
    }
    else if (randomInt(c) === 0) {
        return {guess: t, count: c + 1};
    }

    return {guess: b, count: c + 1};
};

const boardforentries = (entries) => {
    let board = range(81).map((val, key) => {
        return null;
    });

    for (let item of entries) {
        let pos    = item.pos;
        board[pos] = item.num;
    }

    return board;
};

const boardmatches = (b1, b2) => {
    for (let i = 0; i < 81; i++) {
        if (b1[i] !== b2[i]) {
            return false;
        }
    }

    return true;
};

const randomInt = (max) => {
    return Math.floor(Math.random() * (max + 1));
};

const shuffleArray = (original) => {
    // Swap each element with another randomly selected one.
    const len = original.length;
    for (let i = 0; i < len; i++) {
        let j = i;
        while (j === i) {
            j = Math.floor(Math.random() * original.length);
        }
        let contents = original[i];
        original[i]  = original[j];
        original[j]  = contents;
    }
};

const removeElement = (array, from, to) => {
    let rest     = array.slice((to || from) + 1 || array.length);
    array.length = from < 0 ? array.length + from : from;
    return array.push.apply(array, rest);
};

const makeArray = (length, value) => {
    return range(length).map((x, i) => i).map((val, key) => {
        return value;
    });
};

module.exports = {
    makepuzzle : () => makepuzzle(solvepuzzle(makeArray(81, null))),
    solvepuzzle: solvepuzzle,
    ratepuzzle : ratepuzzle,
    posfor     : posfor
};

