import { useReducer, useState } from 'react';
import GameGrid from './components/GameGrid';
import './styles/App.css';


export default function App() {
  const reducer = (state, action) => {
    switch (action.type) {
      case 'SET_SIZE':
        return { ...state, size: action.payload };
      case 'SET_SPEED':
        return { ...state, speed: action.payload };
      case 'SET_RUNNING':
        return { ...state, isRunning: action.payload };
      case 'SET_GRID':
        return { ...state, gridArray: action.payload };
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducer, {
    size: 10,
    speed: 5,
    isRunning: false,
    gridArray: Array(10 * 10).fill(0),
  }
  );

  const [sliderSize, setSliderSize] = useState(10);
  const [sliderSpeed, setSliderSpeed] = useState(5);

  const handleSizeChange = (event) => {
    setSliderSize(Number(event.target.value));
    dispatch({ type: 'SET_SIZE', payload: parseInt(event.target.value) });
    handleClear();
  };

  const handleSpeedChange = (event) => {
    setSliderSpeed(Number(event.target.value));
    dispatch({ type: 'SET_SPEED', payload: parseInt(event.target.value) });
  };

  const handleRandomize = () => {
    dispatch({ type: 'SET_RUNNING', payload: false });
    let randomArray = [];
    for (let i = 0; i < state.size * state.size; i++) {
      randomArray.push(Math.random() < 0.2 ? 1 : 0);
    }
    dispatch({ type: 'SET_GRID', payload: randomArray });
    gridArrayToCss(state.gridArray);
  };

  const handleClear = () => {
    dispatch({ type: 'SET_RUNNING', payload: false });
    dispatch({ type: 'SET_GRID', payload: state.gridArray.fill(0) });
    gridArrayToCss(state.gridArray);
  };

  const gridArrayToCss = (gridArray) => {
    for (let i = 0; i < gridArray.length; i++) {
      if (gridArray[i] === 1) {
        document.getElementById(`cell-${i}`).className = 'game-cell alive';
      } else {
        document.getElementById(`cell-${i}`).className = 'game-cell dead';
      }
    }
  };

  return (
    <>
      <h1>Conway&apos;s Game of Life</h1>
      <GameGrid
        state={state}
        dispatch={dispatch}
        gridArrayToCss={gridArrayToCss} />
      <div className='sliders'>
        <label htmlFor="sizeSlider">Grid Size: {state.size} </label>
        <input
          id="sizeSlider"
          type="range"
          min="5"
          max="50"
          step={0.01}
          value={sliderSize}
          onChange={handleSizeChange}
        />
        <label htmlFor='speedSlider'>Speed: {state.speed} </label>
        <input
          id='speedSlider'
          type='range'
          min='1'
          max='10'
          step={0.01}
          value={sliderSpeed}
          onChange={handleSpeedChange}
        />
      </div>
      <div className='buttons'>
        <button id="start" onClick={() => dispatch({ type: "SET_RUNNING", payload: true })}>Start</button>
        <button id="stop" onClick={() => dispatch({ type: "SET_RUNNING", payload: false })}>Stop</button>
        <button id="clear" onClick={handleClear}>Clear</button>
        <button id="random" onClick={handleRandomize}>Random</button>
      </div>
    </>
  );
};