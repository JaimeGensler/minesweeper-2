import { brain } from './../brain';

describe('brain', () => {
    test.each([[3, 3], [10, 10], [8, 16], [3, 5]])(
        '.getBoard should create a board of set height/width - %dx%d',
        (height, width) => {
            const result = brain.getBoard(height, width, 0);
            expect(result.length).toEqual(height);
            expect(result[0].length).toEqual(width);
        }
    );

    const corners = null;
    test.each([1, 4, 10, 28])(
        '.getBoard sets a given number of mines - %d',
        mineCount => {
            const result = brain.getBoard(10, 10, mineCount);
            const total = result.reduce((acc, row) => {
                return (
                    acc + [...row].reduce((rowSum, current) => rowSum + current)
                );
            }, 0);
            expect(total).toEqual(10 * mineCount);
        }
    );
});
