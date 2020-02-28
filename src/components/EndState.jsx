import React from 'react';
import styled from 'styled-components';

const Curtain = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.6);
`;
const Notification = styled.div`
    position: absolute;
    top: 35vh;
    left: 30vw;
    width: 20vw;
    height: 10vh;
    background-color: white;
    border: 5px solid black;
    border-radius: 5px;
    padding: 2vh 2vw;
    text-align: center;
    box-shadow: 0 0 5px white;
`;

export default function endState({ text }) {
    function handleReset() {
        alert('yeet');
    }
    return (
        <Curtain>
            <Notification>
                <h1>You {text}!</h1>
                <button onClick={handleReset}>Play Again</button>
            </Notification>
        </Curtain>
    );
}
