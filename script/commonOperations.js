export function getByPos(pos) {
  return document.getElementById(pos[0] + " " + pos[1]);
}
export function toArr(HTMLCollection) {
  return [].slice.call(HTMLCollection);
}
export function getbackOriginalColor(pos) {
  return (pos[0] % 2 == 1 && pos[1] % 2 == 1) ||
    (pos[0] % 2 == 0 && pos[1] % 2 == 0)
    ? "#eeeed2"
    : "#769656";
}
export function clearUnrealSymbols() {
  let unrealSymbols = document.getElementsByClassName("unreal");
  for (let i = 0; i < unrealSymbols.length; i++) unrealSymbols[i].remove();
}
export function equalPos(arr1, arr2) {
  return arr2[0] === arr1[0] && arr2[1] === arr1[1];
}
export function getPosFromEl(el) {
  return [parseInt(el.id.split(" ")[0]), parseInt(el.id.split(" ")[1])];
}
