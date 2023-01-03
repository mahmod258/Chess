import { getByPos, getPosFromEl, equalPos } from "./commonOperations.js";
import { move } from "./main.js";

let symbolsOperations = {
  pawn: possibleMovesPawn,
  rook: possibleMovesRook,
  bishop: possibleMovesBishop,
  queen: possibleMovesQueen,
  knight: possibleMovesKnight,
  king: possibleMovesKing,
};

function possibleMovesPawn(pos) {
  let possibleMovesEl = [];
  let color = getByPos(pos).children[0].classList[0];
  let step = color == "white" ? -1 : 1;

  if ((color == "black" && pos[0] == 7) || (color == "white" && pos[0] == 0))
    return possibleMovesEl;

  if (getByPos([pos[0] + step, pos[1]]).children.length == 0) {
    possibleMovesEl.push([pos[0] + step, pos[1]]);
    if (
      getByPos(pos).children[0].classList.contains("firstMove") &&
      getByPos([pos[0] + 2 * step, pos[1]]).children.length === 0
    ) {
      possibleMovesEl.push([pos[0] + 2 * step, pos[1]]);
    }
  }

  if (pos[1] < 7) {
    let temp1 = getByPos([pos[0] + step, pos[1] + 1]).children;
    if (temp1.length == 1 && !temp1[0].classList.contains(color)) {
      possibleMovesEl.push([pos[0] + step, pos[1] + 1]);
    }
  }

  if (pos[1] > 0) {
    let temp2 = getByPos([pos[0] + step, pos[1] - 1]).children;
    if (
      temp2.length == 1 &&
      !temp2[0].classList.contains(color) &&
      pos[0] > 0
    ) {
      possibleMovesEl.push([pos[0] + step, pos[1] - 1]);
    }
  }

  return possibleMovesEl;
}

//  #   #   #   #   #

function possibleMovesRook(pos) {
  let possibleMovesEl = [];

  let color = getByPos(pos).children[0].classList[0];
  for (let i = pos[0] - 1; i >= 0; i--) {
    let currEl = getByPos([i, pos[1]]);

    if (currEl.children.length == 1) {
      if (!currEl.children[0].classList.contains(color))
        possibleMovesEl.push([i, pos[1]]);
      break;
    }
    possibleMovesEl.push([i, pos[1]]);
  }

  for (let i = pos[0] + 1; i <= 7; i++) {
    let currEl = getByPos([i, pos[1]]);

    if (currEl.children.length == 1) {
      if (!currEl.children[0].classList.contains(color))
        possibleMovesEl.push([i, pos[1]]);

      break;
    }

    possibleMovesEl.push([i, pos[1]]);
  }

  for (let i = pos[1] + 1; i <= 7; i++) {
    let currEl = getByPos([pos[0], i]);

    if (currEl.children.length == 1) {
      if (!currEl.children[0].classList.contains(color))
        possibleMovesEl.push([pos[0], i]);

      break;
    }
    possibleMovesEl.push([pos[0], i]);
  }

  for (let i = pos[1] - 1; i >= 0; i--) {
    let currEl = getByPos([pos[0], i]);

    if (currEl.children.length == 1) {
      if (!currEl.children[0].classList.contains(color))
        possibleMovesEl.push([pos[0], i]);

      break;
    }

    possibleMovesEl.push([pos[0], i]);
  }
  return possibleMovesEl;
}

//  #   #   #   #   #

function possibleMovesBishop(pos) {
  let possibleMovesEl = [];

  let color = getByPos(pos).children[0].classList[0];
  for (let i = pos[0] + 1, j = pos[1] + 1; i <= 7 && j <= 7; i++) {
    let currEl = getByPos([i, j]);
    if (currEl.children.length == 1) {
      if (!currEl.children[0].classList.contains(color)) {
        possibleMovesEl.push([i, j]);
      }
      break;
    }
    possibleMovesEl.push([i, j]);
    j++;
  }

  for (let i = pos[0] - 1, j = pos[1] - 1; i >= 0 && j >= 0; i--) {
    let currEl = getByPos([i, j]);
    if (currEl.children.length == 1) {
      if (!currEl.children[0].classList.contains(color)) {
        possibleMovesEl.push([i, j]);
      }
      break;
    }
    possibleMovesEl.push([i, pos[1] + (i - pos[0])]);
    j--;
  }

  for (let i = pos[0] + 1, j = pos[1] - 1; i <= 7 && j >= 0; i++) {
    let currEl = getByPos([i, j]);
    if (currEl.children.length == 1) {
      if (!currEl.children[0].classList.contains(color)) {
        possibleMovesEl.push([i, j]);
      }
      break;
    }

    possibleMovesEl.push([i, j]);
    j--;
  }

  for (let i = pos[0] - 1, j = pos[1] + 1; i >= 0 && j <= 7; i--) {
    let currEl = getByPos([i, j]);

    if (currEl.children.length == 1) {
      if (!currEl.children[0].classList.contains(color)) {
        possibleMovesEl.push([i, j]);
      }
      break;
    }

    possibleMovesEl.push([i, j]);
    j++;
  }
  return possibleMovesEl;
}

