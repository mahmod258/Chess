import {
  toArr,
  getByPos,
  getbackOriginalColor,
  equalPos,
  getPosFromEl,
} from "./commonOperations.js";
import symbolsOperations from "./symbolsOperactions.js";

let defaultBoard = `
   <div>
        <div class="whiteBlock">
          <div class="black rook symbol">
            <img src="imgs/black/BlackRook.png" alt="" />
          </div>
        </div>
        <div class="blackBlock">
          <div class="black knight symbol">
            <img src="imgs/black/BlackKnight.png" alt="" />
          </div>
        </div>
        <div class="whiteBlock">
          <div class="black bishop symbol">
            <img src="imgs/black/BlackBishop.png" alt="" />
          </div>
        </div>
        <div class="blackBlock">
          <div class="black queen symbol">
            <img src="imgs/black/BlackQueen.png" alt="" />
          </div>
        </div>
        <div class="whiteBlock">
          <div class="black king symbol">
            <img src="imgs/black/BlackKing.png" alt="" />
          </div>
        </div>
        <div class="blackBlock">
          <div class="black bishop symbol">
            <img src="imgs/black/BlackBishop.png" alt="" />
          </div>
        </div>
        <div class="whiteBlock">
          <div class="black knight symbol">
            <img src="imgs/black/BlackKnight.png" alt="" />
          </div>
        </div>
        <div class="blackBlock">
          <div class="black rook symbol">
            <img src="imgs/black/BlackRook.png" alt="" />
          </div>
        </div>
      </div>
      <div>
        <div class="blackBlock">
          <div class="black pawn symbol firstMove">
            <img src="imgs/black/BlackPawn.png" alt="" />
          </div>
        </div>
        <div class="whiteBlock">
          <div class="black pawn symbol firstMove">
            <img src="imgs/black/BlackPawn.png" alt="" />
          </div>
        </div>
        <div class="blackBlock">
          <div class="black pawn symbol firstMove">
            <img src="imgs/black/BlackPawn.png" alt="" />
          </div>
        </div>
        <div class="whiteBlock">
          <div class="black pawn symbol firstMove">
            <img src="imgs/black/BlackPawn.png" alt="" />
          </div>
        </div>
        <div class="blackBlock">
          <div class="black pawn symbol firstMove">
            <img src="imgs/black/BlackPawn.png" alt="" />
          </div>
        </div>
        <div class="whiteBlock">
          <div class="black pawn symbol firstMove">
            <img src="imgs/black/BlackPawn.png" alt="" />
          </div>
        </div>
        <div class="blackBlock">
          <div class="black pawn symbol firstMove">
            <img src="imgs/black/BlackPawn.png" alt="" />
          </div>
        </div>
        <div class="whiteBlock">
          <div class="black pawn symbol firstMove">
            <img src="imgs/black/BlackPawn.png" alt="" />
          </div>
        </div>
      </div>
      <div>
        <div class="whiteBlock"></div>
        <div class="blackBlock"></div>
        <div class="whiteBlock"></div>
        <div class="blackBlock"></div>
        <div class="whiteBlock"></div>
        <div class="blackBlock"></div>
        <div class="whiteBlock"></div>
        <div class="blackBlock"></div>
      </div>
      <div>
        <div class="blackBlock"></div>
        <div class="whiteBlock"></div>
        <div class="blackBlock"></div>
        <div class="whiteBlock"></div>
        <div class="blackBlock"></div>
        <div class="whiteBlock"></div>
        <div class="blackBlock"></div>
        <div class="whiteBlock"></div>
      </div>
      <div>
        <div class="whiteBlock"></div>
        <div class="blackBlock"></div>
        <div class="whiteBlock"></div>
        <div class="blackBlock"></div>
        <div class="whiteBlock"></div>
        <div class="blackBlock"></div>
        <div class="whiteBlock"></div>
        <div class="blackBlock"></div>
      </div>
      <div>
        <div class="blackBlock"></div>
        <div class="whiteBlock"></div>
        <div class="blackBlock"></div>
        <div class="whiteBlock"></div>
        <div class="blackBlock"></div>
        <div class="whiteBlock"></div>
        <div class="blackBlock"></div>
        <div class="whiteBlock"></div>
      </div>
      <div>
        <div class="whiteBlock">
          <div class="white pawn symbol firstMove">
            <img src="imgs/white/WhitePawn.png" alt="" />
          </div>
        </div>
        <div class="blackBlock">
          <div class="white pawn symbol firstMove">
            <img src="imgs/white/WhitePawn.png" alt="" />
          </div>
        </div>
        <div class="whiteBlock">
          <div class="white pawn symbol firstMove">
            <img src="imgs/white/WhitePawn.png" alt="" />
          </div>
        </div>
        <div class="blackBlock">
          <div class="white pawn symbol firstMove">
            <img src="imgs/white/WhitePawn.png" alt="" />
          </div>
        </div>
        <div class="whiteBlock">
          <div class="white pawn symbol firstMove">
            <img src="imgs/white/WhitePawn.png" alt="" />
          </div>
        </div>
        <div class="blackBlock">
          <div class="white pawn symbol firstMove">
            <img src="imgs/white/WhitePawn.png" alt="" />
          </div>
        </div>
        <div class="whiteBlock">
          <div class="white pawn symbol firstMove">
            <img src="imgs/white/WhitePawn.png" alt="" />
          </div>
        </div>
        <div class="blackBlock">
          <div class="white pawn symbol firstMove">
            <img src="imgs/white/WhitePawn.png" alt="" />
          </div>
        </div>
      </div>
      <div>
        <div class="blackBlock">
          <div class="white rook symbol">
            <img src="imgs/white/WhiteRook.png" alt="" />
          </div>
        </div>
        <div class="whiteBlock">
          <div class="white knight symbol">
            <img src="imgs/white/WhiteKnight.png" alt="" />
          </div>
        </div>
        <div class="blackBlock">
          <div class="white bishop symbol">
            <img src="imgs/white/WhiteBishop.png" alt="" />
          </div>
        </div>
        <div class="whiteBlock">
          <div class="white queen symbol">
            <img src="imgs/white/WhiteQueen.png" alt="" />
          </div>
        </div>
        <div class="blackBlock">
          <div class="white king symbol">
            <img src="imgs/white/WhiteKing.png" alt="" />
          </div>
        </div>
        <div class="whiteBlock">
          <div class="white bishop symbol">
            <img src="imgs/white/WhiteBishop.png" alt="" />
          </div>
        </div>
        <div class="blackBlock">
          <div class="white knight symbol">
            <img src="imgs/white/WhiteKnight.png" alt="" />
          </div>
        </div>
        <div class="whiteBlock">
          <div class="white rook symbol">
            <img src="imgs/white/WhiteRook.png" alt="" />
          </div>
        </div>
      </div>
`;
let board = document.getElementById("board");
if (localStorage.getItem("board") == undefined) {
  localStorage.setItem("board", defaultBoard);
  localStorage.setItem("teamTurn", true);
  localStorage.setItem("history", "[]");
}
board.innerHTML = localStorage.getItem("board");

