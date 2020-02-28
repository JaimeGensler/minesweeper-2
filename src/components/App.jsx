import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Cell from './Cell';
import EndState from './EndState';

const Grid = styled.div`
    display: grid;
    grid-template-rows: repeat(${props => props.height}, 1fr);
    grid-template-columns: repeat(${props => props.width}, 1fr);
    width: 80vh;
    height: 80vh;
    margin: 10vh auto;
    box-shadow: 0 0 10px 10px gray;
    border: 5px solid black;
`;

function endGame(gameState) {
    if (gameState === 'ACTIVE') {
        return undefined;
    } else if (gameState) {
        return <EndState text={gameState} />;
    }
}

function App({ cells, gameState }) {
    return (
        <div>
            {endGame(gameState)}
            <Grid width={cells.length} height={cells[0].length}>
                {cells.map((row, i) =>
                    row.map((value, j) => (
                        <Cell
                            //
                            value={value}
                            row={i}
                            column={j}
                            key={`${i} - ${j}`}
                        />
                    ))
                )}
            </Grid>
        </div>
    );
}

const mapStateToProps = ({ board, gameState }) => {
    return {
        cells: board,
        gameState,
    };
};

export default connect(mapStateToProps)(App);