//  #   #   #   #   #

function possibleMovesQueen(pos) {
  let possibleMovesEl = [];

  possibleMovesEl.push(...possibleMovesBishop(pos, possibleMovesEl));
  possibleMovesEl.push(...possibleMovesRook(pos, possibleMovesEl));
  return possibleMovesEl;
}

//  #   #   #   #   #

function possibleMovesKnight(pos) {
  let possibleMovesEl = [];

  let color = getByPos(pos).children[0].classList[0];
  if (pos[0] + 2 <= 7) {
    if (pos[1] < 7) {
      if (
        getByPos([pos[0] + 2, pos[1] + 1]).children.length == 0 ||
        (getByPos([pos[0] + 2, pos[1] + 1]).children.length == 1 &&
          !getByPos([pos[0] + 2, pos[1] + 1]).children[0].classList.contains(
            color
          ))
      )
        possibleMovesEl.push([pos[0] + 2, pos[1] + 1]);
    }
    if (pos[1] > 0) {
      if (
        getByPos([pos[0] + 2, pos[1] - 1]).children.length == 0 ||
        (getByPos([pos[0] + 2, pos[1] - 1]).children.length == 1 &&
          !getByPos([pos[0] + 2, pos[1] - 1]).children[0].classList.contains(
            color
          ))
      )
        possibleMovesEl.push([pos[0] + 2, pos[1] - 1]);
    }
  }

  if (pos[0] - 2 >= 0) {
    if (pos[1] < 7) {
      if (
        getByPos([pos[0] - 2, pos[1] + 1]).children.length == 0 ||
        (getByPos([pos[0] - 2, pos[1] + 1]).children.length == 1 &&
          !getByPos([pos[0] - 2, pos[1] + 1]).children[0].classList.contains(
            color
          ))
      )
        possibleMovesEl.push([pos[0] - 2, pos[1] + 1]);
    }
    if (pos[1] > 0) {
      if (
        getByPos([pos[0] - 2, pos[1] - 1]).children.length == 0 ||
        (getByPos([pos[0] - 2, pos[1] - 1]).children.length == 1 &&
          !getByPos([pos[0] - 2, pos[1] - 1]).children[0].classList.contains(
            color
          ))
      )
        possibleMovesEl.push([pos[0] - 2, pos[1] - 1]);
    }
  }

  if (pos[1] + 2 <= 7) {
    if (pos[0] > 0) {
      if (
        getByPos([pos[0] - 1, pos[1] + 2]).children.length == 0 ||
        (getByPos([pos[0] - 1, pos[1] + 2]).children.length == 1 &&
          !getByPos([pos[0] - 1, pos[1] + 2]).children[0].classList.contains(
            color
          ))
      )
        possibleMovesEl.push([pos[0] - 1, pos[1] + 2]);
    }
    if (pos[0] < 7) {
      if (
        getByPos([pos[0] + 1, pos[1] + 2]).children.length == 0 ||
        (getByPos([pos[0] + 1, pos[1] + 2]).children.length == 1 &&
          !getByPos([pos[0] + 1, pos[1] + 2]).children[0].classList.contains(
            color
          ))
      )
        possibleMovesEl.push([pos[0] + 1, pos[1] + 2]);
    }
  }

  if (pos[1] - 2 >= 0) {
    if (pos[0] > 0) {
      if (
        getByPos([pos[0] - 1, pos[1] - 2]).children.length == 0 ||
        (getByPos([pos[0] - 1, pos[1] - 2]).children.length == 1 &&
          !getByPos([pos[0] - 1, pos[1] - 2]).children[0].classList.contains(
            color
          ))
      )
        possibleMovesEl.push([pos[0] - 1, pos[1] - 2]);
    }
    if (pos[0] < 7) {
      if (
        getByPos([pos[0] + 1, pos[1] - 2]).children.length == 0 ||
        (getByPos([pos[0] + 1, pos[1] - 2]).children.length == 1 &&
          !getByPos([pos[0] + 1, pos[1] - 2]).children[0].classList.contains(
            color
          ))
      )
        possibleMovesEl.push([pos[0] + 1, pos[1] - 2]);
    }
  }
  return possibleMovesEl;
}
//  #   #   #   #   #

