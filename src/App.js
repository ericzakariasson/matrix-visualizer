import React from "react";
import { motion, AnimateSharedLayout } from "framer-motion";
import "./App.css";
import { swapMatrix, swap } from "./matrix";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const generateMatrix = (n) =>
  Array.from({ length: n }, (_, i) =>
    Array.from({ length: n }, (__, j) => i * n + j + 1)
  );

function App() {
  const [matrixSize, setMatrixSize] = React.useState(5);
  const [matrix, setMatrix] = React.useState(() => generateMatrix(matrixSize));
  const [isRotating, setRotating] = React.useState(false);

  React.useEffect(() => {
    setMatrix(generateMatrix(matrixSize));
  }, [matrixSize]);

  const startRotateClockwise = async () => {
    setRotating(true);
    const n = matrix.length;
    const sleepDuration = 1200 / n;

    // tranpose
    for (let i = 0; i < n; i++) {
      for (let j = i; j < n; j++) {
        if (i !== j) {
          await sleep(sleepDuration);
          setMatrix(swapMatrix([...matrix], i, j));
        }
      }
    }

    // mirror
    for (let i = 0; i < n; i++) {
      let l = 0;
      let r = n - 1;
      while (l < r) {
        await sleep(sleepDuration);
        const mirrored = [...matrix];
        swap(mirrored[i], l, r);
        setMatrix(mirrored);
        l++;
        r--;
      }
    }
    setRotating(false);
  };

  return (
    <div className="wrapper">
      <p className="matrix-size">
        {matrixSize} x {matrixSize}
      </p>
      <input
        type="range"
        step=""
        value={matrixSize}
        onInput={(e) => setMatrixSize(e.target.value)}
        min={3}
        max={9}
        className="slider"
      />
      <AnimateSharedLayout>
        <div className="matrix" layout>
          {matrix.map((r) => (
            <motion.div key={r} className="row">
              {r.map((c) => (
                <motion.div key={c} className="cell" layoutId={c}>
                  {c}
                </motion.div>
              ))}
            </motion.div>
          ))}
        </div>
      </AnimateSharedLayout>
      <button disabled={isRotating} onClick={startRotateClockwise}>
        Rotate Clockwise
      </button>
    </div>
  );
}

export default App;
