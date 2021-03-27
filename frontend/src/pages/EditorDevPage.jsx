import React, { useState } from 'react';
import ModuleEditor from '../components/ModuleEditor';
import { Container } from '@material-ui/core';

const EditorDevPage = () => {
  const [content, setContent] = useState('');

  return (
    <Container maxWidth='md'>
      <ModuleEditor
        updateContent={setContent}
        width='100%'
        height={500}
        inline
      />
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </Container>
  );
};

export default EditorDevPage;
