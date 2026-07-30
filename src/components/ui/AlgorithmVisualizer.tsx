"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import "./AlgorithmVisualizer.css";

const ARRAY_SIZE = 16;
const BUBBLE_SPEED_MS = 250;
const INITIAL_ARRAY = [40, 75, 25, 90, 50, 20, 80, 60, 30, 85, 45, 95, 35, 70, 55, 65];

export function AlgorithmVisualizer() {
  const [array, setArray] = useState<number[]>(INITIAL_ARRAY);
  const [isRunning, setIsRunning] = useState(false);
  
  // Bubble Sort state
  const [comparing, setComparing] = useState<number[]>([]);
  const [sortedIndices, setSortedIndices] = useState<number[]>([]);
  
  const timeouts = useRef<NodeJS.Timeout[]>([]);

  const clearTimeouts = () => {
    timeouts.current.forEach(clearTimeout);
    timeouts.current = [];
  };

  const resetState = () => {
    setComparing([]);
    setSortedIndices([]);
    setIsRunning(false);
  };

  const generateArray = useCallback(() => {
    clearTimeouts();
    resetState();
    
    let newArray = [];
    for (let i = 0; i < ARRAY_SIZE; i++) {
      newArray.push(Math.floor(Math.random() * 80) + 20); // 20 to 100
    }
    
    setArray(newArray);
    return newArray;
  }, []);

  const runBubbleSort = (arrToSort: number[]) => {
    let arr = [...arrToSort];
    let animations = [];
    
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        animations.push({ type: "compare", indices: [j, j + 1] });
        if (arr[j] > arr[j + 1]) {
          animations.push({ type: "swap", indices: [j, j + 1], array: [...arr] });
          let temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
          animations.push({ type: "update", array: [...arr] });
        }
      }
      animations.push({ type: "sorted", index: arr.length - i - 1 });
    }
    animations.push({ type: "sorted", index: 0 });

    animations.forEach((anim, i) => {
      const timeout = setTimeout(() => {
        if (anim.type === "compare") {
          setComparing(anim.indices as number[]);
        } else if (anim.type === "update") {
          setArray(anim.array as number[]);
        } else if (anim.type === "sorted") {
          setSortedIndices(prev => [...prev, anim.index as number]);
          setComparing([]);
        }
        
        if (i === animations.length - 1) {
          finishAnimation();
        }
      }, i * BUBBLE_SPEED_MS);
      timeouts.current.push(timeout);
    });
  };

  const finishAnimation = () => {
    setIsRunning(false);
    setComparing([]);
    
    // Auto-restart after 4s
    const restartTimeout = setTimeout(() => {
      const nextArr = generateArray();
      
      const startTimeout = setTimeout(() => {
        runAlgorithm(nextArr);
      }, 500);
      timeouts.current.push(startTimeout);
    }, 4000);
    timeouts.current.push(restartTimeout);
  };

  const runAlgorithm = useCallback((arrOverride?: number[]) => {
    if (isRunning) return;
    setIsRunning(true);
    runBubbleSort(arrOverride || array);
  }, [array, isRunning]);

  const handleRunClick = () => {
    if (isRunning) return;
    runAlgorithm(array);
  };

  const handleShuffleClick = () => {
    if (isRunning) return;
    generateArray();
  };

  // Initial Auto-start
  useEffect(() => {
    // Start immediately without delay
    runAlgorithm(INITIAL_ARRAY);

    return () => clearTimeouts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="algo-vis">
      <div className="algo-vis__header">
        <div className="algo-vis__info">
          <h3 className="algo-vis__title">Bubble Sort</h3>
          <span className="algo-vis__complex">O(N²)</span>
        </div>
        <div className="algo-vis__controls">
          <button 
            className="algo-vis__btn" 
            onClick={handleShuffleClick} 
            disabled={isRunning}
            title="Shuffle Array"
          >
            {/* Shuffle Icon */}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="16 3 21 3 21 8"></polyline>
              <line x1="4" y1="20" x2="21" y2="3"></line>
              <polyline points="21 16 21 21 16 21"></polyline>
              <line x1="15" y1="15" x2="21" y2="21"></line>
              <line x1="4" y1="4" x2="9" y2="9"></line>
            </svg>
          </button>
          <button 
            className="algo-vis__btn algo-vis__btn--primary" 
            onClick={handleRunClick} 
            disabled={isRunning}
            title="Run Sort"
          >
            {/* Play Icon */}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
          </button>
        </div>
      </div>
      
      <div className="algo-vis__canvas">
        {array.map((value, idx) => {
          let barClass = "algo-vis__bar";
          
          const isComparing = comparing.includes(idx);
          const isSorted = sortedIndices.includes(idx);
          if (isComparing) barClass += " algo-vis__bar--compare";
          else if (isSorted) barClass += " algo-vis__bar--sorted";
          
          return (
            <div 
              key={idx} 
              className={barClass} 
              style={{ height: `${value}%` }}
            >
              <span className="algo-vis__val">{value}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
