import React from 'react';
import { Editor as TinyEditor } from '@tinymce/tinymce-react';
import { uploadImage } from '../firebase';

const ModuleEditor = ({
  updateContent,
  height = 600,
  width = '100%',
  inline = false,
  content,
  initialValue,
}) => {
  const handleEditorChange = (content, editor) => {
    if (updateContent) {
      updateContent(content.target.getContent());
    }
  };

  const image_upload_handler = async (blobInfo, success, failure, progress) => {
    try {
      const url = await uploadImage(blobInfo.blob());
      success(url);
    } catch {
      failure({ remove: false });
    }
  };

  return (
    <TinyEditor
      apiKey={process.env.REACT_APP_TINY_MCE_API_KEY}
      initialValue={initialValue ? initialValue : 'Content Here'}
      inline={inline}
      plugins='print preview powerpaste casechange importcss tinydrive searchreplace autolink autosave save directionality advcode visualblocks visualchars fullscreen image link media mediaembed template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists checklist wordcount tinymcespellchecker a11ychecker imagetools textpattern noneditable help formatpainter permanentpen pageembed charmap mentions quickbars linkchecker emoticons advtable'
      toolbar='undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist checklist | forecolor backcolor casechange permanentpen formatpainter removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media pageembed template link anchor codesample | a11ycheck ltr rtl | showcomments addcomment'
      value={content}
      init={{
        branding: false,
        height,
        width,
        menubar: 'file edit view insert format tools table tc help',
        toolbar_mode: 'sliding',
        statusbar: true,
        paste_data_images: true,
        skin: window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'oxide-dark'
          : '',
        content_css: window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : '',
        images_upload_handler: image_upload_handler,
      }}
      onChange={handleEditorChange}
    />
  );
};

export default ModuleEditor;
