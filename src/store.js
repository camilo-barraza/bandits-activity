import { useState, useEffect } from 'react'
import { LEVELS, TRIALS } from './config'
import { makeGame } from './utils'

const { EASY, MEDIUM, HARD } = LEVELS 

const getProbabilityVector = (level) => {
  return makeGame(level)
}

export const useStore = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [winProbabilityVector, setWinProbabilityVector] = useState([]) 
  const [level, setLevel] = useState(EASY)
  const [results, setResults] = useState([]);
  const [rewards, setRewards] = useState([]);
  const [bestArm, setBestArm] = useState([]);
  const [trialsLeft, setTrialsLeft] = useState(TRIALS[EASY]);
  const [totalCoins, setTotalCoins] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [selectedMachine, setSelectedMachine] = useState(null);

  useEffect(()=>{
    const probabilityVector = getProbabilityVector(level)
    setWinProbabilityVector(probabilityVector)
    setTrialsLeft(TRIALS[level])
  },[level]);

  let maxProbability = 0
  let bestMachine = 0
  winProbabilityVector.forEach((probability, index) => {
    if (probability > maxProbability) {
      bestMachine = index
      maxProbability = probability
    }
  });

  useEffect(()=>{
    if(trialsLeft === 0){
      console.log(results)
    }
  },[trialsLeft]);

  const selectLevel = () => {
    setIsPlaying(false)
    restartGame()
  }

  const restartGame = () => {
    const probabilityVector = getProbabilityVector(level)
    setWinProbabilityVector(probabilityVector)
    setRewards([])
    setBestArm([])
    setResults([])
    setTotalCoins(0)
    setTrialsLeft(TRIALS[level])
    setIsFinished(false)
    setSelectedMachine(null)
  }

  const selectBestMachine = (index) => {
    setIsFinished(true)
    setSelectedMachine(index)
  }

  const onMachineOutput = (didWin) => {
    if(didWin)
      setTotalCoins(coins => coins+1)
    setTrialsLeft(trials => trials-1)
    setResults(results => [...results, didWin])
  }

  // [state, actions]
  return [{
    trialsLeft,
    totalCoins,
    bestMachine,
    maxProbability,
    level,
    isPlaying,
    isFinished,
    winProbabilityVector,
  },
  {
    selectLevel,
    selectBestMachine,
    onMachineOutput,
    restartGame,
    setIsPlaying,
    setLevel
  }];
};
