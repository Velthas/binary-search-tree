export { mergeSort };

function mergeSort(arr) {
  // If we only have one item, we can assume it is sorted
  if (arr.length < 2) return arr;

  // If it isn't just one element, split it into two
  // recursively until we just get one single item left
  const leftHalf = mergeSort(arr.slice((arr.length / 2).toFixed()));
  const rightHalf = mergeSort(arr.slice(0, (arr.length / 2).toFixed()));

  // Merge
  return merge(leftHalf, rightHalf);
}

function merge(leftarr, rightarr) {
  // Use this to store the sorted numbers
  const sortedArray = [];

  while (leftarr.length > 0 || rightarr.length > 0) {
    // If one of the arrays has ran out numbers
    // then it means the remaining one (which is already sorted)
    // can be tacked to the end of the sorted one
    if (leftarr[0] === undefined || rightarr[0] === undefined) {
      const remainingArray = leftarr[0] === undefined ? rightarr : leftarr;
      return sortedArray.concat(remainingArray);
    }

    const isSorted = rightarr[0] > leftarr[0]; // check to see whichever number is greater
    isSorted ? sortedArray.push(leftarr[0]) : sortedArray.push(rightarr[0]); // push smallest on sorted array
    isSorted ? leftarr.shift() : rightarr.shift(); // remove element from array it was taken from
  }

  return sortedArray;
}
