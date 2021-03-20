import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ModulePreview from "../components/ModulePreview";
import ModulePreviewHTB from "../components/ModulePreviewHTB";
import Box from "@material-ui/core/Box";
import Tag from "../components/Tag";
import Chip from "@material-ui/core/Chip";
import { Container } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  tag: {
    backgroundColor: "rgba(0, 255, 21, 0.2)",
    color: "rgb(0, 255, 21)",
    borderRadius: "3px",
    "&:hover": {
      background: "rgba(76, 209, 55, 0.2)",
    },
    padding: 0,
  },
}));

const ModulePreviewDevPage = () => {
  const classes = useStyles();

  return (
    <Container maxWidth='md' style={{ paddingTop: 100 }}>
      <Box display='flex' justifyContent='center' m={1} p={1}>
        <ModulePreview
          num_star={5}
          cover_image='https://avatars.githubusercontent.com/u/33727687?s=460&u=7fd97fe40129bdebcfc0bbccc75657735969e5e5&v=4'
          title='Lizard'
          subheader='September 14, 2016'
          description='Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica'
        />
      </Box>
      <Box display='flex' justifyContent='center' m={1} p={1}>
        <ModulePreviewHTB />
      </Box>
      <Box display='flex' justifyContent='center' m={1} p={1}>
        <Tag content='react' />
      </Box>
      <Box display='flex' justifyContent='center' m={1} p={1}>
        <Tag
          content='react'
          bgcolor='rgba(0, 255, 255, 0.2)'
          color='rgba(0, 255, 255, 1.0)'
          border='1px solid rgba(0, 255, 255, 0.4)'
          extraStyle={{}}
        />
      </Box>
      <Box display='flex' justifyContent='center' m={1} p={1}>
        <Tag
          content='react'
          bgcolor='rgba(0, 255, 255, 0.0)'
          color='rgba(0, 255, 255, 1.0)'
          border='1px solid rgba(0, 255, 255, 0.4)'
          extraStyle={{}}
        />
      </Box>
      <Box display='flex' justifyContent='center' m={1} p={1}>
        <Chip size='small' className={classes.tag} label='react' />
      </Box>
    </Container>
  );
};

export default ModulePreviewDevPage;
