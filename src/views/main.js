import React, {  useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Maze from '../Grid/grid'
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    maze: {
      
    }
   
}));




export default function MainPage() {
    const classes = useStyles();
  

    return (
      <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
            Best House
        </Grid>
        <Grid item xs={12} >
          <div className={classes.maze}>
          <Maze />
          </div>
        </Grid>
      </Grid>
    </div>

    );
}
