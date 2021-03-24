import React from 'react';
import Container from '@material-ui/core/Container';
import NavDrawer from '../components/NavDrawer';
import EditModule from '../components/EditModule';

const AddModule = () => {
  return (
    <NavDrawer>
      <Container maxWidth='md'>
        <EditModule title='Add A Module' mode='add' />
      </Container>
    </NavDrawer>
  );
};

export default AddModule;
