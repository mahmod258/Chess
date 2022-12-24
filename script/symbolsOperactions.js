import { getByIndex } from "./commonOperations.js";

function possibleMovesPawn(pos, possibleMovesEl) {
  let color = getByIndex(pos).children[0].classList[0];
  let step = color == "white" ? -1 : 1;

  if ((color == "black" && pos[0] == 7) || (color == "white" && pos[0] == 0))
    return;
  if (getByIndex([pos[0] + step, pos[1]]).children.length == 0) {
    possibleMovesEl.push([pos[0] + step, pos[1]]);
  }
  if (pos[1] < 7) {
    let temp1 = getByIndex([pos[0] + step, pos[1] + 1]).children;
    if (temp1.length == 1 && !temp1[0].classList.contains(color)) {
      possibleMovesEl.push([pos[0] + step, pos[1] + 1]);
    }
  }

  if (pos[1] > 0) {
    let temp2 = getByIndex([pos[0] + step, pos[1] - 1]).children;
    if (
      temp2.length == 1 &&
      !temp2[0].classList.contains(color) &&
      pos[0] > 0
    ) {
      possibleMovesEl.push([pos[0] + step, pos[1] - 1]);
    }
  }
}

//  #   #   #   #   #

function possibleMovesRook(pos, possibleMovesEl) {
  let color = getByIndex(pos).children[0].classList[0];
  if (pos[0] > 0) {
    for (let i = pos[0] - 1; i >= 0; i--) {
      let currEl = getByIndex([i, pos[1]]);
      if (currEl.children.length == 1) {
        if (!currEl.children[0].classList.contains(color))
          possibleMovesEl.push([i, pos[1]]);
        break;
      }
      possibleMovesEl.push([i, pos[1]]);
    }
  }

  if (pos[0] < 7) {
    for (let i = pos[0] + 1; i <= 7; i++) {
      let currEl = getByIndex([i, pos[1]]);

      if (currEl.children.length == 1) {
        if (!currEl.children[0].classList.contains(color))
          possibleMovesEl.push([i, pos[1]]);

        break;
      }

      possibleMovesEl.push([i, pos[1]]);
    }
  }

  for (let i = pos[1] + 1; i <= 7; i++) {
    let currEl = getByIndex([pos[0], i]);

    if (currEl.children.length == 1) {
      if (!currEl.children[0].classList.contains(color))
        possibleMovesEl.push([pos[0], i]);

      break;
    }
    possibleMovesEl.push([pos[0], i]);
  }

  for (let i = pos[1] - 1; i >= 0; i--) {
    let currEl = getByIndex([pos[0], i]);

    if (currEl.children.length == 1) {
      if (!currEl.children[0].classList.contains(color))
        possibleMovesEl.push([pos[0], i]);

      break;
    }

    possibleMovesEl.push([pos[0], i]);
  }
}

//  #   #   #   #   #

function possibleMovesBishop(pos, possibleMovesEl) {
  let color = getByIndex(pos).children[0].classList[0];
  for (let i = pos[0] + 1, j = pos[1] + 1; i <= 7 && j <= 7; i++) {
    let currEl = getByIndex([i, j]);
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
    let currEl = getByIndex([i, j]);
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
    let currEl = getByIndex([i, j]);
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
    let currEl = getByIndex([i, j]);

    if (currEl.children.length == 1) {
      if (!currEl.children[0].classList.contains(color)) {
        possibleMovesEl.push([i, j]);
      }
      break;
    }

    possibleMovesEl.push([i, j]);
    j++;
  }
}

//  #   #   #   #   #

function possibleMovesQueen(pos, possibleMovesEl) {
  possibleMovesBishop(pos, possibleMovesEl);
  possibleMovesRook(pos, possibleMovesEl);
}

//  #   #   #   #   #

