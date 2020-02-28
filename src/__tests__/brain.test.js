import { brain } from './../brain';

describe('brain', () => {
    describe('.getBoard()', () => {
        test.each([[3, 3], [10, 10], [8, 16], [3, 5]])(
            'creates a board of set height/width - %dx%d',
            (height, width) => {
                const result = brain.getBoard(height, width, 0);
                expect(result.length).toEqual(height);
                expect(result[0].length).toEqual(width);
            }
        );

        test.each([1, 4, 10, 28])(
            'sets a given number of mines - %d',
            mineCount => {
                const result = brain.getBoard(10, 10, mineCount);
                const total = result.reduce((acc, row) => {
                    return (
                        acc +
                        [...row].reduce((rowSum, current) => rowSum + current)
                    );
                }, 0);
                expect(total).toEqual(10 * mineCount);
            }
        );
    });

    describe('.checkSpot()', () => {
        const board = [
            [null, null, null, null, null],
            [null, null, null, null, null],
            [null, null, 10, 10, 10],
            [10, null, 10, null, 10],
            [10, null, 10, 10, 10],
        ];
        test.each([
            [[1, 1], 1],
            [[1, 2], 2],
            [[1, 3], 3],
            [[4, 1], 4],
            [[3, 1], 5],
            [[3, 3], 8],
        ])(
            'returns a board with that spot revealed',
            ([row, col], expected) => {
                const safeBoard = board.map(x => [...x]);
                const result = brain.checkSpot(safeBoard, [row, col]);
                expect(result[row][col]).toEqual(expected);
            }
        );

        const toClear = [
            [null, null, null, null, null],
            [null, null, null, null, null],
            [null, null, null, null, null],
            [10, null, null, null, 10],
            [null, null, null, null, 10],
        ];
        const cleared = [
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [1, 1, 0, 1, 1],
            [10, 1, 0, 2, 10],
            [null, 1, 0, 2, 10],
        ];
        test.each([[0, 0], [1, 2], [4, 2]])(
            'reveals all surrounding spaces if spot is 0',
            (row, col) => {
                const safeBoard = toClear.map(x => [...x]);
                const result = brain.checkSpot(safeBoard, [row, col]);
                expect(result).toEqual(cleared);
            }
        );
    });
});
