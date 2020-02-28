export const brain = {
    getBoard: function(height = 10, width = 10, mineCount = 10) {
        if (mineCount > height * width - 4) mineCount = height * width - 4;
        const board = Array(height)
            .fill(Array(width).fill(null))
            .map(row => [...row]);

        let currentCount = 0;
        while (currentCount < mineCount) {
            const [row, col] = [randInt(height), randInt(width)];
            if (isValidCell(row, col, height, width, board[row][col])) {
                board[row][col] = 10;
                currentCount++;
            }
        }

        return board;
    },
    checkSpot: function(board, [row, col]) {
        //BOARD MUST BE MUTABLE
        let nearbyMines = 0;
        const bounds = getBounds(board.length, board[0].length, row, col);

        loopSurroundings((y, x) => {
            if (board[y][x] === 10) nearbyMines++;
        }, bounds);
        board[row][col] = nearbyMines;

        if (nearbyMines === 0) {
            loopSurroundings((y, x) => {
                if (board[y][x] !== 0) this.checkSpot(board, [y, x]);
            }, bounds);
        }

        return board;
    },
};

//helpers
function loopSurroundings(callback, bounds) {
    for (let y = bounds.row.lower; y <= bounds.row.upper; y++) {
        for (let x = bounds.column.lower; x <= bounds.column.upper; x++) {
            callback(y, x);
        }
    }
}

function randInt(max) {
    return Math.floor(Math.random() * max);
}

function isValidCell(row, col, height, width, cellVal) {
    return (
        !(row === 0 && (col === 0 || col === width - 1)) &&
        !(row === height - 1 && (col === 0 || col === width - 1)) &&
        !(cellVal === 10)
    );
}

function getBounds(height, width, row, col) {
    return {
        row: {
            lower: Math.max(0, row - 1),
            upper: Math.min(height - 1, row + 1),
        },
        column: {
            lower: Math.max(0, col - 1),
            upper: Math.min(width - 1, col + 1),
        },
    };
}
