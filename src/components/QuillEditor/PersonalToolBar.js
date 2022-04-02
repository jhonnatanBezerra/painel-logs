import React from "react";
import { Quill } from 'react-quill';
import ImageResize from 'quill-image-resize-module-react';
import * as Emoji from 'quill-emoji';


// Add sizes to whitelist and register them
const Size = Quill.import("formats/size");
Size.whitelist = ["8px", "12px", "14px", "18px", "20px", "22px", "24px", "32px", "40px"];
Quill.register(Size, true);

Quill.register('modules/imageResize', ImageResize);
Quill.register('modules/emoji', Emoji);

// Add fonts to whitelist and register them
const Font = Quill.import("formats/font");
Font.whitelist = [
  "arial",
  "comic-sans",
  "courier-new",
  "georgia",
  "helvetica",
  "lucida",
  "lobster",
  "allison",
  "roboto",
  "architects"
];
Quill.register(Font, true);



// Modules object for setting up the Quill editor
export const modules = {
  toolbar: {
    container: "#toolbar",
  },
  history: {
    delay: 500,
    maxStack: 100,
    userOnly: true
  },
  imageResize: {
    parchment: Quill.import('parchment'),
    modules: ['Resize', 'DisplaySize']
  },
  "emoji-toolbar": true,
  "emoji-textarea": false,
  "emoji-shortname": true,
};

// Formats objects for setting up the Quill editor
export const formats = [
  "link",
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "align",
  "strike",
  "script",
  "blockquote",
  "direction",
  "background",
  "list",
  "bullet",
  "indent",
  "image",
  "color",
  "code-block",
  "width",
  "emoji",
];

// Quill Toolbar component
export const QuillToolbar = () => (
  <div id="toolbar">
    <span className="ql-formats">

      <select className="ql-font" defaultValue="arial">
        <option value="arial">Arial</option>
        <option value="comic-sans">Comic Sans</option>
        <option value="courier-new">Courier New</option>
        <option value="georgia">Georgia</option>
        <option value="helvetica">Helvetica</option>
        <option value="lucida" >Lucida</option>
        <option value="lobster" >Lobster</option>
        <option value="allison" >Allison</option>
        <option value="roboto" >Roboto</option>
        <option value="architects" >Architects</option>
      </select>

      <select className="ql-size" defaultValue="18px">
        <option value="8px">8 px</option>
        <option value="12px">12 px</option>
        <option value="14px">14 px</option>
        <option value="18px">18 px</option>
        <option value="20px">20 px</option>
        <option value="22px">22 px</option>
        <option value="24px">24 px</option>
        <option value="32px">32 px</option>
        <option value="40px">40 px</option>
      </select>

      <select className="ql-header" defaultValue="3">
        <option value="1">Título</option>
        <option value="2">Sub-Título</option>
        <option value="3">Normal</option>
      </select>

    </span>

    <span className="ql-formats">
      <button className="ql-bold" />
      <button className="ql-italic" />
      <button className="ql-underline" />
      <button className="ql-strike" />
    </span>

    <span className="ql-formats">
      <button className="ql-list" value="check" />
      <button className="ql-list" value="ordered" />
      <button className="ql-list" value="bullet" />
    </span>

    <span className="ql-formats">
      <button className="ql-indent" value="-1" />
      <button className="ql-indent" value="+1" />
    </span>

    <span className="ql-formats">
      <button className="ql-script" value="super" />
      <button className="ql-script" value="sub" />
      <button className="ql-blockquote" />
    </span>

    <span className="ql-formats">
      <select className="ql-align" />
      <select className="ql-color" />
      <select className="ql-background" />
    </span>

    <span className="ql-formats">
      <button className="ql-link" />
      <button className="ql-image" />
      <button className="ql-video" />
    </span>

    <span className="ql-formats">
      <button className="ql-formula" />
      <button className="ql-code-block" />
      {/* <button className="ql-emoji" /> */}
    </span>

  </div>
);

export default QuillToolbar;
