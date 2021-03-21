import React, { useState, useRef, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Editor from '../components/Editor';
import NavDrawer from '../components/NavDrawer';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { Button, Paper } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';

import { makeStyles, withStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  textField: {
    margin: theme.spacing(1),
  },
  link: {
    display: 'flex',
  },
  icon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20,
  },
  breadcrumbs: {
    paddingLeft: theme.spacing(1.5),
    paddingTop: theme.spacing(1),
  },
  editorBGWrapper: {
    backgroundColor: theme.palette.background.paper,
    // minHeight: '20rem',
    height: '100%',
    padding: '2rem',
  },
  editorBG: {
    height: '100%',
    height: '1.5rem',
  },
}));

const AddModule = () => {
  const [projectTitle, setProjectTitle] = useState('');
  const [projectId, setProjectId] = useState('');
  const [editorContent, setEditorContent] = useState('');
  const [inlineEditorContent, setInlineEditorContent] = useState('');
  const [normalEditorContent, setNormalEditorContent] = useState('');

  const [inlineEditorSwitch, setInlineEditorSwitch] = useState(false);

  useEffect(() => {}, [inlineEditorSwitch]);

  useEffect(() => {
    setEditorContent(
      inlineEditorSwitch ? inlineEditorContent : normalEditorContent
    );
  }, [inlineEditorContent, inlineEditorContent]);

  const classes = useStyles();

  const validProjectTitle = (project_title) => {
    const regex = /^([a-zA-Z\d-_\s]+)?$/g;
    return project_title.match(regex) ? true : false;
  };

  const updateProjectTitle = (e) => {
    if (validProjectTitle(e.target.value)) setProjectTitle(e.target.value);
  };

  const produceProjectID = (project_title) => {
    if (validProjectTitle(project_title)) {
      return project_title
        .trim()
        .replaceAll(/[\s-_]+/g, ' ')
        .replaceAll(/\s/g, '_');
    } else {
      return 'Error';
    }
  };

  useEffect(() => {
    setProjectId(produceProjectID(projectTitle));
  }, [projectTitle]);

  const onSubmit = (e) => {
    e.preventDefault();
    console.log('Submiting');
    console.log(`projectTitle:\n${projectTitle}`);
    console.log(`projectId:\n${projectId}`);
    console.log(`editorContent:\n${editorContent}`);
  };

  return (
    <NavDrawer>
      <Container maxWidth='md'>
        <Typography variant='h2' component='h2' gutterBottom>
          Add A New Module
        </Typography>
        <Divider />
        <Grid container spacing={3}>
          <Grid item xs={9}>
            <Breadcrumbs className={classes.breadcrumbs}>
              <Typography color='textPrimary' className={classes.link}>
                <AccountCircleIcon className={classes.icon} />
                Username
              </Typography>
              <Typography color='textPrimary' className={classes.link}>
                {projectId ? projectId : '<project id>'}
              </Typography>
            </Breadcrumbs>
          </Grid>
          <Grid item xs={3}>
            <FormControlLabel
              className='float-right'
              control={
                <Switch
                  checked={inlineEditorSwitch}
                  onChange={() => {
                    setInlineEditorSwitch(!inlineEditorSwitch);
                  }}
                  name='inline-editor-switch'
                  color='primary'
                />
              }
              label='Inline Editor'
            />
          </Grid>
        </Grid>
        <form onSubmit={onSubmit}>
          <TextField
            className={classes.textField}
            label='Profile Title'
            id='project-title'
            fullWidth
            value={projectTitle}
            onChange={updateProjectTitle}
            variant='outlined'
          />
          <br />

          <TextField
            className={classes.textField}
            label='Profile ID'
            id='project-id'
            fullWidth
            value={projectId}
            onChange={(e) => setProjectId(e.target.value)}
            variant='outlined'
            helperText='Must Be Unique Within Your Modules'
          />

          <Divider />
          <br />

          <div
            className={classes.editorBGWrapper}
            style={{ display: `${inlineEditorSwitch ? 'block' : 'none'}` }}
          >
            <Editor
              width='100%'
              updateContent={setInlineEditorContent}
              height={400}
              content={null}
              inline={!inlineEditorSwitch}
            />
          </div>
          <div style={{ display: `${!inlineEditorSwitch ? 'block' : 'none'}` }}>
            <Editor
              width='100%'
              updateContent={setNormalEditorContent}
              height={400}
              content={null}
              inline={inlineEditorSwitch}
            />
          </div>
          <br />
          <Button
            variant='outlined'
            className='float-right'
            color='inherit'
            size='large'
            type='submit'
          >
            Submit
          </Button>
        </form>
      </Container>
    </NavDrawer>
  );
};

export default AddModule;
