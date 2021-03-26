import React, { useState, useEffect } from 'react';
import { Editor as TinyEditor } from '@tinymce/tinymce-react';
import { uploadImage } from '../firebase';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../lib/redux_helper';

const ModuleEditor = ({
  updateContent,
  height = 600,
  width = '100%',
  inline,
  content,
  initialValue,
  user,
}) => {
  const [darkTheme, setDarkTheme] = useState('light');

  useEffect(() => {
    if (
      user.theme == 'dark' ||
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      setDarkTheme(true);
    } else {
    }
  }, [user]);

  const handleEditorChange = (e, editor) => {
    if (updateContent) {
      updateContent(e.target.getContent());
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
      initialValue={initialValue}
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
        skin: darkTheme ? 'oxide-dark' : '',
        content_css: darkTheme ? 'dark' : '',
        images_upload_handler: image_upload_handler,
      }}
      onChange={handleEditorChange}
    />
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ModuleEditor);