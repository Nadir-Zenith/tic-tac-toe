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
    this.classList.remove("available");
    this.removeEventListener("click", clickedField);

    // check winner ... for O
    const f1 = document.querySelector("#field1").textContent;
    const f2 = document.querySelector("#field2").textContent;
    const f3 = document.querySelector("#field3").textContent;
    const f4 = document.querySelector("#field4").textContent;
    const f5 = document.querySelector("#field5").textContent;
    const f6 = document.querySelector("#field6").textContent;
    const f7 = document.querySelector("#field7").textContent;
    const f8 = document.querySelector("#field8").textContent;
    const f9 = document.querySelector("#field9").textContent;
    // - rows: 1 & 2 & 3 or 4 & 5 & 6 or 7 & 8 & 9
    if((f1=='O' && f2=='O' && f3=='O')
    || (f4=='O' && f5=='O' && f6=='O')
    || (f7=='O' && f8=='O' && f9=='O')
    // - columns: 1 & 4 & 7 or 2 & 5 & 8 or 3 & 6 & 9
    || (f1=='O' && f4=='O' && f7=='O')
    || (f2=='O' && f5=='O' && f8=='O')
    || (f3=='O' && f6=='O' && f9=='O')
    // - diagonals: 1 & 5 & 9 or 3 & 5 & 7
    || (f1=='O' && f5=='O' && f9=='O')
    || (f3=='O' && f5=='O' && f7=='O')
    ) {
        console.log("Winner row or column or diagonal");
    }

    // if user is winner:
    // - end game: user won!


    // computer selects a random available field
    const availableFields = document.querySelectorAll(".field.available");
    
    const randomNumber = Math.floor(Math.random()*availableFields.length);
    const randomField = availableFields[randomNumber];


    // if no field is available
    if(!randomField){
        // - end game: tie
        console.log("end game in a tie");
        document.querySelector("h2").textContent = "GAME OVER - it's a tie!";
    }
    else {

        // mark selected field with an 'X'
        randomField.textContent = 'X';
        randomField.classList.remove("available");
        randomField.removeEventListener("click", clickedField);

        // check winner ... for X
        // - rows: 1 & 2 & 3 or 4 & 5 & 6 or 7 & 8 & 9
        // - columns: 1 & 4 & 7 or 2 & 5 & 8 or 3 & 6 & 9
        // - diagonals: 1 & 5 & 9 or 3 & 5 & 7

        // if computer is winner:
        // -end game: computer won!

        // repeat ...
    }
}