setupBlocks();
giveOnclicks();

//  #   #   #   #   #

let possibleMovesEl = [];
let teamTurn = true;
let chosen = null;
let history = JSON.parse(localStorage.history);
let options = document.getElementsByClassName("options")[0];

teamTurn = JSON.parse(localStorage.teamTurn);

options.children[0].onclick = () => {
  localStorage.setItem("board", defaultBoard);
  localStorage.setItem("teamTurn", true);
  location.reload();
};

options.children[1].onclick = () => {
  if (history.length > 0) {
    let pastBoard = history.pop();
    board.innerHTML = pastBoard;
    for (let i = 0; i < board.children.length; i++) {
      for (let j = 0; j < board.children[i].children.length; j++) {
        let currEl = board.children[i].children[j];
        if (currEl.style.backgroundColor == "brown")
          currEl.style.backgroundColor = getbackOriginalColor(
            getPosFromEl(currEl)
          );
      }
    }
    giveOnclicks();
    possibleMovesEl = [];
    chosen = null;
    teamTurn = !teamTurn;
    localStorage.setItem("teamTurn", teamTurn ? "true" : "false");
    localStorage.setItem("board", board.innerHTML);
  }
};

//  #   #   #   #   #

export function move(symbol) {
  let parentElementSymbol = getPosFromEl(symbol.parentElement);
  if (
    chosen != null &&
    chosen[0] === parentElementSymbol[0] &&
    chosen[1] === parentElementSymbol[1]
  ) {
    chosen = null;
    resetBlocks(possibleMovesEl);
    possibleMovesEl = [];
    symbol.parentElement.style.backgroundColor = getbackOriginalColor(
      getPosFromEl(symbol.parentElement)
    );
  } else if (
    (teamTurn && symbol.classList[0] == "white") ||
    (!teamTurn && symbol.classList[0] == "black")
  ) {
    resetBlocks(possibleMovesEl);
    possibleMovesEl = [];

    let parentSymbolPos = getPosFromEl(symbol.parentElement);
    possibleMovesEl = symbolsOperations[symbol.classList[1]](parentSymbolPos);
    symbol.parentElement.style.backgroundColor = "yellow";
    if (isKingThreatened() && symbol.classList[1] != "king") {
      filterImpossibleMoves(symbol);
    } else clearDangerousPos(symbol);
    for (let i = 0; i < possibleMovesEl.length; i++) {
      let currEl = getByPos(possibleMovesEl[i]);
      currEl.style.backgroundColor = "brown";
      currEl.onclick = () => {
        changePlaces(possibleMovesEl[i], symbol);
      };
      if (currEl.children.length === 1) currEl.children[0].onclick = "";
    }
    chosen = parentSymbolPos;
  }
}

