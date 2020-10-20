import React, { useContext, useState, useEffect } from 'react'
import styled from 'styled-components'
import { Context, PrimaryButton } from '../App'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import jackpotWin from '../assets/jackpots-win.png'
import jackpotLose from '../assets/jackpots-lose.png'
import jackpot from '../assets/jackpots.png'

const RestartButton = styled.div`
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  :hover {
    cursor: pointer;
    opacity: 0.7;
  }
`

const ResultsWrapper = styled.div`
  font-size: 14px;
`

const Result = styled.div`
  font-weight: bold;
  color: #C57633;
`

const SlotMachinesWrapper = styled.div`
  ${(props) => {return !props.isEnabled? `
    pointer-events: none;
  `: ''}}
`

const Text = styled.div`
  font-weight: bold;
  font-size: 17px;
`

const WinProbabilityText = styled(Text)`
  margin-top: 50px;
  position: absolute;
`

const FinishedGame = styled.div`
  margin-top: 22px;
`

const MachineWrapper = styled.div`
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  :hover {
    cursor: pointer;
    opacity: 0.9;
  }
  ${(props) => {
    return props.isFinished ? `
    opacity: ${props.winProbability / props.maxProbability};
  `: ''
  }}
  ${(props) => {
    return !props.isClickable ? `
    pointer-events: none;
  `: ''
  }}
`

const WinProbability = styled.div`
  font-size: 15px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-top: 2px;
  margin-left: 3px;
`

const PlayGround = () => {
  const [{
    isFinished,
    trialsLeft,
    winProbabilityVector
  },{
    restartGame
  }] = useContext(Context);

  return (<div>
    <Header/>
    <div className='position-relative w-100 d-flex align-items-center justify-content-center'>
      {isFinished && 
        <WinProbabilityText className='d-flex align-items-center justify-content-center'> 
          Win Probabilities: 
        </WinProbabilityText>}
    </div>
    <SlotMachinesWrapper isEnabled={!isFinished} className='d-flex align-items-center justify-content-center mt-5'>
      {winProbabilityVector.map((winProbability, index) => (<div key={index}>
        <SlotMachine index={index} isEnabled={trialsLeft > 0} winProbability={winProbability}/>
      </div>))}
    </SlotMachinesWrapper>
    {trialsLeft === 0 && !isFinished && <Text className='mt-4 d-flex align-items-center justify-content-center'>
      Which slot machine was the best?
    </Text>}
    {isFinished && <FinishedGame className='d-flex align-items-center justify-content-center'>
      <PrimaryButton size='small' onClick={restartGame}> PLAY AGAIN </PrimaryButton>
    </FinishedGame>}
  </div>)
} 

const Header = () => {
  const [{
    trialsLeft,
    totalCoins,
  }, {
    selectLevel
  }] = useContext(Context);

  return (
    <div className='d-flex justify-content-between'>
      <RestartButton className='ml-3 mt-3' onClick={() => selectLevel()}>
        <FontAwesomeIcon className='mr-1' icon={faChevronLeft} /> Select Level
      </RestartButton>
      <ResultsWrapper className='d-flex mt-3 mr-3'>
        <div className='mr-1'> Trials left: </div>
        <Result className='font-weight-bold'>{trialsLeft}</Result>
        <div className='ml-3 mr-1'> Total Coins: </div>
        <Result className='font-weight-bold'>{totalCoins}</Result>
      </ResultsWrapper>
    </div>)
}

const SlotMachine = ({ index, winProbability }) => {
  const [{
    maxProbability,
    isFinished,
    trialsLeft
  }, {
    onMachineOutput,
    selectBestMachine,
  }] = useContext(Context);

  const [selectedImage, setSelectedImage] = useState(jackpot);
  const [timeoutRef, setTimeoutRef] = useState(null);

  useEffect(()=>{
    if(isFinished){
      clearTimeout(timeoutRef)
      setSelectedImage(jackpotWin)
    }
    else
      setSelectedImage(jackpot)
  },[isFinished]);

  const formattedWinProbability = () => {
    return Math.floor(winProbability*100)+'%'
  }

  const onMachineClick = async () => {
    if(trialsLeft > 0){
      let didWin = false
      if (Math.random() < winProbability)
        didWin = true
      if(didWin){
        setSelectedImage(jackpotWin)
      }
      else{
        setSelectedImage(jackpotLose)
      }
      onMachineOutput(didWin)
      let timeout = setTimeout(() => setSelectedImage(jackpot), 1000);
      setTimeoutRef(timeout)
    }
    else{
      selectBestMachine(index)
    }
  }

  return (<MachineWrapper
    maxProbability={maxProbability}
    isFinished={isFinished}
    winProbability={winProbability}
    isClickable={selectedImage === jackpot} 
    onClick={onMachineClick}>
    <img draggable={false} width="120px" src={selectedImage} alt=''/>
    {isFinished && <WinProbability> {formattedWinProbability()}</WinProbability>}
  </MachineWrapper>)
}

export default PlayGround