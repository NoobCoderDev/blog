import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const RichTextEditor = () => {
    const [editorHtml, setEditorHtml] = useState('');

    const handleChange = (value) => {
        setEditorHtml(value);
    };

    return (
        <div>
            {/* <h1>WYSIWYG Editor</h1> */}
            <ReactQuill
                value={editorHtml}
                onChange={handleChange}
                modules={RichTextEditor.modules}
                formats={RichTextEditor.formats}
                theme="snow"
            />                                              
            {/* <div style={{ marginTop: '20px' }}>
                <h2>Output:</h2>
                <div dangerouslySetInnerHTML={{ __html: editorHtml }} />
            </div> */}
        </div>
    );
};

RichTextEditor.modules = {
    toolbar: [
        [{ 'header': '1'}, { 'header': '2' }],
        [{ 'font': [] }],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        ['bold', 'italic', 'underline'],
        ['link'],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'align': [] }]
    ],
};

RichTextEditor.formats = [
    'header', 'font', 'list', 'bold', 'italic', 'underline', 'link', 'color', 'background', 'align'
];

export default RichTextEditor;
