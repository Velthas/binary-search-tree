// Small sorted array to use for tests
const sortedArray = [1, 2, 3, 4, 5, 6, 7];

// Node Factory
function NodeCreate(data, leftNode, rightNode) {
  const newNode = { data, left: leftNode, right: rightNode };
  return newNode;
}

// Binary Tree Factory
function BinaryTree(array) {
  const newTree = {};
  newTree.root = buildTree(array);
  return newTree;
}

// This function is not mine, provided by a TOP student
// It gives a visual representation of the tree in the console
const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};

// Function that takes an ordered array as argument and returns binary tree
function buildTree(array, start = 0, end = array.length - 1) {
  // When start and end cross, we have no more numbers to append
  if (start > end) return null;

  // Get the middle of the array to use as 'root' node
  const mid = Math.floor((start + end) / 2); // Use the start and end parameters to determine length

  // Create a new node, using the value in the middle as root
  const newNode = NodeCreate(array[mid], null, null);

  // Very important that we use start and end variables here
  // as the array passed is always full lenght and not sliced
  // the sliced version should be more memory involved than this sol.
  newNode.left = buildTree(array, start, mid - 1);
  newNode.right = buildTree(array, mid + 1, end);

  // Return the root at the end of it all.
  return newNode;
}

// Insert a node in a tree
// Worth noting that this severely debalances the tree in the long run
function insert(value, node) {
  // Determine where the value should be (left or right)
  const direction = value > node.data ? 'right' : 'left';
  // If there is nothing in the direction the number should be
  // Then we have found its place
  if (node[direction] === null) {
    const newNode = NodeCreate(value, null, null);
    node[direction] = newNode;
  } else insert(value, node[direction]); // Otherwise recursively keep going
}

const myTree = BinaryTree(sortedArray);

prettyPrint(myTree.root);
