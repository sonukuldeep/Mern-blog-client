import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

type EditorProps = {
    value: string;
    onChange: React.Dispatch<React.SetStateAction<string>>;
}

const modules = {
    toolbar: [
        [{ 'header': [ 2, 3, 4, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
        ['link', 'image'],
        ['clean']
    ],
}

const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
]

const Editor = ({ value, onChange }: EditorProps) => {
    return (
        <ReactQuill modules={modules} formats={formats} value={value} onChange={onChange} />
    )
}

export default Editor