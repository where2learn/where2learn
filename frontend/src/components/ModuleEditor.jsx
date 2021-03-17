import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Container } from "@material-ui/core";

const ModuleEditor = () => {
  const handleEditorChange = (e) => {
    console.log("Content was updated:", e.target.getContent());
  };
  console.log(process.env.REACT_APP_TINY_MCE_API_KEY);
  return (
    <Container>
      <Editor
        apiKey={process.env.REACT_APP_TINY_MCE_API_KEY}
        initialValue='<p>Initial content</p>'
        // inline={true}
        init={{
          height: 500,
          menubar: true,
          statusbar: true,
          plugins: [
            "advlist autolink lists link image",
            "charmap print preview anchor help",
            "searchreplace visualblocks code codesample",
            "insertdatetime media table paste wordcount",
          ],
          toolbar:
            "undo redo | formatselect | bold italic | \
        alignleft aligncenter alignright | \
        bullist numlist outdent indent codesample | help",
        }}
        onChange={handleEditorChange}
      />
    </Container>
  );
};

export default ModuleEditor;