//  #   #   #   #   #

function changePlaces(newPos, symbol) {
  symbol.parentElement.style.backgroundColor = getbackOriginalColor(
    getPosFromEl(symbol.parentElement)
  );
  history.push(board.innerHTML);

  let newPosDOM = getByPos(newPos);

  if (newPosDOM.children.length === 1) newPosDOM.children[0].remove();
  newPosDOM.appendChild(symbol);

  if (symbol.classList[1] == "pawn") {
    if (newPos[0] == 0 || newPos[0] == 7) pawnPromotion(newPos);

    symbol.classList.remove("firstMove");
  }

  resetBlocks(possibleMovesEl);

  teamTurn = !teamTurn;
  chosen = null;

  localStorage.setItem("teamTurn", teamTurn ? "true" : "false");
  localStorage.setItem("board", board.innerHTML);
  localStorage.setItem("history", JSON.stringify(history));
  if (isKingThreatened() && isGameOver()) {
    takeawayOnclicks();
    let gameOver = document.getElementsByClassName("gameOver")[0];

    gameOver.style.display = "flex";

    gameOver.innerHTML = `<h1>${
      teamTurn ? "black" : "white"
    } won</h1>  <button>play again</button>
    `;
    gameOver.children[1].onclick = () => location.reload();
    document.body.appendChild(gameOver);
    localStorage.setItem("board", defaultBoard);
    localStorage.setItem("teamTurn", true);
    localStorage.setItem("history", "[]");
  }
}

//  #   #   #   #   #

function setupBlocks() {
  let boardArr = toArr(board.children);

  for (let i = 0; i < boardArr.length; i++) {
    let boardRowArr = toArr(boardArr[i].children);

    for (let j = 0; j < boardRowArr.length; j++) {
      boardRowArr[j].id = `${i} ${j}`;
    }
  }
}

//  #   #   #   #   #

