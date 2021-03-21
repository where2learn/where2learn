import React, { useState } from 'react';
import Editor from '../components/Editor';
import { Container } from '@material-ui/core';

const EditorDevPage = () => {
  const [content, setContent] = useState('');

  return (
    <Container maxWidth='md'>
      <Editor updateContent={setContent} width='100%' height={500} inline />
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </Container>
  );
};

export default EditorDevPage;
