// const node = {
//   row,
//   col,
//   isVisited,
//   distance,
// };

export function dijkstra(grid, startNode, finishNode) {
  if (!startNode || !finishNode || startNode === finishNode) {
    return false;
  }
  const visitedNodesInOrder = [];
  startNode.distance = 0;
  const unvisitedNodes = getAllNodes(grid);
  console.log(unvisitedNodes);
  while (!!unvisitedNodes.length) {
    sortNodeByDistance(unvisitedNodes);
    const closestNode = unvisitedNodes.shift();
    // HANDLE WALLS LATER
    // while (currentNode.status === "wall" && unvisitedNodes.length) {
    //   currentNode = getClosestNode(nodes, unvisitedNodes);
    // }
    // HANDLE IMPOSSIBLE LATER
    // if (currentNode.distance === Infinity) {
    //   return false;
    // }
    // ANIMATE LATER
    // nodesToAnimate.push(currentNode);
    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);
    if (closestNode === finishNode) return visitedNodesInOrder;
    updateNeighbors(closestNode, grid);
  }
}

function sortNodeByDistance(unvisitedNodes) {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

function updateNeighbors(node, grid) {
  const neighbors = getNeighbors(node, grid);
  for (const neighbor of neighbors) {
    neighbor.distance = node.distance + 1;
  }
}

function getNeighbors(node, grid) {
  const neighbors = [];
  const { col, row } = node;

  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);

  return neighbors;
}
