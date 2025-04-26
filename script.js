// user selects a field
document.querySelector("#field1").addEventListener("click", clickedField);
document.querySelector("#field2").addEventListener("click", clickedField);
document.querySelector("#field3").addEventListener("click", clickedField);
document.querySelector("#field4").addEventListener("click", clickedField);
document.querySelector("#field5").addEventListener("click", clickedField);
document.querySelector("#field6").addEventListener("click", clickedField);
document.querySelector("#field7").addEventListener("click", clickedField);
document.querySelector("#field8").addEventListener("click", clickedField);
document.querySelector("#field9").addEventListener("click", clickedField);

function clickedField() {
    console.log("Clicked field 1");
    // mark selected field with an 'O'
    this.textContent = "O";


    // mark selected field with an 'O'

    // check winner ... for O
    // - rows: 1 & 2 & 3 or 4 & 5 & 6 or 7 & 8 & 9
    // - columns: 1 & 4 & 7 or 2 & 5 & 8 or 3 & 6 & 9
    // - diagonals: 1 & 5 & 9 or 3 & 5 & 7


    // if user is winner:
    // - end game: user won!


    // computer selects a random available field
    const randomField = document.querySelector("#field5");


    // if no field is available
    // - end game: tie

    // mark selected field with an 'X'
    randomField.textContent = 'X';

    // check winner ... for X
    // - rows: 1 & 2 & 3 or 4 & 5 & 6 or 7 & 8 & 9
    // - columns: 1 & 4 & 7 or 2 & 5 & 8 or 3 & 6 & 9
    // - diagonals: 1 & 5 & 9 or 3 & 5 & 7

    // if computer is winner:
    // -end game: computer won!

    // repeat ...
}