import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

const Spot = styled.button`
    width: 8vh;
    height: 8vh;
    padding: 1vh;
    box-sizing: border-box;
    padding: 0;
    border: 2px solid white;
    font-size: 6vh;
    background-color: ${props => (props.isRevealed ? 'white' : 'black')};
    &:focus {
        outline: none;
    }
    color: red;
`;
function getChar(isFlagged, value) {
    const emoji = ['', '1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣'];
    if (isFlagged) return '🤔';
    if (value === null || value === 10 || value === 0) return '';
    if (value !== null && value !== 10) return emoji[value];
}

function Cell({ dispatch, value, row, column }) {
    const [isFlagged, setIsFlagged] = useState(false);
    const char = getChar(isFlagged, value);

    function handleLeftClick() {
        if (!isFlagged) {
            const action = { type: 'CHECK_SPOT', location: [row, column] };
            dispatch(action);
        }
    }
    function handleRightClick(e) {
        e.preventDefault();
        if (value === null || value === 10) setIsFlagged(!isFlagged);
    }
    return (
        <Spot
            isRevealed={value !== null && value !== 10}
            onClick={handleLeftClick}
            onContextMenu={handleRightClick}
        >
            {char}
        </Spot>
    );
}

export default connect()(Cell);
