import { PropTypes } from 'prop-types';
import { useCallback, useEffect } from 'react';
import '../styles/gamegrid.css';

export default function GameGrid({ state, dispatch, gridArrayToCss }) {
    const size = state.size;
    const speed = state.speed;
    const isRunning = state.isRunning;
    const gridArray = state.gridArray;

    const setGridArray = useCallback((newGridArray) => {
        dispatch({ type: 'SET_GRID', payload: newGridArray });
    }, [dispatch]);

    const createGrid = (size) => {
        const cellSize = screen.height / 3 / size;

        let rows = [];
        for (let i = 0; i < size; i++) {
            let cells = [];
            for (let j = 0; j < size; j++) {
                let index = i * size + j;
                cells.push(<td
                    key={index}
                    className={`game-cell dead`}
                    id={`cell-${index}`}
                    style={
                        {
                            width: `${cellSize}px`,
                            height: `${cellSize}px`,
                        }
                    }
                    onClick={handleClickedCell}></td>);
            }
            rows.push(<tr key={i}>{cells}</tr>);
        }
        return (
            <table className='game-grid'>
                <tbody>
                    {rows}
                </tbody>
            </table>
        );
    };

    const handleClickedCell = (event) => {
        let newGridArray = [...gridArray];
        const cellIndex = event.target.id.split('-')[1];

        if (gridArray[cellIndex] === 1) {
            newGridArray[cellIndex] = 0;
        } else {
            newGridArray[cellIndex] = 1;
        }

        setGridArray(newGridArray);
        gridArrayToCss(newGridArray);
    };

    const getNumberOfNeighbors = useCallback((cellIndex) => {
        let neighbors = 0;

        // check top row
        for (let i = cellIndex - size - 1; i <= cellIndex - size + 1; i++) {
            if (i < 0) {
                continue;
            }
            const cell = gridArray[i];
            if (cell && cell === 1) {
                neighbors++;
            }
        }
        // check left
        if (cellIndex % size !== 0) {
            const previousCell = gridArray[cellIndex - 1];
            if (previousCell && gridArray[cellIndex - 1] === 1) {
                neighbors++;
            }
        }

        // check right
        if (cellIndex % size !== size - 1) {
            const nextCell = gridArray[cellIndex + 1];
            if (nextCell && gridArray[cellIndex + 1] === 1) {
                neighbors++;
            }
        }

        // check bottom row
        for (let i = cellIndex + size - 1; i <= cellIndex + size + 1; i++) {
            if (i > size * size) {
                continue;
            }
            const cell = gridArray[i];
            if (cell && cell === 1) {
                neighbors++;
            }
        }
        console.log(neighbors);
        return neighbors;
    }, [gridArray, size]);

    const gameLoop = useCallback(() => {

        if (!isRunning) {
            return;
        }

        const cellsNumber = size * size;

        let newGridArray = [...gridArray];

        for (let i = 0; i < cellsNumber; i++) {
            const cell = gridArray[i];
            const neighbors = getNumberOfNeighbors(i);

            if (cell === 1) {
                if (neighbors < 2 || neighbors > 3) {
                    newGridArray[i] = 0;
                }
            } else {
                if (neighbors === 3) {
                    newGridArray[i] = 1;
                }
            }
        }

        setGridArray(newGridArray);
        gridArrayToCss(newGridArray);

    }, [gridArray, setGridArray, gridArrayToCss, isRunning, size, getNumberOfNeighbors]);

    const calculateGameSpeed = useCallback(() => {
        return 200 / speed * 2;
    }, [speed]);

    useEffect(() => {
        if (!isRunning) {
            return;
        }
        const timer = setTimeout(() => {
            gameLoop();
        }, calculateGameSpeed());

        // Cleanup the timeout on component unmount
        return () => clearTimeout(timer);
    }, [isRunning, gameLoop, calculateGameSpeed]);

    return (
        <>
            {createGrid(size)}
        </>
    );
};

GameGrid.propTypes = {
    state: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    gridArrayToCss: PropTypes.func.isRequired,
};