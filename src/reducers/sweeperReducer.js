import { brain } from './../brain';

export default (state = initialState, action) => {
    switch (action.type) {
        case 'MAKE_MOVE': {
        }
        default:
            return state;
    }
    return newState;
};

const initialState = {
    board: Array(10).fill(Array(10).fill(0)),
    gameState: 'ACTIVE',
    activePlayer: Math.random() < 0.5 ? 1 : -1,
    turnNumber: 1,
};
