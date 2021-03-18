import React from "react";
import { Editor as TinyEditor } from "@tinymce/tinymce-react";
import NavDrawer from "./NavDrawer";

const ModuleEditor = ({ updateContent, height = 600, width = "100%" }) => {
  const handleEditorChange = (e) => {
    if (updateContent) {
      updateContent(e.target.getContent());
    }
  };

  const image_upload_handler = (blobInfo, success, failure, progress) => {
    // console.log(blobInfo.blob());
    progress(50);
    success(
      "https://avatars.githubusercontent.com/u/33727687?s=400&u=7fd97fe40129bdebcfc0bbccc75657735969e5e5&v=4"
    );
    // failure({ remove: false });
  };

  return (
    <NavDrawer>
      <TinyEditor
        apiKey={process.env.REACT_APP_TINY_MCE_API_KEY}
        initialValue=''
        // inline={true}
        plugins='print preview powerpaste casechange importcss tinydrive searchreplace autolink autosave save directionality advcode visualblocks visualchars fullscreen image link media mediaembed template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists checklist wordcount tinymcespellchecker a11ychecker imagetools textpattern noneditable help formatpainter permanentpen pageembed charmap mentions quickbars linkchecker emoticons advtable'
        toolbar='undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist checklist | forecolor backcolor casechange permanentpen formatpainter removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media pageembed template link anchor codesample | a11ycheck ltr rtl | showcomments addcomment'
        init={{
          branding: false,
          height,
          width,
          menubar: "file edit view insert format tools table tc help",
          toolbar_mode: "sliding",
          statusbar: true,
          paste_data_images: true,
          skin: window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "oxide-dark"
            : "",
          content_css: window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "",
          images_upload_handler: image_upload_handler,
        }}
        onChange={handleEditorChange}
      />
    </NavDrawer>
  );
};

export default ModuleEditor;
