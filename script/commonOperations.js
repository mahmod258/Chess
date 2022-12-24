export function getByIndex(pos) {
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
