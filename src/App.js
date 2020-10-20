import React, { useContext, useEffect } from 'react';
import { useStore } from './store'
import styled from 'styled-components'
import DropdownInput from './components/utils/DropdownInput'
import PlayGround from './components/PlayGround'
import { instructions, LEVELS, TITLE } from './config'
import jackpotWin from './assets/jackpots-win.png'
import './App.css'

const Title = styled.div`
  font-size: 24px;
  font-weight:bold;
  color: #034B7B;
`

const Wrapper = styled.div`
  font-size: 14px;
  font-family: 'Roboto', sans-serif;
  color: #5F6368;
  width: 650px;
`

const Container = styled.div`
  height:100vh;
  width:100vw;
  display: flex;
  justify-content: center;
`

const Instructions = styled.div`
  font-size: 14px;
  color: #5F6368;
`

const DropdownWrapper = styled.div`
  margin-top: 15px;
  margin-left: 15px;
  width: 180px;
`

const PlayGroundWrapper = styled.div`
  background-color: #f8f8f8;
  border: solid 1px white ;
  border-radius: 8px;
  width: 100%;
  height: 280px;
  margin-top: 20px;
`

export const PrimaryButton = styled.div`
  height: ${(props) => { return props.size === 'small' ? '35px' : '40px'}} ;
  width: ${(props) => { return props.size === 'small' ? '120px' : '200px'}} ;
  margin-top:6px;
  font-weight: bold;
  border-radius: 4px;
  color:white;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: #1A7DA9;
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

const StartButtonWrapper = styled.div`
  margin-top: 10px;
  width:100%;
`

const PresentationImgWrapper = styled.div`
  width: 150px;
`

export const Context = React.createContext();

const { EASY, MEDIUM, HARD } = LEVELS 

const App = () => {
  const store = useStore();
  const [
    { isPlaying }
  ] = store;

  useEffect(()=>{
    document.title = TITLE
  },[]);

  return (<Context.Provider value={store}>
      <Container>
      <Wrapper>
        <Title className='d-flex align-items-center justify-content-center mb-3 mt-5'> {TITLE} </Title>
        <Instructions> {instructions} </Instructions>
        <PlayGroundWrapper>
          {!isPlaying && <div>
            <PresentationView/> 
            </div>}
          {isPlaying && <div> 
            <PlayGround /> 
          </div>}
        </PlayGroundWrapper>
      </Wrapper>
    </Container>
  </Context.Provider>)
}

const PresentationView = () => {
  const [{
    level,
  },{
    setLevel,
    setIsPlaying
  }] = useContext(Context);
  
  return (<div>
    <DropdownWrapper>
      <div className='font-weight-bold mb-1'>Select Level:</div>
      <DropdownInput
        value={level}
        menu={[EASY, MEDIUM, HARD]}
        onChange={(value) => setLevel(value)} />
    </DropdownWrapper>
    <div className='w-100 d-flex align-items-center justify-content-center'>
      <PresentationImgWrapper>
        <img width='150px' src={jackpotWin} alt='' />
      </PresentationImgWrapper>
    </div>
    <StartButtonWrapper className='d-flex align-items-center justify-content-center'>
      <PrimaryButton onClick={() => { setIsPlaying(true) }}> START! </PrimaryButton>
    </StartButtonWrapper>
  </div>)
}

export default App;