function giveOnclicks() {
  let symbols = document.getElementsByClassName("symbol");
  for (let i = 0; i < symbols.length; i++) {
    let symbol = symbols[i];
    symbols[i].onclick = () => {
      move(symbol);
    };
  }
}

//  #   #   #   #   #

function takeawayOnclicks() {
  let symbols = document.getElementsByClassName("symbol");
  for (let i = 0; i < symbols.length; i++) {
    let symbol = symbols[i];
    symbols[i].onclick = "";
  }
}

//  #   #   #   #   #

function resetBlocks(possibleMovesEl) {
  if (chosen != null && getByPos(chosen).children[0] != undefined)
    getByPos(chosen).style.backgroundColor = getbackOriginalColor(chosen);
  for (let i = 0; i < possibleMovesEl.length; i++) {
    let currEl = getByPos(possibleMovesEl[i]);
    currEl.style.backgroundColor = getbackOriginalColor(possibleMovesEl[i]);
    if (currEl.children.length === 1)
      currEl.children[0].onclick = () => {
        move(currEl.children[0]);
      };
    currEl.onclick = "";
  }
}

//  #   #   #   #   #

function clearDangerousPos(symbol) {
  if (symbol.classList[1] == "king") return;
  let color = teamTurn ? "white" : "black";
  let enemyColor = !teamTurn ? "white" : "black";

  let king = document.getElementsByClassName(color + " king")[0];
  let kingPos = getPosFromEl(king.parentElement);
  let enemySymbols = document.getElementsByClassName(enemyColor);

  let parentElementSymbol = symbol.parentElement;
  parentElementSymbol.children[0].remove();

  let threatenerSymbol = null;
  for (let i = 0; i < enemySymbols.length; i++) {
    if (enemySymbols[i].classList[1] == "king") continue;
    let possibleMovesCurrEl = symbolsOperations[enemySymbols[i].classList[1]](
      getPosFromEl(enemySymbols[i].parentElement)
    );
    for (let j = 0; j < possibleMovesCurrEl.length; j++) {
      if (equalPos(possibleMovesCurrEl[j], kingPos)) {
        threatenerSymbol = enemySymbols[i];
        break;
      }
    }
  }

  if (threatenerSymbol == null) {
    parentElementSymbol.appendChild(symbol);
    return;
  }

  if (symbol.classList[1] == "pawn") {
    let newPossibleMoves = [];
    for (let i = 0; i < possibleMovesEl.length; i++) {
      let currPosEl = getByPos(possibleMovesEl[i]);
      let currPosElSymbol = null;
      if (currPosEl.children.length == 1) {
        currPosElSymbol = currPosEl.children[0];
        currPosEl.children[0].remove();
      }
      currPosEl.appendChild(symbol);
      if (!isKingThreatened()) {
        newPossibleMoves.push(possibleMovesEl[i]);
      }
      currPosEl.children[0].remove();
      if (currPosElSymbol != null) currPosEl.appendChild(currPosElSymbol);
    }
    possibleMovesEl = newPossibleMoves;
    parentElementSymbol.appendChild(symbol);
    return;
  }
  possibleMovesEl = [];
  let threatenerPos = getPosFromEl(threatenerSymbol.parentElement);
  let symbolPos = getPosFromEl(parentElementSymbol);

  if (
    (symbol.classList[1] == "rook" || symbol.classList[1] == "queen") &&
    (threatenerSymbol.classList[1] == "rook" ||
      threatenerSymbol.classList[1] == "queen") &&
    threatenerPos[1] == symbolPos[1]
  ) {
    if (kingPos[0] > threatenerPos[0])
      for (let i = kingPos[0] - 1; i >= threatenerPos[0]; i--)
        possibleMovesEl.push([i, kingPos[1]]);
    else if (kingPos[0] < threatenerPos[0])
      for (let i = kingPos[0] + 1; i <= threatenerPos[0]; i++)
        possibleMovesEl.push([i, kingPos[1]]);
    else if (kingPos[1] > threatenerPos[1])
      for (let i = kingPos[1] - 1; i >= threatenerPos[1]; i--)
        possibleMovesEl.push([kingPos[0], i]);
    else if (kingPos[1] < threatenerPos[1])
      for (let i = kingPos[1] + 1; i <= threatenerPos[1]; i++)
        possibleMovesEl.push([kingPos[0], i]);
  } else if (
    (symbol.classList[1] == "bishop" || symbol.classList[1] == "queen") &&
    (threatenerSymbol.classList[1] == "bishop" ||
      threatenerSymbol.classList[1] == "queen")
  ) {
    if (kingPos[0] > threatenerPos[0] && kingPos[1] > threatenerPos[1]) {
      let i = kingPos[0] - 1,
        j = kingPos[1] - 1;
      for (; !equalPos(threatenerPos, [i, j]); i--) {
        possibleMovesEl.push([i, j]);
        j--;
      }
      possibleMovesEl.push([i, j]);
    } else if (kingPos[0] < threatenerPos[0] && kingPos[1] < threatenerPos[1]) {
      let i = kingPos[0] + 1,
        j = kingPos[1] + 1;
      for (; !equalPos(threatenerPos, [i, j]); i++) {
        possibleMovesEl.push([i, j]);
        j++;
      }
      possibleMovesEl.push([i, j]);
    } else if (kingPos[0] > threatenerPos[0] && kingPos[1] < threatenerPos[1]) {
      let i = kingPos[0] - 1,
        j = kingPos[1] + 1;
      for (; !equalPos(threatenerPos, [i, j]); i--) {
        possibleMovesEl.push([i, j]);
        j++;
      }
      possibleMovesEl.push([i, j]);
    } else if (kingPos[0] < threatenerPos[0] && kingPos[1] > threatenerPos[1]) {
      let i = kingPos[0] + 1,
        j = kingPos[1] - 1;
      for (; !equalPos(threatenerPos, [i, j]); i++) {
        possibleMovesEl.push([i, j]);
        j--;
      }
      possibleMovesEl.push([i, j]);
    }
  }
  let filteredPossibleMoves = [];
  for (let i = 0; i < possibleMovesEl.length; i++) {
    if (!equalPos(possibleMovesEl[i], symbolPos))
      filteredPossibleMoves.push(possibleMovesEl[i]);
  }
  possibleMovesEl = filteredPossibleMoves;
  parentElementSymbol.appendChild(symbol);
}