function possibleMovesKnight(pos, possibleMovesEl) {
  let color = getByIndex(pos).children[0].classList[0];
  if (pos[0] + 2 <= 7) {
    if (pos[1] < 7) {
      if (
        getByIndex([pos[0] + 2, pos[1] + 1]).children.length == 0 ||
        (getByIndex([pos[0] + 2, pos[1] + 1]).children.length == 1 &&
          !getByIndex([pos[0] + 2, pos[1] + 1]).children[0].classList.contains(
            color
          ))
      )
        possibleMovesEl.push([pos[0] + 2, pos[1] + 1]);
    }
    if (pos[1] > 0) {
      if (
        getByIndex([pos[0] + 2, pos[1] - 1]).children.length == 0 ||
        (getByIndex([pos[0] + 2, pos[1] - 1]).children.length == 1 &&
          !getByIndex([pos[0] + 2, pos[1] - 1]).children[0].classList.contains(
            color
          ))
      )
        possibleMovesEl.push([pos[0] + 2, pos[1] - 1]);
    }
  }

  if (pos[0] - 2 >= 0) {
    if (pos[1] < 7) {
      if (
        getByIndex([pos[0] - 2, pos[1] + 1]).children.length == 0 ||
        (getByIndex([pos[0] - 2, pos[1] + 1]).children.length == 1 &&
          !getByIndex([pos[0] - 2, pos[1] + 1]).children[0].classList.contains(
            color
          ))
      )
        possibleMovesEl.push([pos[0] - 2, pos[1] + 1]);
    }
    if (pos[1] > 0) {
      if (
        getByIndex([pos[0] - 2, pos[1] - 1]).children.length == 0 ||
        (getByIndex([pos[0] - 2, pos[1] - 1]).children.length == 1 &&
          !getByIndex([pos[0] - 2, pos[1] - 1]).children[0].classList.contains(
            color
          ))
      )
        possibleMovesEl.push([pos[0] - 2, pos[1] - 1]);
    }
  }

  if (pos[1] + 2 <= 7) {
    if (pos[0] > 0) {
      if (
        getByIndex([pos[0] - 1, pos[1] + 2]).children.length == 0 ||
        (getByIndex([pos[0] - 1, pos[1] + 2]).children.length == 1 &&
          !getByIndex([pos[0] - 1, pos[1] + 2]).children[0].classList.contains(
            color
          ))
      )
        possibleMovesEl.push([pos[0] - 1, pos[1] + 2]);
    }
    if (pos[0] < 7) {
      if (
        getByIndex([pos[0] + 1, pos[1] + 2]).children.length == 0 ||
        (getByIndex([pos[0] + 1, pos[1] + 2]).children.length == 1 &&
          !getByIndex([pos[0] + 1, pos[1] + 2]).children[0].classList.contains(
            color
          ))
      )
        possibleMovesEl.push([pos[0] + 1, pos[1] + 2]);
    }
  }

  if (pos[1] - 2 >= 0) {
    if (pos[0] > 0) {
      if (
        getByIndex([pos[0] - 1, pos[1] - 2]).children.length == 0 ||
        (getByIndex([pos[0] - 1, pos[1] - 2]).children.length == 1 &&
          !getByIndex([pos[0] - 1, pos[1] - 2]).children[0].classList.contains(
            color
          ))
      )
        possibleMovesEl.push([pos[0] - 1, pos[1] - 2]);
    }
    if (pos[0] < 7) {
      if (
        getByIndex([pos[0] + 1, pos[1] - 2]).children.length == 0 ||
        (getByIndex([pos[0] + 1, pos[1] - 2]).children.length == 1 &&
          !getByIndex([pos[0] + 1, pos[1] - 2]).children[0].classList.contains(
            color
          ))
      )
        possibleMovesEl.push([pos[0] + 1, pos[1] - 2]);
    }
  }
}

//  #   #   #   #   #

function possibleMovesKing(pos, possibleMovesEl) {
  let color = getByIndex(pos).children[0].classList[0];
  let el1 = getByIndex([pos[0] - 1, pos[1]]);
  if (
    pos[0] > 0 &&
    (el1.children.length === 0 ||
      (el1.children.length === 1 && el1.children[0].classList.contains(color)))
  )
    possibleMovesEl.push([pos[0] - 1, pos[1]]);

  let el2 = getByIndex([pos[0] - 1, pos[1] + 1]);
  if (
    pos[0] > 0 &&
    pos[1] < 7 &&
    (el2.children.length === 0 ||
      (el2.children.length === 1 && !el2.children[0].classList.contains(color)))
  )
    possibleMovesEl.push([pos[0] - 1, pos[1] + 1]);

  let el3 = getByIndex([pos[1] - 1, pos[1] - 1]);
  if (
    pos[0] > 0 &&
    pos[1] > 0 &&
    (el3.children.length === 0 ||
      (el3.children.length === 1 && !el3.children[0].classList.contains(color)))
  )
    possibleMovesEl.push([pos[0] - 1, pos[1] - 1]);

  let el4 = getByIndex([pos[0] + 1, pos[1]]);
  if (
    pos[0] < 7 &&
    (el4.children.length === 0 ||
      (el4.children.length === 1 && !el4.children[0].classList.contains(color)))
  )
    possibleMovesEl.push([pos[0] + 1, pos[1]]);

  let el5 = getByIndex([pos[0] + 1, pos[1] + 1]);
  if (
    pos[0] < 7 &&
    pos[1] < 7 &&
    (el5.children.length === 0 ||
      (el5.children.length === 1 && !el5.children[0].classList.contains(color)))
  )
    possibleMovesEl.push([pos[0] + 1, pos[1] + 1]);

  let el6 = getByIndex([pos[0] + 1, pos[1] - 1]);
  if (
    pos[1] > 0 &&
    pos[0] < 7 &&
    (el6.children.length === 0 ||
      (el6.children.length === 1 && !el6.children[0].classList.contains(color)))
  )
    possibleMovesEl.push([pos[0] + 1, pos[1] - 1]);

  let el7 = getByIndex([pos[0], pos[1] + 1]);
  if (
    pos[1] < 7 &&
    (el7.children.length === 0 ||
      (el7.children.length === 1 && !el7.children[0].classList.contains(color)))
  )
    possibleMovesEl.push([pos[0], pos[1] + 1]);

  let el8 = getByIndex([pos[0], pos[1] - 1]);
  if (
    pos[1] > 0 &&
    (el8.children.length === 0 ||
      (el8.children.length === 1 && !el8.children[0].classList.contains(color)))
  )
    possibleMovesEl.push([pos[0], pos[1] - 1]);
}

export default {
  pawn: possibleMovesPawn,
  rook: possibleMovesRook,
  bishop: possibleMovesBishop,
  queen: possibleMovesQueen,
  knight: possibleMovesKnight,
  king: possibleMovesKing,
};
