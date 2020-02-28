import { brain } from './../brain';

export const sweeperReducer = (state = initialState, action) => {
    console.log(action);
    switch (action.type) {
        case 'CHECK_SPOT': {
            const [row, col] = action.location;
            const newState = { ...state };
            if (newState.board[row][col] === 10) {
                newState.gameState = 'LOSE';
                return newState;
            } else {
                console.log('boom');
                const newBoard = newState.board.map(x => [...x]);
                console.log(newBoard);
                brain.checkSpot(newBoard, [row, col]);
                newState.board = newBoard;
            }
            if (!newState.board.flat().some(e => e === null)) {
                newState.gameState = 'WIN';
            }
            return newState;
        }
        case 'RESET_GAME': {
            return initialState;
        }
        default:
            return state;
    }
};

const initialState = {
    board: brain.getBoard(10, 10, 15),
    gameState: 'ACTIVE',
};
