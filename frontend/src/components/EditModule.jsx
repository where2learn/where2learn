import React, { useState, useEffect, useCallback } from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Editor from '../components/Editor';
import NavDrawer from '../components/NavDrawer';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { Button } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack';

import { constructModuleObject } from '../firestore_data';

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
    height: '100%',
    padding: '2rem',
  },
  editorBG: {
    height: '100%',
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  tagBG: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: theme.spacing(0.5),
    margin: 0,
  },
}));

const EditModule = (props) => {
  const [moduleTitle, setModuleTitle] = useState(props.module_title || '');
  const [moduleId, setModuleId] = useState(props.module_id || '');
  const [tagInput, setTagInput] = useState('');
  const [mediaType, setMediaType] = useState({
    text: true,
    video: false,
    image: false,
    audio: false,
  });
  const [tags, setTags] = useState(props.tags || []);
  const [editorContent, setEditorContent] = useState(props.initialValue || '');
  const { enqueueSnackbar } = useSnackbar();

  const [errMsgs, setErrMsgs] = useState({
    title: null,
    module_id: null,
    tags: null,
  });

  const handleMediaTypeChange = (event) => {
    setMediaType({ ...mediaType, [event.target.name]: event.target.checked });
  };

  // initialize value from props to local state, TODO: experiment wether these can be removed
  useEffect(() => {
    setEditorContent(props.initialValue);
    setTags(props.tags || []);
    setModuleTitle(props.module_title || '');
    setModuleId(props.module_id);
  }, [props.initialValue, props.tags, props.module_title, props.module_id]);

  const [inlineEditorSwitch, setInlineEditorSwitch] = useState(false);
  const classes = useStyles();

  const validProjectTitle = (title) => {
    const regex = /^([a-zA-Z\d-_\s]+)?$/g;
    return title.match(regex) ? true : false;
  };

  // update editor component to parent component
  useEffect(() => {
    if (props.updateContent) {
      props.updateContent(editorContent);
    }
  }, [editorContent, props]);

  const updateProjectTitle = (e) => {
    if (validProjectTitle(e.target.value)) {
      setModuleTitle(e.target.value || '');
    }
  };

  const updateModuleID = useCallback((title) => {
    if (validProjectTitle(title)) {
      setModuleId(
        title
          .trim()
          .replaceAll(/[\s-_]+/g, ' ')
          .replaceAll(/\s/g, '_')
      );
    } else if (title.length === 0) {
      setModuleId('');
    } else {
      setModuleId('Error');
    }
  }, []);

  const updateTags = (e) => {
    e.preventDefault();
    setTags([...tags, tagInput]);
    setTagInput('');
  };

  const deleteTag = (tagToDelete) => {
    setTags((tags) => tags.filter((tag) => tag !== tagToDelete));
  };

  // update module_id according to module title
  useEffect(() => {
    // if a module_id is passed from parent, then we don't change it here
    if (moduleTitle.length === 0) updateModuleID(moduleTitle);
    if (!props.module_id && moduleTitle) updateModuleID(moduleTitle);
  }, [moduleTitle, props.module_id, updateModuleID]);

  // update error message for title
  useEffect(() => {
    if (moduleTitle) {
      setErrMsgs((err_msgs) => ({ ...err_msgs, title: null }));
    }
  }, [moduleTitle]);

  // update error message for module_id
  useEffect(() => {
    if (moduleId) {
      setErrMsgs((err_msgs) => ({ ...err_msgs, module_id: null }));
    }
  }, [moduleId]);

  // update error message for tags
  useEffect(() => {
    if (tagInput) {
      setErrMsgs((err_msgs) => ({ ...err_msgs, tags: null }));
    }
  }, [tagInput]);

  const validateForSubmit = () => {
    let err = false;
    const newErrMsgs = {};
    if (!moduleTitle) {
      newErrMsgs.title = 'Cannot Be Empty';
      err = true;
    }
    if (!moduleId) {
      newErrMsgs.module_id = 'Cannot Be Empty';
      err = true;
    }
    if (tags.length === 0) {
      newErrMsgs.tags = 'Cannot Be Empty';
      err = true;
    }
    setErrMsgs({ ...errMsgs, ...newErrMsgs });
    return err;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const err = validateForSubmit();
    if (err) {
      console.error('error validating the data to submit');
    } else {
      console.log('Submiting');
      console.log(`projectTitle:\n${moduleTitle}`);
      console.log(`projectId:\n${moduleId}`);
      console.log(`tags:\n${tags}`);
      console.log(`editorContent:\n${editorContent}`);
      if (props.onSubmit) {
        props.onSubmit({
          projectTitle: moduleTitle,
          projectId: moduleId,
          tags,
          editorContent,
        });
      }
      const mediaTypeArr = [];
      for (const [key, value] of Object.entries(mediaType)) {
        console.log(`${key}: ${value}`);
        if (value) {
          mediaTypeArr.push(key);
        }
      }
      console.log(
        constructModuleObject({
          title: moduleTitle,
          module_id: moduleId,
          tags,
          content: editorContent,
          roadmap: null,
          media_type: mediaTypeArr,
          type: 'regular',
          mode: props.mode,
        })
      );
    }
  };

  return (
    <NavDrawer>
      <Container maxWidth='md'>
        <Typography variant='h2' component='h2' gutterBottom>
          {props.title || <h1>No Title</h1>}
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
                {moduleId ? moduleId : '<module id>'}
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
        <TextField
          className={classes.textField}
          label='Module Title'
          id='module-title'
          fullWidth
          value={moduleTitle}
          onChange={updateProjectTitle}
          // onChange={(e) => {
          //   console.log(e.target.value);
          //   console.log(typeof e.target.value);
          // }}
          variant='outlined'
          autoFocus
          helperText={errMsgs.title || null}
          error={Boolean(errMsgs.title)}
        />
        {props.mode !== 'edit' && (
          <TextField
            className={classes.textField}
            label='Module ID'
            id='module-id'
            fullWidth
            value={moduleId}
            onChange={(e) => setModuleId(e.target.value)}
            variant='outlined'
            helperText={
              errMsgs.module_id || 'Must Be Unique Within Your Modules'
            }
            error={Boolean(errMsgs.module_id)}
          />
        )}
        <form onSubmit={updateTags}>
          <TextField
            className={classes.textField}
            label='Tag'
            id='tags-input'
            fullWidth
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            variant='outlined'
            helperText={errMsgs.tags || 'Press Enter to add a Tag'}
            error={Boolean(errMsgs.tags)}
          />
        </form>
        {tags && tags.length !== 0 && (
          <Paper elevation={3} className={classes.tagBG}>
            {tags.map((tag, index) => {
              return (
                <Chip
                  key={index}
                  label={tag}
                  onDelete={() => deleteTag(tag)}
                  className={classes.chip}
                />
              );
            })}
          </Paper>
        )}
        <Divider />
        <br />
        {inlineEditorSwitch ? (
          <div className={classes.editorBGWrapper}>
            <Editor
              key='inline-editor'
              width='100%'
              updateContent={setEditorContent}
              height={400}
              inline={true}
              content={props.content}
            />
          </div>
        ) : (
          <div>
            <Editor
              key='normal-editor'
              width='100%'
              updateContent={setEditorContent}
              height={400}
              inline={false}
              content={props.content}
            />
          </div>
        )}
        <br />
        <FormControlLabel
          control={
            <Checkbox
              checked={mediaType.text}
              onChange={handleMediaTypeChange}
              name='text'
              color='secondary'
            />
          }
          label='Text'
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={mediaType.image}
              onChange={handleMediaTypeChange}
              name='image'
              color='secondary'
            />
          }
          label='Image'
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={mediaType.video}
              onChange={handleMediaTypeChange}
              name='video'
              color='secondary'
            />
          }
          label='Video'
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={mediaType.video}
              onChange={handleMediaTypeChange}
              name='video'
              color='secondary'
            />
          }
          label='Video'
        />

        <Button
          variant='outlined'
          className='float-right'
          color='inherit'
          size='large'
          type='submit'
          onClick={onSubmit}
        >
          Submit
        </Button>
        {/* <div dangerouslySetInnerHTML={{ __html: editorContent }} /> */}
      </Container>
    </NavDrawer>
  );
};

export default EditModule;
