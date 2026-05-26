let fields = document.querySelectorAll("td");
let statusEl = document.getElementById("status");
let scoreXEl = document.getElementById("scoreX");
let scoreOEl = document.getElementById("scoreO");
let scoreDrawEl = document.getElementById("scoreDraw");
let restartBtn = document.getElementById("restart");
let quit = document.getElementById("quit");

let currentPlayer = "X";
let choices = ["X", "O"];
let turn = 0;
let gameOver = false;

let scoreX = 0;
let scoreO = 0;
let scoreDraw = 0;

// Leer tipos de jugador desde localStorage
let p1Type = localStorage.getItem("p1Type") || "Human";
let p2Type = localStorage.getItem("p2Type") || "Human";

const winCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

function setUp()
{
    for(let i = 0; i < 9; i++)
    {
        fields[i].textContent = "";
        fields[i].classList.remove("played");
        fields[i].classList.remove("winning");
        fields[i].classList.add("unactive");
    }

    currentPlayer = "X";
    turn = 0;
    gameOver = false;
    statusEl.textContent = "X's turn";

    // Si el jugador 1 (X) es IA, que juegue solo
    if(p1Type === "AI") setTimeout(aiMove, 500);
}

function playMove(index)
{
    if(gameOver) return;
    if(fields[index].classList.contains("played")) return;

    fields[index].textContent = currentPlayer;
    fields[index].classList.remove("unactive");
    fields[index].classList.add("played");

    let result = checkWin();
    if(result !== null)
    {
        endGame(result.winner, result.combo);
        return;
    }

    if(isDraw())
    {
        endGame(null, null);
        return;
    }

    changeTurn();

    // Si el siguiente jugador es IA, que juegue
    let nextType = (currentPlayer === "X") ? p1Type : p2Type;
    if(nextType === "AI") setTimeout(aiMove, 500);
}

for(let i = 0; i < 9; i++)
{
    fields[i].addEventListener("click", () =>
    {
        // Solo el humano puede pulsar; ignorar clicks si toca IA
        let currentType = (currentPlayer === "X") ? p1Type : p2Type;
        if(currentType === "AI") return;

        playMove(i);
    });
}

restartBtn.addEventListener("click", () => setUp());

quit.addEventListener("click", () => {
    localStorage.setItem("scoreX", scoreX);
    localStorage.setItem("scoreO", scoreO);
    localStorage.setItem("scoreDraw", scoreDraw);
});

function aiMove()
{
    if(gameOver) return;

    // IA tonta: elige una casilla libre al azar
    let freeFields = [];
    for(let i = 0; i < 9; i++)
    {
        if(!fields[i].classList.contains("played"))
        {
            freeFields.push(i);
        }
    }

    if(freeFields.length === 0) return;

    let randomIndex = freeFields[Math.floor(Math.random() * freeFields.length)];
    playMove(randomIndex);
}

function changeTurn()
{
    turn = (turn + 1) % 2;
    currentPlayer = choices[turn];
    statusEl.textContent = currentPlayer + "'s turn";
}

function checkWin()
{
    for(let i = 0; i < winCombos.length; i++)
    {
        let a = winCombos[i][0];
        let b = winCombos[i][1];
        let c = winCombos[i][2];

        let valueA = fields[a].textContent;
        let valueB = fields[b].textContent;
        let valueC = fields[c].textContent;

        if(valueA !== "" && valueA === valueB && valueA === valueC)
        {
            return { winner: valueA, combo: winCombos[i] };
        }
    }
    return null;
}

function isDraw()
{
    for(let i = 0; i < 9; i++)
    {
        if(fields[i].textContent === "") return false;
    }
    return true;
}

function endGame(winner, combo)
{
    gameOver = true;

    if(winner === "X")
    {
        scoreX++;
        scoreXEl.textContent = scoreX;
        statusEl.textContent = "X wins!";
        highlightWin(combo);
    }
    else if(winner === "O")
    {
        scoreO++;
        scoreOEl.textContent = scoreO;
        statusEl.textContent = "O wins!";
        highlightWin(combo);
    }
    else
    {
        scoreDraw++;
        scoreDrawEl.textContent = scoreDraw;
        statusEl.textContent = "Draw!";
    }
}

function highlightWin(combo)
{
    for(let i = 0; i < combo.length; i++)
    {
        fields[combo[i]].classList.add("winning");
    }
}