import React, { useState, useEffect } from "react";
import { Container, Box, ListItemSecondaryAction } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle'
import NavDrawer from "../components/NavDrawer";


// for each individual box, get diff width & margin in diff windowInnerWidth
const getboxWidth = () => {
    const windowInnerWidth = window.innerWidth;
    if (windowInnerWidth < 800) {
      return 80;
    } else if (windowInnerWidth < 1200) {
      return 120;
    } else {
      return 180;
    }
  };

  const getboxMargin = () => {
    const windowInnerWidth = window.innerWidth;
    if (windowInnerWidth < 800) {
      return 10;
    } else if (windowInnerWidth < 1200) {
      return 20;
    } else {
      return 30;
    }
  };



const useStyles = makeStyles((theme) => ({
    box_group: {
       
        // bgcolor:"greys",
        display:"flex",
        flexWrap:"nowrap",
        // padding: "1px",
        margin:"50px",
        bgcolor:"theme.palette.background.paper",
        overflow:"visible",
        // justifyContent:'center'
        minWidth:"100vw",
        minHeigh:"100vh"
    },

    single_box:{
        margin:getboxMargin() +"px",
        textAlign: 'center',
        flexGrow:"0",
        flexShrink:"0",
        width:getboxWidth() +"px",  
        color: "#424242",
    
    },

    add_button:{
        color: "rgba(0, 0, 0, 0.54)",
    }
 
}));