//  #   #   #   #   #

function isKingThreatened() {
  let kingPos = getPosFromEl(
    document.getElementsByClassName((teamTurn ? "white" : "black") + " king")[0]
      .parentElement
  );
  let enemies = document.getElementsByClassName(teamTurn ? "black" : "white");
  for (let i = 0; i < enemies.length; i++) {
    let possibleMovesCurrEl = symbolsOperations[enemies[i].classList[1]](
      getPosFromEl(enemies[i].parentElement)
    );
    for (let j = 0; j < possibleMovesCurrEl.length; j++) {
      if (equalPos(possibleMovesCurrEl[j], kingPos)) return true;
    }
  }
  return false;
}

//  #   #   #   #   #

function filterImpossibleMoves(symbol) {
  for (let i = 0; i < possibleMovesEl.length; i++) {
    let currEl = getByPos(possibleMovesEl[i]);
    let currElChild = currEl.children[0];
    let parentSymbol = symbol.parentElement;
    if (currEl.children.length == 1) currEl.children[0].remove();
    parentSymbol.children[0].remove();
    currEl.appendChild(symbol);
    if (isKingThreatened()) {
      possibleMovesEl = possibleMovesEl.filter(
        (pos) => !equalPos(pos, possibleMovesEl[i])
      );
      i--;
    }
    currEl.children[0].remove();
    if (currElChild != undefined) currEl.appendChild(currElChild);
    parentSymbol.appendChild(symbol);
  }
}

