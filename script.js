const createPlayer = name => {
  const createMessage = () => console.log(`${name} is created`);
  return { name, createMessage }
}

const playerOne = createPlayer('Juan')
const playerTwo = createPlayer('Maria')

game = {
  win: [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ],
  screen: document.getElementById('winner'),
  message: document.getElementById('message'),
  restart: document.getElementById('restart'),
  board: document.getElementById('board'),
  cells: new Array(9),
  turn: false,
  letterHover: function() {
    board.classList.remove(...board.classList)
    if (game.turn) board.classList.add('O')
    else board.classList.add('X')
  },
  addMark: function(cell, letter) {
    cell.classList.add(letter)
  },
  changeTurn: function() {
    game.turn = !game.turn
    game.letterHover()  
  },
  checkWin: function(turn) {
    return this.win.some(combination =>
      combination.every(index =>
        this.cells[index].classList.contains(turn)
    ))
  },
  postGame: function(draw, letter = '') {
    if (draw) message.innerText = 'Draw!'
    else message.innerText = `${letter} wins!`
    winner.classList.add('show')
  },
  drawGame: function() {
    return [...game.cells].every(cell => cell.classList.contains('X') || cell.classList.contains('O'));
  }
}

for (let i = 0; i < game.cells.length; i++) {
  cell = document.createElement('div')
  cell.classList.add('cell')
  game.cells[i] = game.board.appendChild(cell)
}

startGame()

game.restart.addEventListener('click', startGame)

function startGame() {
  game.turn = false
  game.cells.forEach(cell => {
    cell.classList.remove('X', 'O')
    cell.addEventListener('click', clickHandler, { once: true })
  }) 
  game.letterHover()
  game.screen.classList.remove('show')
}

function clickHandler(e) {
  const cell = e.target
  const letter = game.turn ? 'O' : 'X'
  game.addMark(cell, letter)
  if (game.checkWin(letter)) game.postGame(false, letter)
  else if (game.drawGame()) game.postGame(true)
  else game.changeTurn()
}
