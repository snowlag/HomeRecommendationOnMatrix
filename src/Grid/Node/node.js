import React from 'react';
import './node.css';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';


export default  Node = (props) =>  {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [ExtraClassName , setExtraClassname ] = React.useState("node-road");
  const [number , setNumber] = React.useState();
  
  const updateBlock = (type ,row , col , weight , id) => {
      setExtraClassname(type);
      handleClose();
      if(type === "node-house") setNumber(id)
      else setNumber(null)
      UpdateNode(type , row , col , weight , id);
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

    const {
      col,
      row,
      id,
      UpdateNode,
      
    } = props;

   let Name;
   if(ExtraClassName === "node-hotel") Name = "OFFICE"
   else if(ExtraClassName === "node-house") Name = "HOUSE"
   else Name = ""


    return (
      <>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => updateBlock("node-house" , row , col , 0 , id)}>Add House</MenuItem>
        <MenuItem onClick={() =>updateBlock("node-hotel" , row , col , 0 , id)}>Add Office</MenuItem>
        <MenuItem onClick={() => updateBlock("node-road" , row , col , 1 , id)}>Reset</MenuItem>
      </Menu>
      <div
        onClick={handleClick}
        id={`node-${row}-${col}`}
        className={`node ${ExtraClassName}`}>
         <div>
           <>
             {Name ? `${Name} ${id}` : id}
           </>
         </div>
      </div>
      </>
    );
  }