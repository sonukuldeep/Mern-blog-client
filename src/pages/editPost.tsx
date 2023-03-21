import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { PostProps } from '../../typings'
import Editor from '../editor'

const serverUrl = "http://localhost:4000/"

const EditPost = () => {
    const { id } = useParams()
    const [title, setTitle] = useState("")
    const [summary, setSummary] = useState("")
    const [content, setContent] = useState("")
    const [file, setFile] = useState<FileList | null>(null)
    const navigate = useNavigate()


    async function editPost(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const data = new FormData()
        data.set('title', title)
        data.set('summary', summary)
        data.set('content', content)
        if (file) {
            data.set('file', file[0])
        }

        const response = await fetch(`${serverUrl}post/${id}`, {
            method: 'PUT',
            credentials: 'include',
            body: data,
        })

        if (response.status === 200) {
            alert('Post saved!')
            navigate(`/post/${id}`)
        }
    }

    useEffect(() => {
        const getPost = async () => {
            const response = await fetch(`${serverUrl}post/${id}`)
            const post: PostProps = await response.json()
            const { title, summary, content } = post
            setTitle(title)
            setSummary(summary)
            setContent(content)
        }
        getPost()
    }, [])

    return (
        <form onSubmit={editPost}>
            <input type="text" placeholder='Title' value={title} onChange={e => setTitle(e.target.value)} required />
            <input type="text" placeholder='Summary' value={summary} onChange={e => setSummary(e.target.value)} required />
            <input type="file" onChange={e => setFile(e.target.files)} accept="image/png, image/webp, image/jpeg, image/avif" />
            <Editor value={content} onChange={setContent} />
            <button className='create-post-btn'>Save post</button>
        </form>
    )
}

export default EditPost