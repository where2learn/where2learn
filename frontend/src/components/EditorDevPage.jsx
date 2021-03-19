import React, { useState } from "react";
import Editor from "./Editor";
import { Container } from "@material-ui/core";

const EditorDevPage = () => {
  const [content, setContent] = useState("");
  React.useEffect(() => {
    console.log(content);
  }, [content]);
  return (
    <Container maxWidth='md'>
      <Editor updateContent={setContent} width='100%' height={500} />
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </Container>
  );
};

export default EditorDevPage;
