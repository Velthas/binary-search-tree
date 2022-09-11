export { randomNoDupesArray };

function randomNoDupesArray(number) {
  const array = [];
  // Simple random number generator from 1 - 1000
  for (let i = 0; i < number; i++) {
    const randomNumber = Math.floor(Math.random() * 1000);
    array.push(randomNumber);
  }

  // indexOf returns index of first instance in the array
  // if it doesn't match it means it's a duplicate, thus
  // no need to include it in our array
  const uniqueNumbers = array.filter((element, index) => array.indexOf(element) === index);

  return uniqueNumbers;
}
