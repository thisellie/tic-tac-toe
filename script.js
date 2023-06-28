const X = 'x'
const O = 'o'
const win = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]
const board = document.getElementById('board')
const cells = document.querySelectorAll('[data-cell]')
const winningScreen = document.getElementById('winning-message')
const winningText = document.querySelector('[data-winning-message-text]')
const restart = document.getElementById('restart-button')
let turn

startGame()

restart.addEventListener('click', startGame)

function startGame() {
  turn = false
  cells.forEach(cell => {
    cell.classList.remove(X)
    cell.classList.remove(O)
    cell.removeEventListener('click' ,handleClick)
    cell.addEventListener('click', handleClick, { once: true })
  })
  setBoardHoverClass()
  winningScreen.classList.remove('show')
}

function handleClick(event) {
  const cell = event.target
  const currentClass = turn ? O : X
  placeMark(cell, currentClass)
  if (checkWin(currentClass)) endGame(false)
  else if (isDraw()) endGame(true)
  else changeTurn()
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass)
}

function changeTurn() {
  turn = !turn
  setBoardHoverClass()
}

function setBoardHoverClass() {
 board.classList.remove(X)
 board.classList.remove(O)
 if (turn) board.classList.add(O)
 else board.classList.add(X)
}

function checkWin(currentClass) {
  return win.some(combination => {
    return combination.every(index => {
      return cells[index].classList.contains(currentClass)
    })
  })
}

function endGame(draw) {
  if (draw) winningText.innerText = 'Draw!'
  else winningText.innerText = `${turn ? 'O' : 'X'} wins!`
  winningScreen.classList.add('show')
}

function isDraw() {
  return [...cells].every(cell => {
    return cell.classList.contains(X) || cell.classList.contains(O)
  })
}