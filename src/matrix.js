export function swap(array, i, j) {
  const temp = array[i];
  array[i] = array[j];
  array[j] = temp;
  return array;
}

export function swapMatrix(array, i, j) {
  const temp = array[i][j];
  array[i][j] = array[j][i];
  array[j][i] = temp;
  return array;
}