const Roadmap = () => {

    //group modules in same level in same array
    //key is level, value is array
    const fullLevelView = (obj,  maxLevel, levelArray, level) => {

        
        level = level || 0;
        levelArray = levelArray || {};
        // let finalLevelArray = levelArray || {};
       
        let total_num = 0;
        for(let key in obj){
            if (Object.keys(levelArray).length === 0){
                for (let i=0; i< maxLevel; i++){
                    levelArray[i] = [];
                } 
               
            }

            if (Object.keys(obj[key]).length === 0) {
                levelArray[level].push([key,1]);
                for (let i=level+1; i< maxLevel; i++){
                    levelArray[i].push([null,1]);
                }
                total_num++;
                continue
            }
            if(typeof obj[key] == 'object'){
                let num_child = 0;
                [num_child, levelArray] = fullLevelView(obj[key],  maxLevel,levelArray, level+1);
                
                levelArray[level].push([key, num_child])
                total_num += num_child;
            }
        }

        // if (level ==1) {
        //     console.log("modified  level array", levelArray)
        // }
        return [total_num, levelArray];

    }

    // add the child to the module id
    const addChild = (obj, parentId, newId) => {
        for(let key in obj){
            
            //might need to change if moduleId is string
            if (key === parentId){
                obj[key][newId] = {}
                

            }

            if (Object.keys(obj[key]).length === 0) {
                continue
            }
            if(typeof obj[key] == 'object'){
                addChild(obj[key], parentId, newId);
            }
        }

        
        return obj
        
    } 

    //find deepest level
    const findlevel = (obj) => {

        let max_level = 1
        for(let key in obj){
            if (Object.keys(obj[key]).length === 0) {
                continue
            }
            if(typeof obj[key] == 'object'){
                max_level = Math.max(max_level, 1+findlevel(obj[key]));
            }
        }

        return max_level;

    }

   

    const classes = useStyles()
    const [roadmapVis, setRoadmapVis] = useState({
        1: {
          2: {3: {}, 4: {}},
          5: {},
        },
        6: {},
        7: {
          8: {
            9: {},
            10: {
              11: {12: {}, 13: {}},
            },
          },
          
        },
    })


    const [totalItems, setTotalItems] = useState(13);
    const [fullLevelVis, setFullLevelVis] = useState(fullLevelView(roadmapVis, findlevel(roadmapVis))[1]);




    useEffect(() => {

        // console.log("change!")
        // console.log("totalItems", totalItems)
        // console.log("roadmapVis", roadmapVis)
    
        let level = findlevel(roadmapVis)
        let newLevelView = fullLevelView(roadmapVis, level)
        setFullLevelVis(newLevelView[1])
        console.log("fullLevelVis", fullLevelVis)
    

    }, [roadmapVis, totalItems])

    function addClick(e){
        e.preventDefault();
        let clickTarget = e.target
       
        while (clickTarget.type != "button") {
            
            clickTarget = clickTarget.parentNode
        }
        // console.log("clickTarget.type", clickTarget.type, "clickTarget.id", clickTarget.id)
        setTotalItems(totalItems+1)
        let newRoadmapVis = addChild(roadmapVis, clickTarget.id, totalItems)
        setRoadmapVis(newRoadmapVis)
        // let level = findlevel(roadmapVis)
        // let newlevelVis = fullLevelView(roadmapVis, level)
        // setFullLevelVis(newLevelVis[1])

        console.log("after click, RoadmapVis", roadmapVis)
        // console.log("fullLevelVis", newlevelVis[1])
        

    }


    // Object.keys(levelVis).map((key, index) => 
    //     levelVis[key].map((idx) => console.log(key, idx))
        
    // )

    const minwidith = getboxWidth();
    const minMargin = getboxMargin();
    console.log("minwidith ", minwidith ,"minMargin", minMargin)
    // Object.keys(fullLevelVis).map((key, index) => 
    // fullLevelVis[key].map((item) => {console.log(item[0], item[1], item[0] === null)}))

    // Object.keys(fullLevelVis).map((key, index) => 
    // console.log(fullLevelVis[key]))
    return (
        // <div style={{ width: '100%' }}>
        <div style={{ minWidth: '100vw', overflow: "scroll" }}>
        <NavDrawer>
            
            {/* {Object.keys(levelVis).map((key, index) => 
                
                <Box key={index} className={classes.box_group}>
                    {levelVis[key].map((idx) => 
                    <Box  key={idx} className={classes.single_box}  padding={0} margin={0} bgcolor="grey.300">
                        Module {idx}
                        <Box ml={3}>
                        </Box>
                        <IconButton id={idx} aria-label="add" onClick={addClick}>
                            <AddCircleIcon />
                        </IconButton>
                    </Box>)
                    }
                 

                </Box>
            
            )}


            <Box key={96} className={classes.box_group}>
                <Box  key={97} className={classes.single_box} bgcolor="grey.300" padding={0} margin={0}>
                    Module {97}
                            <Box ml={3}>
                            </Box>
                            <IconButton aria-label="add">
                                <AddCircleIcon />
                            </IconButton>
                </Box>

                <Box className={classes.single_box} bgcolor="grey.300" padding={0} margin={0} zIndex="-999">
                    Module {97}
                    <Box ml={3} opacity={0}>
                    </Box>
                    
                    
                </Box>
                <Box  key={99} className={classes.single_box} bgcolor="grey.300" padding={0} margin={0}>
                    Module {100}
                            <Box ml={3}>
                            </Box>
                            <IconButton aria-label="add">
                                <AddCircleIcon />
                            </IconButton>
                </Box>
            </Box> */}


            {Object.keys(fullLevelVis).map((key, index) => 
                <Box key={index} className={classes.box_group}>
                    {(fullLevelVis[key]).map((item) => {
                        console.log("number of child", key, (fullLevelVis[key]).length)
                        if (item[0] === null){
                            return (
                            <Box className={classes.single_box} style={{"width":   minwidith }} padding={0} margin={minMargin +100 +"px"}  bgcolor="grey.300" zIndex="-999">
                                {item[0]} numchild: {item[1]}
                                <Box ml={3}>
                                </Box>
                                <IconButton id={item[0]} className={classes.add_button} onClick={addClick}>
                                    <AddCircleIcon />
                                </IconButton>
                            </Box>) 
                        }
                        else{
                            return (
                                <Box  key={item[0]} className={classes.single_box} style={{"width": minwidith + (item[1] -1)* (minwidith + 2 * minMargin) }} padding={0} margin={minMargin +100} bgcolor="grey.300">
                                Module {item[0]} numchild: {item[1]}
                                <Box ml={3}>
                                </Box>
                                <IconButton id={item[0]} className={classes.add_button} onClick={addClick}>
                                    <AddCircleIcon />
                                </IconButton>
                            </Box>)
                                

                        } 
                      
                    }
                    
                   
                    )}
                 

                </Box>
            
            )}

        </NavDrawer>
        </div>
    
    );
}

export default Roadmap;