//  #   #   #   #   #

function isGameOver() {
  let color = teamTurn ? "white" : "black";
  let king = document.getElementsByClassName(color + " king")[0];
  let kingPos = getPosFromEl(king.parentElement);
  let threatenerSymbol = null;
  let threatenerSymbolPos = null;
  let enemyColor = !teamTurn ? "white" : "black";
  let enemySymbols = document.getElementsByClassName(enemyColor);
  let friendlySymbols = document.getElementsByClassName(color);
  let kingPossibleMoves = symbolsOperations["king"](
    getPosFromEl(king.parentElement)
  );
  if (kingPossibleMoves.length > 0) return false;
  for (let i = 0; i < enemySymbols.length; i++) {
    if (enemySymbols[i].classList[1] == "king") continue;
    let enemySymbolParent = enemySymbols[i].parentElement;
    let possibleMovesCurrEl = symbolsOperations[enemySymbols[i].classList[1]](
      getPosFromEl(enemySymbols[i].parentElement)
    );
    for (let j = 0; j < possibleMovesCurrEl.length; j++) {
      if (equalPos(possibleMovesCurrEl[j], kingPos)) {
        if (threatenerSymbol != null) return true;
        threatenerSymbol = enemySymbols[i];
        threatenerSymbolPos = getPosFromEl(enemySymbols[i].parentElement);
      }
    }
  }

  for (let i = 0; i < friendlySymbols.length; i++) {
    if (friendlySymbols[i].classList[1] != "king") {
      let friendlyParent = friendlySymbols[i].parentElement;
      let threatenerSymbolParent = threatenerSymbol.parentElement;
      let temp = friendlySymbols[i];
      friendlyParent.children[0].remove();
      threatenerSymbolParent.children[0].remove();

      let isKingThreatenedBool = isKingThreatened();
      friendlyParent.appendChild(temp);
      threatenerSymbolParent.appendChild(threatenerSymbol);
      if (isKingThreatenedBool) continue;
    }
    let currPossibleMoves = symbolsOperations[friendlySymbols[i].classList[1]](
      getPosFromEl(friendlySymbols[i].parentElement)
    );
    for (let j = 0; j < currPossibleMoves.length; j++) {
      if (
        equalPos(
          currPossibleMoves[j],
          getPosFromEl(threatenerSymbol.parentElement)
        )
      )
        return false;
    }
  }
  let threatPos = {};

  if (
    threatenerSymbol.classList[1] == "bishop" ||
    (threatenerSymbol.classList[1] == "queen" &&
      threatenerSymbolPos[0] != kingPos[0] &&
      threatenerSymbolPos[1] != kingPos[1])
  ) {
    if (
      (threatenerSymbolPos[0] > kingPos[0] &&
        threatenerSymbolPos[1] > kingPos[1]) ||
      (threatenerSymbolPos[0] < kingPos[0] &&
        threatenerSymbolPos[1] < kingPos[1])
    ) {
      for (let i = 0, j = 0; j > 8 && i > 8; i++) {
        if (
          (i > threatenerSymbolPos[0] && i < kingPos[0]) ||
          (i < threatenerSymbolPos[0] && i > kingPos[0])
        ) {
          threatPos["" + i + j] = true;
        }
        j++;
      }
    } else if (
      (threatenerSymbolPos[0] < kingPos[0] &&
        threatenerSymbolPos[1] > kingPos[1]) ||
      (threatenerSymbolPos[0] > kingPos[0] &&
        threatenerSymbolPos[1] < kingPos[1])
    ) {
      for (let i = 0, j = 7; j > 8 && i >= 0; i++) {
        if (
          (i > threatenerSymbolPos[0] && i < kingPos[0]) ||
          (i < threatenerSymbolPos[0] && i > kingPos[0])
        ) {
          threatPos["" + i + j] = true;
        }
        j--;
      }
    }
  } else if (
    threatenerSymbol.classList[1] == "rook" ||
    (threatenerSymbol.classList[1] == "queen" &&
      (threatenerSymbolPos[0] == kingPos[0] ||
        threatenerSymbolPos[1] == kingPos[1]))
  ) {
    if (threatenerSymbolPos[0] == kingPos[0]) {
      let i = 0;
      while (i < 8) {
        if (
          (i < threatenerSymbolPos[0] && i > kingPos[0]) ||
          (i > threatenerSymbolPos[0] && i < kingPos[0])
        )
          threatPos["" + i + threatenerSymbolPos[1]] = true;
        i++;
      }
    } else if (threatenerSymbolPos[1] == kingPos[1]) {
      let i = 0;
      while (i < 8) {
        console.log();
        if (
          (i < threatenerSymbolPos[0] && i > kingPos[0]) ||
          (i > threatenerSymbolPos[0] && i < kingPos[0])
        ) {
          threatPos["" + i + threatenerSymbolPos[1]] = true;
        }
        i++;
      }
    }
  }
  for (let i = 0; i < friendlySymbols.length; i++) {
    if (friendlySymbols[i].classList[1] != "king") {
      let friendlyParent = friendlySymbols[i].parentElement;
      let threatenerSymbolParent = threatenerSymbol.parentElement;
      let temp = friendlySymbols[i];
      friendlyParent.children[0].remove();
      threatenerSymbolParent.children[0].remove();

      let isKingThreatenedBool = isKingThreatened();
      friendlyParent.appendChild(temp);
      threatenerSymbolParent.appendChild(threatenerSymbol);
      if (isKingThreatenedBool) continue;

      let friendlyPossibleMoves = symbolsOperations[
        friendlySymbols[i].classList[1]
      ](getPosFromEl(friendlySymbols[i].parentElement));
      for (let j = 0; j < friendlyPossibleMoves.length; j++) {
        if (
          threatPos[
            "" + friendlyPossibleMoves[j][0] + friendlyPossibleMoves[j][1]
          ]
        )
          return false;
      }
    }
  }
  return true;
}

