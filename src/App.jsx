import { useState } from 'react';
import GameGrid from './components/GameGrid';
import './styles/App.css';

export default function App() {
  const [size, setSize] = useState(10);
  const [sliderSize, setSliderSize] = useState(10);
  const [speed, setSpeed] = useState(5);
  const [sliderSpeed, setSliderSpeed] = useState(5);
  const [isRunning, setIsRunning] = useState(false);
  const [gridArray, setGridArray] = useState(Array(size * size).fill(0));

  const handleSizeChange = (event) => {
    setSliderSize(Number(event.target.value));
    setSize(parseInt(event.target.value));
    handleClear();
  };

  const handleSpeedChange = (event) => {
    setSliderSpeed(Number(event.target.value));
    setSpeed(parseInt(event.target.value));
  };

  const handleRandomize = () => {
    setIsRunning(false);
    let randomArray = [];
    for (let i = 0; i < size * size; i++) {
      randomArray.push(Math.random() < 0.2 ? 1 : 0);
    }
    setGridArray(randomArray);
    gridArrayToCss(randomArray);
  };

  const handleClear = () => {
    setIsRunning(false);
    setGridArray(gridArray.fill(0));
    gridArrayToCss(gridArray);
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
      <p></p>
      <GameGrid
        size={size}
        speed={speed}
        isRunning={isRunning}
        gridArray={gridArray}
        setGridArray={setGridArray}
        gridArrayToCss={gridArrayToCss} />
      <div className='sliders'>
        <label htmlFor="sizeSlider">Grid Size: {size} </label>
        <input
          id="sizeSlider"
          type="range"
          min="5"
          max="50"
          step={0.01}
          value={sliderSize}
          onChange={handleSizeChange}
        />
        <label htmlFor='speedSlider'>Speed: {speed} </label>
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
        <button id="start" onClick={() => setIsRunning(true)}>Start</button>
        <button id="stop" onClick={() => setIsRunning(false)}>Stop</button>
        <button id="clear" onClick={handleClear}>Clear</button>
        <button id="random" onClick={handleRandomize}>Random</button>
      </div>
    </>
  );
};