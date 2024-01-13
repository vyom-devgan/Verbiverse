const potentialWords = ["APPLE", "BANANA", "ORANGE", "GRAPE", "KIWI"];

function getRandomWord() {
    return potentialWords[Math.floor(Math.random() * potentialWords.length)];
}

function initializeDisplay(word, rowId) {
    const wordRow = document.getElementById(rowId);
    wordRow.innerHTML = '';

    for (let i = 0; i < word.length; i++) {
        const letterSquare = document.createElement("div");
        letterSquare.className = "letter-square";
        letterSquare.textContent = "";
        wordRow.appendChild(letterSquare);
    }
}

function activateNextRow(currentRowId, nextRowId) {
    const currentRow = document.getElementById(currentRowId);
    const nextRow = document.getElementById(nextRowId);
    currentRow.classList.remove("active-row");
    nextRow.classList.add("active-row");
}

let currentRow = 1;
const maxRows = 5;
let targetWord;

function initializeGame() {
    targetWord = getRandomWord();

    for (let i = 1; i <= maxRows; i++) {
        const rowId = `wordRow${i}`;
        initializeDisplay(targetWord, rowId);

        if (i !== 1) {
            const row = document.getElementById(rowId);
            row.classList.remove("active-row");
        }
    }
}

document.addEventListener("keydown", function (event) {
    const keyCode = event.code;
    const key = event.key.toUpperCase();

    if (/^[A-Z]$/.test(key)) {
        const activeRow = document.getElementById(`wordRow${currentRow}`);
        const letterSquares = activeRow.getElementsByClassName("letter-square");

        for (let i = 0; i < letterSquares.length; i++) {
            const letterSquare = letterSquares[i];
            if (letterSquare.textContent === "") {
                letterSquare.textContent = key;
                break;
            }
        }
    } else if (keyCode === "Backspace") {
        event.preventDefault();
        const activeRow = document.getElementById(`wordRow${currentRow}`);
        const letterSquares = activeRow.getElementsByClassName("letter-square");

        for (let i = letterSquares.length - 1; i >= 0; i--) {
            const letterSquare = letterSquares[i];
            if (letterSquare.textContent !== "") {
                letterSquare.textContent = "";
                break;
            }
        }
    } else if (keyCode === "Enter" && isRowFull()) {
        checkAnswer();
    }
});

function isRowFull() {
    const activeRow = document.getElementById(`wordRow${currentRow}`);
    const letterSquares = activeRow.getElementsByClassName("letter-square");

    for (let i = 0; i < letterSquares.length; i++) {
        if (letterSquares[i].textContent === "") {
            return false;
        }
    }
    return true;
}

function checkAnswer() {
    const activeRow = document.getElementById(`wordRow${currentRow}`);
    const letterSquares = activeRow.getElementsByClassName("letter-square");

    let guessedWord = "";
    for (let i = 0; i < letterSquares.length; i++) {
        guessedWord += letterSquares[i].textContent;
    }

    for (let i = 0; i < letterSquares.length; i++) {
        const currentLetter = letterSquares[i].textContent;
        const correctLetter = targetWord[i];

        if (currentLetter === correctLetter) {
            letterSquares[i].classList.add("correct-position");
        } else if (targetWord.includes(currentLetter)) {
            letterSquares[i].classList.add("correct-letter");
        } else {
            letterSquares[i].classList.add("incorrect");
        }
    }

    if (guessedWord === targetWord) {
        console.log("Correct guess!");
        // You can add any other visual feedback for correct guesses here
    } else {
        console.log("Incorrect guess!");
        // You can add any other visual feedback for incorrect guesses here
    }

    if (currentRow < maxRows) {
        currentRow++;
        activateNextRow(`wordRow${currentRow - 1}`, `wordRow${currentRow}`);
    } else {
        console.log("Game over!");
        console.log(targetWord);
    }
}

window.onload = function () {
    initializeGame();
};
