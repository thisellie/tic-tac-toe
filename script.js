const playerFactory = (name, mark) => {
  return {name, mark}
}

gameBoard = (() => {

  const combinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

  const winner = document.getElementById('winner')
  const message = document.getElementById('message')
  const board = document.getElementById('board')
  const cells = document.querySelectorAll('.cell')
  const restartButton = document.getElementById('restart')
  const startButton = document.getElementById('start')
  const single = document.getElementById('single')
  const versus = document.getElementById('versus')
  const mode = document.getElementById('mode')
  const X = document.getElementById('X')
  const O = document.getElementById('O')
  var playerOne, playerTwo

  // FIXME: Sync select menu to the mode settings when refreshed
  document.addEventListener('DOMContentLoaded', () => single.classList.add('show'))

  X.addEventListener('click', () => {
    if (!X.classList.contains('selected')) {
      O.classList.remove('selected')
      X.classList.add('selected')
    } else X.classList.remove('selected')
  })

  O.addEventListener('click', () => {
    if (!O.classList.contains('selected')) {
      X.classList.remove('selected')
      O.classList.add('selected')
    } else O.classList.remove('selected')
  })

  // TODO: Reset and disable other mode when swapped
  mode.addEventListener('change', () => {
    if (mode.selectedIndex === 1) {
      single.classList.remove('show')
      versus.classList.add('show')
    } else if (mode.selectedIndex === 0) {
      versus.classList.remove('show')
      single.classList.add('show')
    }
  })

  // TODO: Add Feedback that the game starts
  startButton.addEventListener('click', () => gameBoard.start())
  // TODO: Option to change settings
  restartButton.addEventListener('click', () => gameBoard.start())

  function create() {
    playerOne = playerFactory(document.getElementById('playerOne').value, 'X')
    playerTwo = playerFactory(document.getElementById('playerTwo').value, 'O')
  }

  // TODO: Create functions for single and versus mode
  function start() {
    create()
    turn = true
    cells.forEach(cell => {
      cell.classList.remove('X', 'O')
      cell.addEventListener('click', click, { once: true })
    }) 
    hover()
    winner.classList.remove('show')
  }

  function hover() {
    turn = !turn
    board.classList.remove(...board.classList)
    if (turn) board.classList.add('O')
    else board.classList.add('X')
  }

  function click(e) {
    const cell = e.target
    const letter = turn ? playerTwo.mark : playerOne.mark
    cell.classList.add(letter)
    if (check(letter)) post(false, letter)
    else if (draw()) post(true)
    else hover()
  }

  const check = turn => combinations.some(combination => combination.every(index => cells[index].classList.contains(turn)))

  const draw = () => [...cells].every(cell => cell.classList.contains('X') || cell.classList.contains('O'))

  function post(draw, letter) {
    const name = (letter === playerOne.mark ? playerOne : playerTwo).name
    if (draw) message.innerText = 'Draw!'
    else message.innerText = `${name ? name : letter} wins!`
    winner.classList.add('show')
  }

  return {start}
  
})()

// TODO: Add minimax algorithm for single player