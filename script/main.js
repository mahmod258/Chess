import { toArr, getByIndex, getbackOriginalColor } from "./commonOperations.js";
import symbolsOperations from "./symbolsOperactions.js";

let board = document.getElementById("board");

setupBlocks();
let symbols = document.getElementsByClassName("symbol");
giveOnclicks();
let lastPossibleBlocks = [];
let teamTurn = true;
let chosen = null;

//  #   #   #   #   #

function move(symbol) {
  if (
    chosen != null &&
    chosen[0] === parseInt(symbol.parentElement.id.split(" ")[0]) &&
    chosen[1] === parseInt(symbol.parentElement.id.split(" ")[1])
  ) {
    resetBlocks(lastPossibleBlocks);
    chosen = null;
    lastPossibleBlocks = [];
    return;
  }
  if (
    (teamTurn && symbol.classList[0] == "white") ||
    (!teamTurn && symbol.classList[0] == "black")
  ) {
    resetBlocks(lastPossibleBlocks);
    lastPossibleBlocks = [];
    symbolsOperations[symbol.classList[1]](
      [
        parseInt(symbol.parentElement.id.split(" ")[0]),
        parseInt(symbol.parentElement.id.split(" ")[1]),
      ],
      lastPossibleBlocks
    );
    for (let i = 0; i < lastPossibleBlocks.length; i++) {
      let currentEl = getByIndex(lastPossibleBlocks[i]);
      currentEl.style.backgroundColor = "brown";
      currentEl.onclick = () => {
        changePlaces(lastPossibleBlocks[i], symbol, lastPossibleBlocks);
      };
      if (currentEl.children.length > 0) currentEl.children[0].onclick = "";
    }
    chosen = [
      parseInt(symbol.parentElement.id.split(" ")[0]),
      parseInt(symbol.parentElement.id.split(" ")[1]),
    ];
  }
}

function changePlaces(newPos, symbol, lastPossibleBlocks) {
  let symbol2 = symbol;
  let newPosDOM = getByIndex(newPos);

  if (newPosDOM.children.length > 0) newPosDOM.children[0].remove();
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
    symbols[i].onclick = () => {
      move(symbols[i]);
    };
  }
}

function takeawayOnclicks() {
  for (let i = 0; i < symbols.length; i++) {
    let pos = symbols[i].parentElement.id.split(" ");
    symbols[i].onclick = "";
  }
}
function resetBlocks(lastPossibleBlocks) {
  for (let i = 0; i < lastPossibleBlocks.length; i++) {
    let currEl = getByIndex(lastPossibleBlocks[i]);
    currEl.style.backgroundColor = getbackOriginalColor(lastPossibleBlocks[i]);
    if (currEl.children.length === 1)
      currEl.children[0].onclick = () => move(currEl.children[0]);
    currEl.onclick = "";
  }
}
