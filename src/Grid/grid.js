import React, {  useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Node from "./Node/node"
import Button from '@material-ui/core/Button';
import {FindBestHouse} from "../Algorithm/dijkestra"
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
      
  grid:  {
    margin: "100px 0 0"
  },

  button: {
    marginTop: "2%"
  },

  housepaper: {
    padding: "10px"
  },
  message: {
    justifyContent: "center",
    textAlign: "center",
    padding: "15px",
    backgroundColor: "#e8e8e8",
    margin: "auto",
    marginTop: "2%",
    maxWidth: "60%"
    
  }
}));




export default function CenteredGrid() {
    const classes = useStyles();
    let TotalDistances = [];
    //set node state
    const [maze , setNodes] = React.useState([])
    const [gridsize , setGridSize] = React.useState([5, 10])
    const [Message , setMessage] = React.useState("")
    const [task , setTaskCompleted] = React.useState(false)

    const [houseList , setHouseList] = React.useState([]);
    


    //find best house
    const hadleFindBestHouseButton = async () => {
      let matrix = maze;
      const max_row = gridsize[0];
      const max_col = gridsize[1];
      TotalDistances = await FindBestHouse([...matrix] , max_row , max_col)
      if(TotalDistances.length >= 0) {
        setHouseList([...TotalDistances])
      }
    }


    //Generate the initial grid
    const getInitialGrid = (rows , cols) => {
        const grid = [];
        let id = 0;
        for (let row = 0; row < rows; row++) {
          const currentRow = [];
          for (let col = 0; col < cols; col++) {
            currentRow.push(createNode(col, row , "node-road" , 1 , id++));
          }
          grid.push(currentRow);
        }
        return grid;
      };

      useEffect(() => {
        console.log("Refresh")
      },[houseList])
    


    //Render the initial grid
    useEffect(() => {
    const NodeCollection = getInitialGrid(gridsize[0], gridsize[1])
    setNodes(NodeCollection)
    },[gridsize])

    //update matrix
    const UpdateNode = (type , row , col , weight , id) => { 
        let matrix = maze;
        matrix[row][col].type = type;
        matrix[row][col].weight = weight;
        setNodes(matrix);
    }


    //Create node
    const createNode = (col, row , type , weight , id) => {
        return {
          col,
          row,
          type,
          weight,
          id
        };
      };

  

    return (
        <div className={classes.root}>
        <div 
        className="grid"
        >
          {maze.map((row, rowIdx) => {
            return (
              <div key={rowIdx}>
                {row.map((node, nodeIdx) => {
                  const {row, col , id} = node;
                  return (
                    <Node
                    key={nodeIdx}
                    col={col}
                    row={row}
                    id={id}
                    UpdateNode={UpdateNode}
                    >
                    </Node>
                  );
                })}
              </div>
            );
          })}
        </div>
        <Button onClick={hadleFindBestHouseButton} variant="contained" className = {classes.button} color="secondary">
          Find Best House
        </Button>
        <Paper className={classes.message}>
          <h3>
            House Preferences output
          </h3>
          <div>
          <Grid container spacing={3}>
            {houseList.length > 0 && 
              houseList.map((house , index) => {
                return <Grid item xs={12} sm={6}  style={{justifyContent : "center"}}  >
                          <Paper className = {classes.housepaper}>
                            <h4>RANK {index+1}</h4>
                            <b>House no </b> - {`${house.id}`}<br></br>
                            <b>House Location </b> - {`[${house.row} , ${house.col}]    `}<br></br>
                            <b>Total Distance to all places</b> -{` ${house.totaldistance}  `}
                          </Paper>
                      </Grid>
              })      
            }
          </Grid>
          </div>
        </Paper>
        </div>
    );
}