//  #   #   #   #   #

function pawnPromotion(pos) {
  let color = teamTurn ? "white" : "black";
  let colorUpperCase = color[0].toUpperCase() + color.slice(1);
  takeawayOnclicks();
  let promotion = document.createElement("div");
  promotion.classList.add("promotion");
  promotion.innerHTML = `
   <div>
        <img src="imgs/${color}/${colorUpperCase}Bishop.png" alt="" />
      </div>
      <div>
        <img src="imgs/${color}/${colorUpperCase}Knight.png" alt="" />
      </div>
      <div>
        <img src="imgs/${color}/${colorUpperCase}Queen.png" alt="" />
      </div>
      <div>
        <img src="imgs/${color}/${colorUpperCase}Rook.png" alt="" />
      </div>
  `;
  let symbols = ["bishop", "knight", "queen", "rook"];
  document.body.appendChild(promotion);
  symbols.forEach(
    (symbol, i) =>
      (promotion.children[i].onclick = () =>
        changeTo(symbol, pos, color, colorUpperCase))
  );
  promotion.style.top = color == "black" ? "505px" : "auto";
}

//  #   #   #   #   #

function changeTo(symbol, pos, color, colorUpperCase) {
  let newSymbol = document.createElement("div");
  newSymbol.className = color + " " + symbol + " symbol";
  newSymbol.innerHTML = `<img src="imgs/${color}/${
    colorUpperCase + (symbol[0].toUpperCase() + symbol.slice(1))
  }.png" alt="">`;

  getByPos(pos).children[0].remove();
  getByPos(pos).appendChild(newSymbol);
  let promotion = document.getElementsByClassName("promotion")[0];
  promotion.remove();
  giveOnclicks();
}

//  #   #   #   #   #

function restartGame() {
  localStorage.setItem("board", defaultBoard);
  localStorage.setItem("teamTurn", true);
  window.reload();
}
