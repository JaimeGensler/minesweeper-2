export const brain = {
    getBoard: function(height = 10, width = 10, mineCount = 10) {
        let board = Array(height).fill(Array(width).fill(null));
        board = board.map(row => [...row]);
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
};

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
