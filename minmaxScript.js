// Grab all field elements
const fields = Array.from(document.querySelectorAll(".field"));
const statusText = document.querySelector("h2");
const resetBtn = document.querySelector("#reset");
const mode = document.querySelector("#mode-select");

// Score mapping
const scores = { X: 1, O: -1, tie: 0 };

// Add event listeners
fields.forEach(field => field.addEventListener("click", clickedField));
resetBtn.addEventListener("click", resetGame);
mode.addEventListener("change", resetGame);

// Reset the board
function resetGame() {
  statusText.textContent = "The game is still on - no winner yet";
  fields.forEach(field => {
    field.textContent = " ";
    field.classList.add("available");
    field.addEventListener("click", clickedField);
  });
}

// Read current state from UI
function getState() {
  return fields.map(field => field.textContent);
}

// Check for a winner in given state
function checkWinner(state) {
  const winPatterns = [
    [0,1,2],[3,4,5],[6,7,8], // rows
    [0,3,6],[1,4,7],[2,5,8], // columns
    [0,4,8],[2,4,6]          // diagonals
  ];

  for (const [a, b, c] of winPatterns) {
    if (
      state[a].trim() !== "" &&
      state[a] === state[b] &&
      state[a] === state[c]
    ) {
      return state[a].trim(); // returns "X" or "O"
    }
  }
  return null;
}

// Minimax with alpha-beta pruning
function miniMax(state, depth, player, alpha, beta) {
  const winner = checkWinner(state);
  if (winner !== null) return scores[winner];
  if (state.every(el => el.trim() !== "")) return scores.tie;

  if (player === "X") {
    let maxEval = -Infinity;
    for (let i = 0; i < state.length; i++) {
      if (state[i].trim() === "") {
        const newState = [...state];
        newState[i] = "X";
        const evalScore = miniMax(newState, depth + 1, "O", alpha, beta);
        maxEval = Math.max(maxEval, evalScore);
        alpha = Math.max(alpha, evalScore);
        if (beta <= alpha) break; // beta cutoff
      }
    }
    return maxEval;
  } else {
    let minEval = Infinity;
    for (let i = 0; i < state.length; i++) {
      if (state[i].trim() === "") {
        const newState = [...state];
        newState[i] = "O";
        const evalScore = miniMax(newState, depth + 1, "X", alpha, beta);
        minEval = Math.min(minEval, evalScore);
        beta = Math.min(beta, evalScore);
        if (beta <= alpha) break; // alpha cutoff
      }
    }
    return minEval;
  }
}

// Compute best move for computer ("X")
function bestMove(state) {
  let bestScore = -Infinity;
  let move = -1;
  for (let i = 0; i < state.length; i++) {
    if (state[i].trim() === "") {
      const newState = [...state];
      newState[i] = "X";
      const score = miniMax(newState, 0, "O", -Infinity, Infinity);
      if (score > bestScore) {
        bestScore = score;
        move = i;
      }
    }
  }
  return move;
}

// Handle user clicks
function clickedField() {
  // Mark user move
  this.textContent = "O";
  this.classList.remove("available");
  this.removeEventListener("click", clickedField);

  // Check if user won
  if (checkWinner(getState()) === "O") {
    endGame("GAME OVER - You won!");
    return;
  }

  // Find computer move
  const state = getState();
  if (state.every(el => el.trim() !== "")) {
    endGame("GAME OVER - It's a tie!");
    return;
  }

  // based on difficulty mode select next move
  // if hard mode, minimax move
 
  if (mode.value === "hard") {
    const index = bestMove(state);
    var field = fields[index];
  } else {
    const availableFields = fields.filter(f => f.classList.contains("available"));
    field = availableFields[Math.floor(Math.random() * availableFields.length)];
      // else random move
      // const randomField = availableFields[Math.floor(Math.random() * availableFields.length)];

  }
  
  field.textContent = "X";
  field.classList.remove("available");
  field.removeEventListener("click", clickedField);

  // Check if computer won
  if (checkWinner(getState()) === "X") {
    endGame("GAME OVER - Computer Won!");
  }
}

// End the game and disable further moves
function endGame(message) {
  statusText.textContent = message;
  fields.forEach(field => field.removeEventListener("click", clickedField));
}
