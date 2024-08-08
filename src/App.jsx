import { useState } from 'react';
import GameGrid from './components/gamegrid';
import './styles/App.css';

export default function App() {
  const [size, setSize] = useState(10);
  const [speed, setSpeed] = useState(5);
  const [isRunning, setIsRunning] = useState(false);

  const [gridArray, setGridArray] = useState(Array(size * size).fill(0));


  const handleSizeChange = (event) => {
    setSize(Number(event.target.value));
  };

  const handleSpeedChange = (event) => {
    setSpeed(Number(event.target.value));
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
      <header>
        <h1>Conway&apos;s Game of Life</h1>
      </header>
      <main>
        <section>
          <GameGrid
            size={size}
            speed={speed}
            isRunning={isRunning}
            gridArray={gridArray}
            setGridArray={setGridArray}
            gridArrayToCss={gridArrayToCss} />
        </section>
        <section>
          <h2>Controls</h2>
          <label htmlFor="sizeSlider">Grid Size: {size} </label>
          <input
            id="sizeSlider"
            type="range"
            min="5"
            max="100"
            value={size}
            onChange={handleSizeChange}
          /><br />
          <label htmlFor='speedSlider'>Speed: {speed} </label>
          <input
            id='speedSlider'
            type='range'
            min='1'
            max='10'
            value={speed}
            onChange={handleSpeedChange}
          /><br />
          <button id="start" onClick={() => setIsRunning(true)}>Start</button>
          <button id="stop" onClick={() => setIsRunning(false)}>Stop</button>
          <button id="clear" onClick={handleClear}>Clear</button>
        </section>
      </main>
    </>
  );
};