function possibleMovesKing(pos, chosen = true) {
  let possibleMovesEl = [];
  let color = getByPos(pos).children[0].classList[0];

  let el1 = getByPos([pos[0] - 1, pos[1]]);
  if (
    pos[0] > 0 &&
    (el1.children.length === 0 ||
      (el1.children.length === 1 && !el1.children[0].classList.contains(color)))
  )
    possibleMovesEl.push([pos[0] - 1, pos[1]]);

  let el2 = getByPos([pos[0] - 1, pos[1] + 1]);
  if (
    pos[0] > 0 &&
    pos[1] < 7 &&
    (el2.children.length === 0 ||
      (el2.children.length === 1 && !el2.children[0].classList.contains(color)))
  )
    possibleMovesEl.push([pos[0] - 1, pos[1] + 1]);

  let el3 = getByPos([pos[0] - 1, pos[1] - 1]);
  if (
    pos[0] > 0 &&
    pos[1] > 0 &&
    (el3.children.length === 0 ||
      (el3.children.length === 1 && !el3.children[0].classList.contains(color)))
  )
    possibleMovesEl.push([pos[0] - 1, pos[1] - 1]);

  let el4 = getByPos([pos[0] + 1, pos[1]]);
  if (
    pos[0] < 7 &&
    (el4.children.length === 0 ||
      (el4.children.length === 1 && !el4.children[0].classList.contains(color)))
  )
    possibleMovesEl.push([pos[0] + 1, pos[1]]);

  let el5 = getByPos([pos[0] + 1, pos[1] + 1]);
  if (
    pos[0] < 7 &&
    pos[1] < 7 &&
    (el5.children.length === 0 ||
      (el5.children.length === 1 && !el5.children[0].classList.contains(color)))
  )
    possibleMovesEl.push([pos[0] + 1, pos[1] + 1]);

  let el6 = getByPos([pos[0] + 1, pos[1] - 1]);
  if (
    pos[1] > 0 &&
    pos[0] < 7 &&
    (el6.children.length === 0 ||
      (el6.children.length === 1 && !el6.children[0].classList.contains(color)))
  )
    possibleMovesEl.push([pos[0] + 1, pos[1] - 1]);

  let el7 = getByPos([pos[0], pos[1] + 1]);
  if (
    pos[1] < 7 &&
    (el7.children.length === 0 ||
      (el7.children.length === 1 && !el7.children[0].classList.contains(color)))
  )
    possibleMovesEl.push([pos[0], pos[1] + 1]);

  let el8 = getByPos([pos[0], pos[1] - 1]);
  if (
    pos[1] > 0 &&
    (el8.children.length === 0 ||
      (el8.children.length === 1 && !el8.children[0].classList.contains(color)))
  )
    possibleMovesEl.push([pos[0], pos[1] - 1]);

  if (chosen) {
    let oppositeSymbols = document.getElementsByClassName(
      color == "white" ? "black" : "white"
    );
    let king = getByPos(pos).children[0];
    king.parentElement.children[0].remove();
    for (let i = 0; i < oppositeSymbols.length; i++) {
      if (oppositeSymbols[i].classList[1] == "pawn") {
        let pawnStep = color == "white" ? 1 : -1;
        let tempPos = getPosFromEl(oppositeSymbols[i].parentElement);
        for (let j = 0; j < possibleMovesEl.length; j++) {
          if (
            (tempPos[1] > 0 &&
              equalPos(possibleMovesEl[j], [
                tempPos[0] + pawnStep,
                tempPos[1] - 1,
              ])) ||
            (tempPos[1] < 7 &&
              equalPos(possibleMovesEl[j], [
                tempPos[0] + pawnStep,
                tempPos[1] + 1,
              ]))
          ) {
            possibleMovesEl = possibleMovesEl.filter(
              (pos) => !equalPos(pos, possibleMovesEl[j])
            );
            j--;
          }
        }
        continue;
      }

      let currPossibleMoves = symbolsOperations[
        oppositeSymbols[i].classList[1]
      ](getPosFromEl(oppositeSymbols[i].parentElement), false);

      for (let j = 0; j < currPossibleMoves.length; j++) {
        possibleMovesEl = possibleMovesEl.filter(
          (pos) => !equalPos(currPossibleMoves[j], pos)
        );
      }
    }
    getByPos(pos).appendChild(king);
    king.onclick = () => move(king);
  }

  return possibleMovesEl;
}

export default symbolsOperations;
