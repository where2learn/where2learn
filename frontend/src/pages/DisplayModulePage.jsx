import React from 'react';
import Container from '@material-ui/core/Container';
import DisplayModule from '../components/DisplayModule';
import NavDrawer from '../components/NavDrawer';

const DisplayModulePage = () => {
  return (
    <NavDrawer>
      <Container maxWidth='lg'>
        <DisplayModule />
      </Container>
    </NavDrawer>
  );
};

export default DisplayModulePage;
