import {
  toArr,
  getByIndex,
  getbackOriginalColor,
  equalPos,
  getPosFromEl,
} from "./commonOperations.js";
import symbolsOperations from "./symbolsOperactions.js";

let board = document.getElementById("board");

setupBlocks();
let symbols = document.getElementsByClassName("symbol");
giveOnclicks();
let lastPossibleBlocks = [];
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
    resetBlocks(lastPossibleBlocks);
    chosen = null;
    lastPossibleBlocks = [];
  } else if (
    (teamTurn && symbol.classList[0] == "white") ||
    (!teamTurn && symbol.classList[0] == "black")
  ) {
    resetBlocks(lastPossibleBlocks);
    let parentSymbolPos = getPosFromEl(symbol.parentElement);
    lastPossibleBlocks =
      symbolsOperations[symbol.classList[1]](parentSymbolPos);
    clearDangerousPos(symbol);
    // getByIndex(parentSymbolPos).appendChild(symbol);
    // lastPossibleBlocks =
    //   symbolsOperations[symbol.classList[1]](parentSymbolPos);
    for (let i = 0; i < lastPossibleBlocks.length; i++) {
      let currEl = getByIndex(lastPossibleBlocks[i]);
      currEl.style.backgroundColor = "brown";
      currEl.onclick = () => {
        changePlaces(lastPossibleBlocks[i], symbol);
      };
      if (currEl.children.length === 1) currEl.children[0].onclick = "";
    }
    chosen = parentSymbolPos;
  }
}

function changePlaces(newPos, symbol) {
  let newPosDOM = getByIndex(newPos);

  if (newPosDOM.children.length === 1) newPosDOM.children[0].remove();
  newPosDOM.appendChild(symbol);

  resetBlocks(lastPossibleBlocks);

  teamTurn = !teamTurn;
  chosen = null;
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
  for (let i = 0; i < symbols.length; i++) {
    let symbol = symbols[i];
    symbols[i].onclick = () => {
      move(symbol);
    };
  }
}

function resetBlocks(lastPossibleBlocks) {
  for (let i = 0; i < lastPossibleBlocks.length; i++) {
    let currEl = getByIndex(lastPossibleBlocks[i]);
    currEl.style.backgroundColor = getbackOriginalColor(lastPossibleBlocks[i]);
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

  let counThreatenes = 0;
  for (let i = 0; i < enemySymbols.length; i++) {
    if (enemySymbols[i].classList[1] == "king") continue;
    let possibleMovesCurrEl = symbolsOperations[enemySymbols[i].classList[1]](
      getPosFromEl(enemySymbols[i].parentElement)
    );
    for (let j = 0; j < possibleMovesCurrEl.length; i++) {
      if (
        equalPos(possibleMovesCurrEl[j], kingPos) &&
        (++counThreatenes === 2 ||
          "pawn" == symbol.classList[1] ||
          "knight" == symbol.classList[1])
      ) {
        lastPossibleBlocks = [];
        return;
      }
    }
  }

  parentElementSymbol.appendChild(symbol);
  if (["pawn", "knight"].contains(symbol.classList[1])) return [];
}
