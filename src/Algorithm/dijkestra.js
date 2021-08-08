

const GetNodes = (grid) => {
    let Nodes = []
    let houseListObject = {};
    let NodeList = []
    grid.map(row => {
        row.map(node => {
            if(node.type === "node-house"){
                houseListObject[node.id] = [node.row , node.col]
            }
            node.isVisited = false;
            node.distance = Infinity;
            delete node.previous
            
            NodeList.push(node)
        })
    })
    Nodes.houseList = houseListObject
    Nodes.NodeList = NodeList
    return Nodes;
}


export async function FindBestHouse(grid , max_col , max_row) {
    return new Promise((async (resolve , reject) => {
        const houseList = GetNodes(grid).houseList;
        const totaldistances = []
        let keys =  Object.keys(houseList); 
        if (keys.length === 0) return null
        for(let i =0 ; i < keys.length ; i++){
            let matrix = [...grid];
            var distance = await dijkstra(Number(keys[i]) , matrix);
            if(Array.isArray(distance)) distance = Infinity
            else{
                totaldistances.push({
                    id: Number(keys[i]),
                    row: houseList[keys[i]][0],
                    col: houseList[keys[i]][1],
                    totaldistance :distance
                })

            }
           
        }
        totaldistances.sort((a , b) => a.totaldistance - b.totaldistance)
        console.log(totaldistances)
        resolve(totaldistances)
        
    }))

    }
    

const dijkstra =async  (startid , matrix) => {


    return new Promise(((resolve , reject) => {
        const visitedNodesInoder = []
        const hotels = [];
        const unVisitedNodesQueue = GetNodes(matrix).NodeList
        unVisitedNodesQueue[startid].distance = 0;
        while(!!unVisitedNodesQueue.length){
      
            //sort node list based on distances
            sortNodesByDistance(unVisitedNodesQueue);
            const closestNode = unVisitedNodesQueue.shift();
            //if we encounter house skip it
            if(closestNode.type === "node-house" && closestNode.id !== startid) {
          
                continue;
            }
            if(closestNode.type === "node-hotel"){
                closestNode.isVisited = true
                hotels.push(closestNode)
                visitedNodesInoder.push(closestNode)
                continue;
            } 
            //if possible closest node is at distance infinity -- this case will never happen --hope so
            if(closestNode.distance === Infinity) {    
                resolve(Infinity)
                break;
            };
            
            closestNode.isVisited = true;
            // matrix[closestNode.row][closestNode.col].isVisited = true
            visitedNodesInoder.push(closestNode)
            updateUnvisitedNeighbors(closestNode , matrix , unVisitedNodesQueue);
      
        }
        let totaldistance = 0
        hotels.forEach(node => {
               totaldistance += node.distance;    
        })
        resolve(totaldistance)
    }))

   
}

//sort the queue 
function sortNodesByDistance(unvisitedNodes) {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

function updateUnvisitedNeighbors(node, matrix , unVisitedNodesQueue) {
    const unvisitedNeighbors = getUnvisitedNeighbors(node, matrix);
    for (const neighbour of unvisitedNeighbors) {
    //   update the queue distances
      let index = unVisitedNodesQueue.findIndex(obj => obj.id == neighbour.id);
      if(unVisitedNodesQueue[index]){
        neighbour.previousNode = node;
        unVisitedNodesQueue[index].distance = node.distance + unVisitedNodesQueue[index].weight;
      }
      
      
    }
  }
  

  //visit left , right , up , down 
  //not added diagonal paths but can be added easily if required
  function getUnvisitedNeighbors(node, matrix) {
    const neighbors = [];
    const { col, row } = node;
    //add left node
    if (row > 0) neighbors.push(matrix[row - 1][col]);
    //add right node
    if (row < matrix.length - 1) neighbors.push(matrix[row + 1][col]);
    //add upper node
    if (col > 0) neighbors.push(matrix[row][col - 1]);
    //add down node
    if (col < matrix[0].length - 1) neighbors.push(matrix[row][col + 1]);
    return neighbors.filter(neighbor => !neighbor.isVisited && neighbor.type !== "node-house" );
  }

