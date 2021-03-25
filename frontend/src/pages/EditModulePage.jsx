import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getModuleById } from '../firebase';
import Container from '@material-ui/core/Container';
import NavDrawer from '../components/NavDrawer';
import EditModule from '../components/EditModule';
import { editModule } from '../firebase';
import { constructFullModuleId } from '../firestore_data';

const EditModulePage = (props) => {
  const { currentUser } = useAuth();

  const [module, setModule] = useState(null);
  const [content, setContent] = useState(null);

  useEffect(() => {
    (async () => {
      const full_module_id = constructFullModuleId(
        props.match.params.username,
        props.match.params.module_id
      );
      const data = await getModuleById(full_module_id);
      setModule(data);
    })();
  }, [props.match.params.id]);

  const onSubmit = (module) => {
    editModule(currentUser.username, module)
      .then(() => {
        console.log('successfully edited module');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <NavDrawer>
      <Container maxWidth='md'>
        <EditModule
          mode='edit'
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
