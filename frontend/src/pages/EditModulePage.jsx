import React, { useState, useRef, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { getModuleById } from '../firebase';
import Container from '@material-ui/core/Container';

import NavDrawer from '../components/NavDrawer';

import EditModule from '../components/EditModule';

const EditModulePage = (props) => {
  const [module, setModule] = useState(null);
  const [content, setContent] = useState(null);

  useEffect(async () => {
    console.log(props.match.params.id);
    const data = await getModuleById(props.match.params.id);
    setModule(data);
    console.log(data);
  }, []);

  const onSubmit = (module) => {};

  return (
    <NavDrawer>
      <Container maxWidth='md'>
        <EditModule
          initialValue={module && module.content ? module.content : ''}
          tags={module && module.tags ? module.tags : []}
          module_id={module && module.module_id ? module.module_id : ''}
          module_title={module && module.title ? module.title : ''}
          title='Edit A Module'
          content={content}
          updateContent={setContent}
          onSubmit={onSubmit}
        />
      </Container>
    </NavDrawer>
  );
};

export default withRouter(EditModulePage);
