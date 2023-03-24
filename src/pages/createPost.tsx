import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Editor from '../editor'

const CreatePost = () => {
  const [title, setTitle] = useState("")
  const [summary, setSummary] = useState("")
  const [content, setContent] = useState("")
  const [file, setFile] = useState<FileList | null>(null)
  const navigate = useNavigate()

  const serverUrl = import.meta.env.VITE_SERVER_URL
  
  async function createNewPost(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData()
    data.set('title', title)
    data.set('summary', summary)
    data.set('content', content)
    if (file) {
      data.set('file', file[0])
    }

    const response = await fetch(`${serverUrl}newpost`, {
      method: 'POST',
      credentials: 'include',
      body: data,
    })

    if (response.status === 200) {
      alert('Post saved!')
      navigate('/')
    }
  }

  return (
    <form onSubmit={createNewPost}>
      <input type="text" placeholder='Title' value={title} onChange={e => setTitle(e.target.value)} required />
      <input type="text" placeholder='Summary' value={summary} onChange={e => setSummary(e.target.value)} required />
      <input type="file" onChange={e => setFile(e.target.files)} required accept="image/png, image/webp, image/jpeg, image/avif"/>
      <Editor value={content} onChange={setContent} />
      <button className='create-post-btn'>Create post</button>
    </form>
  )
}

export default CreatePost