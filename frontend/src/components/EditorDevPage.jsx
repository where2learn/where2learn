import React, { useState } from "react";
import Editor from "./Editor";
import { Container } from "@material-ui/core";

const EditorDevPage = () => {
  const [content, setContent] = useState("");
  return (
    <Container maxWidth='md'>
      <Editor updateContent={setContent} width='100%' height={500} />
    </Container>
  );
};

export default EditorDevPage;
