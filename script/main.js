import {
  toArr,
  getByPos,
  getbackOriginalColor,
  equalPos,
  getPosFromEl,
} from "./commonOperations.js";
import symbolsOperations from "./symbolsOperactions.js";

let board = document.getElementById("board");

setupBlocks();
giveOnclicks();
let possibleMovesEl = [];
let teamTurn = true;
let chosen = null;

//  #   #   #   #   #
export function move(symbol) {
  let parentElementSymbol = getPosFromEl(symbol.parentElement);
  if (
    chosen != null &&
    chosen[0] === parentElementSymbol[0] &&
    chosen[1] === parentElementSymbol[1]
  ) {
    resetBlocks(possibleMovesEl);
    chosen = null;
    possibleMovesEl = [];
  } else if (
    (teamTurn && symbol.classList[0] == "white") ||
    (!teamTurn && symbol.classList[0] == "black")
  ) {
    resetBlocks(possibleMovesEl);
    let parentSymbolPos = getPosFromEl(symbol.parentElement);
    possibleMovesEl = symbolsOperations[symbol.classList[1]](parentSymbolPos);
    if (isKingThreatened() && symbol.classList[1] != "king")
      filterImpossibleMoves(symbol);
    else clearDangerousPos(symbol);

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

function changePlaces(newPos, symbol) {
  let newPosDOM = getByPos(newPos);

  if (newPosDOM.children.length === 1) newPosDOM.children[0].remove();
  newPosDOM.appendChild(symbol);

  if (symbol.classList[1] == "pawn") {
    symbol.classList.remove("firstMove");
  }

  resetBlocks(possibleMovesEl);

  teamTurn = !teamTurn;
  chosen = null;

  if (isGameOver()) {
    takeawayOnclicks();
    let gameOver = document.createElement("div");
    gameOver.classList.add("gameOver");
    gameOver.innerHTML = `<h1>${
      teamTurn ? "black" : "white"
    } won</h1>  <button>play again</button>
`;
    gameOver.children[1].onclick = () => window.location.reload();
    document.body.appendChild(gameOver);
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

function giveOnclicks() {
  let symbols = document.getElementsByClassName("symbol");
  for (let i = 0; i < symbols.length; i++) {
    let symbol = symbols[i];
    symbols[i].onclick = () => {
      move(symbol);
    };
  }
}
function takeawayOnclicks() {
  let symbols = document.getElementsByClassName("symbol");
  for (let i = 0; i < symbols.length; i++) {
    let symbol = symbols[i];
    symbols[i].onclick = "";
  }
}

function resetBlocks(possibleMovesEl) {
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
      if (equalPos(possibleMovesCurrEl[j], kingPos))
        if ("pawn" == symbol.classList[1] || "knight" == symbol.classList[1]) {
          possibleMovesEl = [];
          parentElementSymbol.appendChild(symbol);
          return;
        } else {
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
    for (let i = 0; i < possibleMovesEl.length; i++) {
      let currEl = getByPos(possibleMovesEl[i]);
      currEl.appendChild(symbol);
      let possibleMovesThreatener = symbolsOperations[
        threatenerSymbol.classList[1]
      ](getPosFromEl(threatenerSymbol.parentElement));
      for (let j = 0; j < possibleMovesThreatener.length; j++) {
        if (equalPos(kingPos, possibleMovesThreatener[j])) {
          possibleMovesEl = possibleMovesEl.filter(
            (pos) => pos != possibleMovesThreatener[j]
          );
          currEl.children[0].remove();
          break;
        }
        if (j == possibleMovesThreatener - 1) currEl.children[0].remove();
      }
    }
    return;
  }
  possibleMovesEl = [];

  if (
    (symbol.classList[1] == "rook" || symbol.classList[1] == "queen") &&
    (threatenerSymbol.classList[1] == "rook" ||
      threatenerSymbol.classList[1] == "queen")
  ) {
    let threatenerPos = getPosFromEl(threatenerSymbol.parentElement);
    let symbolPos = getPosFromEl(parentElementSymbol);

    if (symbolPos[0] > threatenerPos[0])
      for (let i = symbolPos[0] - 1; i >= threatenerPos[0]; i--)
        possibleMovesEl.push([i, symbolPos[1]]);
    else if (symbolPos[0] < threatenerPos[0])
      for (let i = symbolPos[0] + 1; i <= threatenerPos[0]; i++)
        possibleMovesEl.push([i, symbolPos[1]]);
    else if (symbolPos[1] > threatenerPos[1])
      for (let i = symbolPos[1] - 1; i >= threatenerPos[1]; i--)
        possibleMovesEl.push([symbolPos[0], i]);
    else if (symbolPos[1] < threatenerPos[1])
      for (let i = symbolPos[1] + 1; i <= threatenerPos[1]; i++)
        possibleMovesEl.push([symbolPos[0], i]);
  } else if (
    (symbol.classList[1] == "bishop" || symbol.classList[1] == "queen") &&
    (threatenerSymbol.classList[1] == "bishop" ||
      threatenerSymbol.classList[1] == "queen")
  ) {
    let threatenerPos = getPosFromEl(threatenerSymbol.parentElement);
    let symbolPos = getPosFromEl(parentElementSymbol);

    if (symbolPos[0] > threatenerPos[0] && symbolPos[1] > threatenerPos[1]) {
      let i = symbolPos[0] - 1,
        j = symbolPos[1] - 1;
      for (; !equalPos(threatenerPos, [i, j]); i--) {
        possibleMovesEl.push([i, j]);
        j--;
      }
      possibleMovesEl.push([i, j]);
    } else if (
      symbolPos[0] < threatenerPos[0] &&
      symbolPos[1] < threatenerPos[1]
    ) {
      let i = symbolPos[0] + 1,
        j = symbolPos[1] + 1;
      for (; !equalPos(threatenerPos, [i, j]); i++) {
        possibleMovesEl.push([i, j]);
        j++;
      }
      possibleMovesEl.push([i, j]);
    } else if (
      symbolPos[0] > threatenerPos[0] &&
      symbolPos[1] < threatenerPos[1]
    ) {
      let i = symbolPos[0] - 1,
        j = symbolPos[1] + 1;
      for (; !equalPos(threatenerPos, [i, j]); i--) {
        possibleMovesEl.push([i, j]);
        j++;
      }
      possibleMovesEl.push([i, j]);
    } else if (
      symbolPos[0] < threatenerPos[0] &&
      symbolPos[1] > threatenerPos[1]
    ) {
      let i = symbolPos[0] + 1,
        j = symbolPos[1] - 1;
      for (; !equalPos(threatenerPos, [i, j]); i++) {
        possibleMovesEl.push([i, j]);
        j--;
      }
      possibleMovesEl.push([i, j]);
    }
  }
  parentElementSymbol.appendChild(symbol);
}

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

function isGameOver() {
  let friendlySymbols = document.getElementsByClassName(
    teamTurn ? "white" : "black"
  );
  for (let i = 0; i < friendlySymbols.length; i++) {
    let symbol = friendlySymbols[i];
    let possibleMovesCurrEl = symbolsOperations[symbol.classList[1]](
      getPosFromEl(symbol.parentElement)
    );
    let parentElementSymbol = symbol.parentElement;
    for (let j = 0; j < possibleMovesCurrEl.length; j++) {
      let childEl = getByPos(possibleMovesCurrEl[j]).children[0];
      parentElementSymbol.children[0].remove();

      if (childEl != undefined) {
        getByPos(possibleMovesCurrEl[j]).children[0].remove();
      }
      getByPos(possibleMovesCurrEl[j]).appendChild(symbol);
      if (!isKingThreatened()) {
        getByPos(possibleMovesCurrEl[j]).children[0].remove();
        if (childEl != undefined) {
          getByPos(possibleMovesCurrEl[j]).appendChild(childEl);
        }
        parentElementSymbol.appendChild(symbol);
        return false;
      }
      getByPos(possibleMovesCurrEl[j]).children[0].remove();
      if (childEl != undefined) {
        parentElementSymbol.children[0].remove();
        getByPos(possibleMovesCurrEl[j]).appendChild(childEl);
      }
      parentElementSymbol.appendChild(symbol);
    }
  }
  return true;
}
