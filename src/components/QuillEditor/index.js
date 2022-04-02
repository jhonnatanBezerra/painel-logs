import React, { useState } from "react";
import ReactQuill from "react-quill";
import EditorToolbar, { formats, modules } from './PersonalToolBar';

import "react-quill/dist/quill.snow.css";
import './editorText.css';


export const QuillEditor = () => {

  const [content, setContent] = useState(null);

  const handleChange = (content) => {
    setContent(content);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', flex: 1 }}>
      <EditorToolbar />
      <ReactQuill
        theme="snow"
        onChange={handleChange}
        placeholder={"Detalhes da proposta"}
        modules={modules}
        formats={formats}
      />
    </div>

  );
}