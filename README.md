## Binary Tree
As part of this exercise I created code to make balanced Binary Trees from an array and manipulate their data using built-in methods.

Moreover, I looked at breadth-first and depth-first search algorithms and simple data structures like queues and stacks.

### Methods
 1. **insert**: as the name suggests, takes a value and inserts it into the binary tree.
 2. **delete**: takes a value as argument, if found, deletes it from the tree.
 3. **find**: find a node holding value passed as argument, returns it if found.
 4. **levelOrder**: explores the tree using a breadth-first search algorithm and returns an array with all node data.
 5. **preorder/postorder/inorder**: explores the tree using various depth-first search algorithms, returning an array with node's data value in explored order. 
 6. **height**: returns height of a node passed in as argument. Height is defined as the number of edges in longest path from a given node to a leaf node.
 7. **depth**: returns depth of a node passed in as argument. Depth is defined as the number of edges in path from a given node to the tree’s root node.
 8. **isBalanced**: returns a boolean, true if the tree is balanced, false if not. A tree is balanced if the difference between depths of left and right subtree is not greater than one.
 9. **rebalance**: you can use this method to rebalance the tree at will. It works using other methods already defined for the tree.

*Warning: modules do not work locally and only via HTTP, meaning the imported portions of code (namely merge sort algorithm and random numeric array generator) will not run properly unless the whole thing is on a local web server or web page.* 
