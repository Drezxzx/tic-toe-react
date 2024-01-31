import { useState } from 'react'
import confeti from 'canvas-confetti'
import {Square} from './components/square'
import './App.css'
import {TURNS,WINNER_COMBOS} from './global.js'
import {Winner} from './components/winner.jsx'

function App() {
  
  const [board, setBoard] = useState(()=>{
    const gameSaved = JSON.parse(localStorage.getItem("game")) ||Array(9).fill(null)
    return gameSaved
  })
 const [turn, setTurn] = useState(()=>{
  const turmSaved = localStorage.getItem("turn")|| TURNS.X
  return turmSaved
 })
 const [winner, setWinner]= useState(null)

 
 const resetGame = ()=>{
  localStorage.removeItem("game")
  localStorage.removeItem("turn")
  setBoard(Array(9).fill(null))
  setTurn(TURNS.X)
  setWinner(null)
 }
 const updateBoard = ({index})=>{
  const newTurn = turn === TURNS.X ? TURNS.O: TURNS.X
  if (board[index] || winner) {
    return
  }
  const checkWinner= (boardToCheck)=>{
   for (const combo of WINNER_COMBOS) {
    const [a, b, c]= combo
    if (boardToCheck[a] && boardToCheck[a]===boardToCheck[b]&&boardToCheck[b]===boardToCheck[c]) {
      return boardToCheck[a]
    }
   }
   return null
  }
  const checkGameIsOver = (boardToCheck)=>{
   return boardToCheck.every(board => board !== null)
  }
  const newBoard = [...board]
  newBoard[index]= turn
  setBoard(newBoard)
  setTurn(newTurn) 
  window.localStorage.setItem("turn", newTurn)
  window.localStorage.setItem("game", JSON.stringify(newBoard))
  
  const newWinner = checkWinner(newBoard)
  if (newWinner) {
    confeti()
     setWinner(newWinner)
  }else{
    const empate = checkGameIsOver(newBoard)
    if (empate) {
      setWinner(false)
    }
  }
  
 

 }

  return (
    <main className='board'>
      <h1>tic tac toe</h1>
      <button onClick={resetGame}>Empezar de nuevo</button>
      <section className='game'>
        {
          board.map((cell, i)=>{
            
            return(
            <Square 
            index={i} 
            key={i}
            updateBoard={updateBoard}
            >{board[i]}</Square>)
          })
        }
      </section>
      <section className='turn'>
        <Square isSelected={turn === TURNS.X} >
          {TURNS.X}
        </Square>
        <Square isSelected={turn === TURNS.O} >
          {TURNS.O}
        </Square>
      </section>
        <Winner winner={winner} resetGame={resetGame} ></Winner>
    </main>
  )
}

export default App
