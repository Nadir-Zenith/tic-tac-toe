// get all fields 
const fields = Array.from(document.querySelectorAll(".field"));

// add event listeners
fields.forEach((f) => {
    f.addEventListener("click", clickedField);
});

document.querySelector("#reset").addEventListener("click", resetField);

function resetField() {
    fields.forEach(field => {
        console.log("Game reset")
        field.textContent = "";
        field.addEventListener("click", clickedField);
        field.classList.add("available");
    });
    document.querySelector("h2").textContent = "The game is still on - no winner yet";

}

function checkWinner(mark) {
    // get text contents from the fields
    const f = fields.map(field => field.textContent)

    //
    return (
    // - rows: 1 & 2 & 3 or 4 & 5 & 6 or 7 & 8 & 9
    (f[0]==mark && f[1]==mark && f[2]==mark) || 
    (f[3]==mark && f[4]==mark && f[5]==mark) || 
    (f[6]==mark && f[7]==mark && f[8]==mark) ||
    // - columns: 1 & 4 & 7 or 2 & 5 & 8 or 3 & 6 & 9
    (f[0]==mark && f[3]==mark && f[6]==mark)||
    (f[1]==mark && f[4]==mark && f[7]==mark) || 
    (f[2]==mark && f[5]==mark && f[8]==mark) ||
    // - diagonals: 1 & 5 & 9 or 3 & 5 & 7
    (f[0]==mark && f[4]==mark && f[8]==mark) ||
    (f[2]==mark && f[4]==mark && f[6]==mark)
    );
}

function endGame(message) {
    console.log(message);
    document.querySelector("h2").textContent = message;

    fields.forEach(field => {
        field.removeEventListener("click", clickedField);
    });
}


function clickedField() {
    console.log("Clicked field");
    // mark selected field with an 'O'
    this.textContent = "O";
    this.classList.remove("available");
    this.removeEventListener("click", clickedField);

    // check winner ... for O
    if (checkWinner('O')) {
        endGame("GAME OVER - You won!");
        return;
    } 

    // computer selects a random available field
    const availableFields = fields.filter(f => f.classList.contains("available"));

    if (availableFields.length === 0) {
        endGame("GAME OVER - It's a tie!");
        return;
    }
    
    const randomField = availableFields[Math.floor(Math.random() * availableFields.length)];

    // mark selected field with an 'X'
    randomField.textContent = 'X';
    randomField.classList.remove("available");
    randomField.removeEventListener("click", clickedField);

    // check winner ... for X
    if (checkWinner("X")) {
        endGame("GAME OVER - Computer Won!");
    }
}