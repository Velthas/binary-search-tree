import { mergeSort } from './modules/merge-sort';
import { randomNoDupesArray } from './modules/random-unique-array';

// Small sorted array to use for tests
const sortedArray = [1, 2, 3, 4, 5, 6, 7];

// Node Factory
function NodeCreate(data, leftNode, rightNode) {
  const newNode = { data, left: leftNode, right: rightNode };
  return newNode;
}

const binaryTreeMethods = {
  buildTree,
  insert,
  delete: deleteVal,
  find,
  levelOrder,
  recursiveLevelOrder,
  inorder,
  preorder,
  postorder,
  depth,
  height,
  isBalanced,
  rebalance
};

// Binary Tree Factory
function BinaryTree(array) {
  const newTree = Object.create(binaryTreeMethods);
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
function insert(value, node = this.root) {
  // Determine where the value should be (left or right)
  const direction = value > node.data ? 'right' : 'left';
  // If there is nothing in the direction the number should be
  // Then we have found its place
  if (node[direction] === null) {
    const newNode = NodeCreate(value, null, null);
    node[direction] = newNode;
  } else insert(value, node[direction]); // Otherwise recursively keep going
}

// Deletes a node in the tree
function deleteVal(value, currentNode = this.root, previousNode = null) {
  // Determine where the value should be (left or right)
  let direction = value > currentNode.data ? 'right' : 'left';
  // This doubles as base case
  if (currentNode.data === value) {
    switch (true) {
      // When the node to delete has no extra linked values
      // We can just replace it with null with no consequences
      case currentNode.left === null && currentNode.right === null:
        direction = previousNode.data > value ? 'left' : 'right';
        previousNode[direction] = null;
        return;
      // When we have left and right references we must take care of them
      // In a binary tree left stores always the smaller value
      case currentNode.left !== null && currentNode.right !== null:
        // See if our current node is linked to left or right of previous node
        direction = previousNode.data > value ? 'left' : 'right';
        // Store a reference of the right of node to be deleted
        // All values to the right will be greater than the node's value
        // so we can assume next right value will be bigger than all left values.
        const oldRightReference = currentNode.right;
        // We perform a switch, the node to be deleted is replaced with its left node.
        // Left node and children always are smaller than value to the right and root
        previousNode[direction] = currentNode.left;
        // Traverse to the right until null is found
        let traversedNode = previousNode[direction];
        while (traversedNode.right !== null) {
          traversedNode = traversedNode.right;
        }
        // When we have hit null, we can append what was
        // originally at the right of the deleted node
        traversedNode.right = oldRightReference;
        return;
      // If we only have one child to the deleted element
      // it suffices to make that into the deleted element
      case currentNode.left !== null || currentNode.right !== null:
        direction = previousNode.data > value ? 'left' : 'right';
        previousNode[direction] = currentNode.left === null ? currentNode.right : currentNode.left;
        break;
      default:
    }
  } else deleteVal(value, currentNode[direction], currentNode);
}

// Accepts a value and returns the node with the given value
function find(value, node = this.root) {
  if (node.data === value) return node;
  return find(value, (node = node.data > value ? node.left : node.right));
}

function levelOrder(callback) {
  const queue = [];
  const result = [];
  // For loop to run, the queue needs to have at least 1 element.
  // First level is root level, so we use the root of the tree
  queue.push(this.root);

  while (queue.length > 0) {
    // Insert data attribute of node into result tree
    result.push(queue[0].data);
    // For each node traversed, push its children into the queue
    if (queue[0].left !== null) queue.push(queue[0].left);
    if (queue[0].right !== null) queue.push(queue[0].right);
    // When a callback is passed as argument we pass each node to it
    if (callback) callback(queue[0]);
    // Remove first element in queue after it is processed
    queue.shift();
  }
  return result;
}

function recursiveLevelOrder(callback, queue = [this.root], results = []) {
  if (queue.length === 0) return results; // We hit base case when the queue is empty
  results.push(queue[0].data); // If not push the data onto the results array
  if (queue[0].left !== null) queue.push(queue[0].left);
  if (queue[0].right !== null) queue.push(queue[0].right);
  queue.shift();
  return recursiveLevelOrder(callback, queue, results); // Recursive step
}

// Three depth-first search methods that return an array
// Or apply a callback to every node that is provided to it
function inorder(callback, node = this.root, array = []) {
  if (node === null) return array;

  inorder(callback, node.left, array); // Visit left node
  array.push(node.data); // Add root node
  if (callback) console.log(callback(node));
  return inorder(callback, node.right, array); // Visit right node and return when solved
}

function preorder(callback, node = this.root, array = []) {
  if (node === null) return array;

  array.push(node.data); // Add root to array
  if (callback) console.log(callback(node));
  preorder(callback, node.left, array); // Visit left node
  return preorder(callback, node.right, array); // Visit right node and return when solved
}

function postorder(callback, node = this.root, array = []) {
  if (node === null) return array;

  postorder(callback, node.left, array); // Visit left node
  postorder(callback, node.right, array); // Visit right node
  if (callback) console.log(callback(node));
  array.push(node.data); // Add root to array
  return array;
}

// Calculates depth of a node
function depth(node, traversedNode = this.root) {
  if (node.data === traversedNode.data) return 0;
  return (
    1 + depth(
      node,
      traversedNode.data > node.data
        ? traversedNode.left
        : traversedNode.right,
    )
  );
}

// Calculates height of a node
function height(node) {
  // Leaf node will have height of 0
  // thus to prevent our height from being skewed we return -1 on base case
  // which will return the appropriate height (0);
  if (node === null) return -1;

  // Recursively check height of left and right subtree
  const left = height(node.left);
  const right = height(node.right);

  return Math.max(left, right) + 1; // Return the greater of the two values + 1
}

// A binary tree is balanced if difference in depth between
// right subtree and left subtree is no greater than one
// this function returns true if tree is balanced, false
function isBalanced() {
  // We first check size of left and right subtree
  const leftHeight = this.height(this.root.left);
  const rightHeight = this.height(this.root.right);
  // Calculate the difference
  const heightDifference = Math.max(leftHeight, rightHeight) - Math.min(leftHeight, rightHeight);
  return !(heightDifference > 1);
}

// Uses functions we already defined to rebalance the tree
function rebalance() {
  // Fetch an array with all sorted values
  // eslint-disable-next-line no-const-assign
  const aSortedArray = this.inorder();
  // Use it to build tree
  this.root = buildTree(aSortedArray);
}

const myTree = BinaryTree(sortedArray);

prettyPrint(myTree.root);
