

const GetNodes = (grid) => {
    let Nodes = {}
    let houseListObject = {};
    let NodeList = []
    grid.map(row => {
        row.map(node => {
            if(node.type === "node-house"){
                houseListObject[node.id] = [node.row , node.col]
            }
            node.distance = Infinity;
            NodeList.push(node)
        })
    })
    Nodes.houseList = houseListObject
    Nodes.NodeList = NodeList
    return Nodes;
}


export async function FindBestHouse(grid , max_col , max_row) {

    const houseList = GetNodes(grid).houseList;
    const nodeList = GetNodes(grid).NodeList
    console.log(grid)
    console.log(nodeList);
    let keys =  Object.keys(houseList);
    for(let i =0 ; i < keys.length ; i++){
        var matrix = grid;
        let house = nodeList[keys[i]]
        var list = await dijkstra(house , matrix);
        console.log(list)
        console.log(grid)
    }
    
}





const dijkstra =async  (start , grid) => {

    return new Promise(((resolve , reject) => {
        const visitedNodesInoder = []
        start.distance = 0;
        const unVisitedNodesQueue = GetNodes(grid).NodeList
        console.log(unVisitedNodesQueue);
        console.log(!!unVisitedNodesQueue.length)
     
        while(!!unVisitedNodesQueue.length){
            console.log("here")
            //sort node list based on distances
            sortNodesByDistance(unVisitedNodesQueue);
            const closestNode = unVisitedNodesQueue.shift();
            //if we encounter house skip it
            if(closestNode.type == "node-house") continue;
            //if possible closest node is at distance infinity -- this case will never happen --hope so
            if(closestNode.distance == Infinity) {
                console.log("done")
                resolve(visitedNodesInoder)
            };
            closestNode.isVisited = true;
            visitedNodesInoder.push(closestNode)
            updateUnvisitedNeighbors(closestNode , grid);
            console.log(closestNode)
        }
        resolve(visitedNodesInoder)
    }))

   
}

//sort the queue 
function sortNodesByDistance(unvisitedNodes) {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

function updateUnvisitedNeighbors(node, grid) {
    const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
    for (const neighbor of unvisitedNeighbors) {
      neighbor.distance = node.distance + node.weight;
      //optonal if backtracing is required
      neighbor.previousNode = node;
    }
  }
  

  //visit left , right , up , down 
  //not added diagonal paths but can be added easily if required
  function getUnvisitedNeighbors(node, grid) {
    const neighbors = [];
    const { col, row } = node;
    //add left node
    if (row > 0) neighbors.push(grid[row - 1][col]);
    //add right node
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    //add below node
    if (col > 0) neighbors.push(grid[row][col - 1]);
    //add upper node
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    return neighbors.filter(neighbor => !neighbor.isVisited);
  }

  const calculateTotalDistances = (visitedNodes) => {

  }