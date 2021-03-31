import React, { useState, useEffect, useCallback } from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Editor from './ModuleEditor';
import NavDrawer from './NavDrawer';
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
import { constructModuleObject } from '../firestore_data';
import RmTreeView from './TreeView';
import { maxDescriptionDisplayLength } from '../constants';
import { convertTagsObj2Array, convertTagsArray2Obj } from '../firestore_data';

const maxDescriptionLength = 160;

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
  const [descriptionErrIndicator, setDescriptionErrIndicator] = useState(false);
  const [tags, setTags] = useState(props.tags || []);
  const [roadmap, setRoadMap] = useState(null);
  const [descriptionInput, setDescriptionInput] = useState(
    props.description || ''
  );
  const [mediaType, setMediaType] = useState({
    text: true,
    video: false,
    image: false,
    audio: false,
  });
  const [editorContent, setEditorContent] = useState(props.initialValue || '');

  const [helperText, setHelperText] = useState({
    title: null,
    module_id: null,
    tags: null,
    description: null,
  });

  const handleMediaTypeChange = (event) => {
    setMediaType({ ...mediaType, [event.target.name]: event.target.checked });
  };

  // initialize value from props to local state, TODO: experiment wether these can be removed
  useEffect(() => {
    setEditorContent(props.initialValue);
    if (props.tags) {
      const convertedTagsArray = convertTagsObj2Array(props.tags);
      setTags([...new Set([...tags, ...convertedTagsArray])]);
    }
    setModuleTitle(props.module_title || '');
    setModuleId(props.module_id);
    setDescriptionInput(props.description);
  }, [props.initialValue, props.tags, props.module_title, props.module_id]);

  const [inlineEditorSwitch, setInlineEditorSwitch] = useState(false);
  const [roadmapSwitch, setRoadmapSwitch] = useState(false);
  const classes = useStyles();

  const validProjectTitle = (title) => {
    const regex = /^([a-zA-Z\d-_\s]+)?$/g;
    return title.match(regex) ? true : false;
  };

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
    setTags([...new Set([...tags, tagInput.toLowerCase()])]);
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

  // update title message for title
  useEffect(() => {
    if (moduleTitle) {
      setHelperText((helperText) => ({ ...helperText, title: null }));
    }
  }, [moduleTitle]);

  // update module_id message for module_id
  useEffect(() => {
    if (moduleId) {
      setHelperText((helperText) => ({ ...helperText, module_id: null }));
    }
  }, [moduleId]);

  // update tag message for tags
  useEffect(() => {
    if (tagInput) {
      setHelperText((helperText) => ({ ...helperText, tags: null }));
    }
  }, [tagInput]);

  // update description helper text
  useEffect(() => {
    if (descriptionInput !== null && descriptionInput !== undefined) {
      const helperText_ = `Max Description Length: ${descriptionInput.length}/${maxDescriptionDisplayLength}`;
      setHelperText((helperText) => ({
        ...helperText,
        description: helperText_,
      }));
      setDescriptionErrIndicator(false);
    }
  }, [descriptionInput]);

  const validateForSubmit = () => {
    let err = false;
    const newHelperTexts = {};
    if (!moduleTitle) {
      newHelperTexts.title = 'Cannot Be Empty';
      err = true;
    }
    if (!moduleId && props.mode !== 'edit') {
      newHelperTexts.module_id = 'Cannot Be Empty';
      err = true;
    }
    if (tags.length === 0) {
      newHelperTexts.tags = 'Cannot Be Empty';
      err = true;
    }
    if (!descriptionInput || descriptionInput.length === 0) {
      newHelperTexts.description = 'Cannot Be Empty';
      setDescriptionErrIndicator(true);
    }
    if (
      !descriptionInput ||
      descriptionInput.length > maxDescriptionDisplayLength
    ) {
      setDescriptionErrIndicator(true);
    }
    setHelperText({ ...helperText, ...newHelperTexts });
    return err;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const err = validateForSubmit();
    if (err) {
      console.error('error validating the data to submit');
    } else {
      const mediaTypeArr = [];
      for (const [key, value] of Object.entries(mediaType)) {
        if (value) {
          mediaTypeArr.push(key);
        }
      }
      if (props.onSubmit) {
        let module_id;
        if (props.mode === 'edit') {
          module_id = props.module_id;
        } else if (props.mode === 'add') {
          module_id = moduleId;
        } else {
          console.error("mode doesn't exist");
        }
        console.log(tags);
        console.log(convertTagsArray2Obj(tags));
        props.onSubmit(
          constructModuleObject({
            title: moduleTitle,
            module_id,
            tags: convertTagsArray2Obj(tags),
            content: editorContent ? editorContent : null,
            roadmap: roadmap,
            media_type: mediaTypeArr,
            type: 'regular',
            mode: props.mode,
            description: descriptionInput,
          })
        );
      }
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
                {props.mode === 'edit'
                  ? props.module_id
                  : moduleId
                  ? moduleId
                  : '<module id>'}
              </Typography>
            </Breadcrumbs>
          </Grid>
          {!roadmapSwitch ? (
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
          ) : null}
        </Grid>
        <TextField
          className={classes.textField}
          inputProps={{ spellCheck: 'false' }}
          label='Module Title'
          id='module-title'
          fullWidth
          value={moduleTitle}
          onChange={updateProjectTitle}
          variant='outlined'
          autoFocus
          helperText={helperText.title || null}
          error={Boolean(helperText.title)}
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
              helperText.module_id || 'Must Be Unique Within Your Modules'
            }
            error={Boolean(helperText.module_id)}
          />
        )}
        <TextField
          className={classes.textField}
          inputProps={{ spellCheck: 'false' }}
          label='Description'
          id='module-description'
          fullWidth
          multiline
          error={descriptionErrIndicator}
          value={descriptionInput}
          onChange={(e) => {
            if (e.target.value.length <= maxDescriptionDisplayLength) {
              setDescriptionInput(e.target.value);
            }
          }}
          variant='outlined'
          helperText={helperText.description || null}
          // helperText='hi'
        />
        <form onSubmit={updateTags}>
          <TextField
            className={classes.textField}
            label='Tag'
            id='tags-input'
            fullWidth
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            variant='outlined'
            helperText={helperText.tags || 'Press Enter to add a Tag'}
            error={Boolean(helperText.tags)}
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
        {!roadmapSwitch ? (
          <React.Fragment>
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
                  content={editorContent}
                />
              </div>
            )}
          </React.Fragment>
        ) : (
          <RmTreeView />
        )}
        <br />
        <FormControlLabel
          // className='float-right'
          control={
            <Switch
              checked={roadmapSwitch}
              onChange={() => {
                setRoadmapSwitch(!roadmapSwitch);
              }}
              name='roadmap-switch'
              color='primary'
            />
          }
          label='Roadmap'
        />
        <div>
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
                checked={mediaType.audio}
                onChange={handleMediaTypeChange}
                name='audio'
                color='secondary'
              />
            }
            label='Audio'
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
        </div>
        {/* <div dangerouslySetInnerHTML={{ __html: editorContent }} /> */}
      </Container>
    </NavDrawer>
  );
};

export default EditModule;
