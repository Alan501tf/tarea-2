

// Carrito
let cartCount = 0;

function addToCart() {
  cartCount++;
  document.getElementById("cart-count").textContent = cartCount;
}

// Variables globales
let currentPlayer = "X";
let cells = Array(9).fill(null);
let gameOver = false;

// Función para manejar el turno del jugador
function makeMove(index) {
  if (!gameOver && cells[index] === null) {
    cells[index] = currentPlayer;
    document.querySelectorAll(".cell")[index].textContent = currentPlayer;

    // Verificar si el jugador ha ganado
    if (checkWinner(currentPlayer)) {
      document.getElementById("game-status").textContent = `¡${currentPlayer} ha ganado!`;
      gameOver = true;
      return;
    }

    // Cambiar al siguiente jugador (IA si corresponde)
    currentPlayer = currentPlayer === "X" ? "O" : "X";

    if (currentPlayer === "O") {
      setTimeout(aiMove, 500); // IA realiza su movimiento con un pequeño retraso
    }
  }
}

// Movimiento de la IA
function aiMove() {
  if (!gameOver) {
    // Intentar bloquear o ganar
    let move = findBestMove("O") || findBestMove("X");

    // Si no hay jugadas estratégicas, tomar la primera casilla disponible
    if (move === null) {
      move = cells.indexOf(null);
    }

    // Realizar el movimiento de la IA
    if (move !== null) {
      cells[move] = "O";
      document.querySelectorAll(".cell")[move].textContent = "O";

      // Verificar si la IA ha ganado
      if (checkWinner("O")) {
        document.getElementById("game-status").textContent = "¡La IA (O) ha ganado!";
        gameOver = true;
        return;
      }

      // Cambiar el turno al jugador
      currentPlayer = "X";
    }
  }
}

// Función para encontrar la mejor jugada
function findBestMove(player) {
  for (let i = 0; i < cells.length; i++) {
    if (cells[i] === null) {
      cells[i] = player; // Simular el movimiento
      if (checkWinner(player)) {
        cells[i] = null; // Deshacer el movimiento
        return i;
      }
      cells[i] = null; // Deshacer el movimiento
    }
  }
  return null;
}

// Verificar si un jugador ha ganado
function checkWinner(player) {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  return winningCombinations.some(combination =>
    combination.every(index => cells[index] === player)
  );
}

// Reiniciar el juego
function resetGame() {
  cells = Array(9).fill(null);
  currentPlayer = "X";
  gameOver = false;
  document.querySelectorAll(".cell").forEach(cell => (cell.textContent = ""));
  document.getElementById("game-status").textContent = "¡Tu turno!";
}


