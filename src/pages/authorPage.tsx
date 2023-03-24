import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

type UserProps = {
  username: string;
  id: string;
  iat: number;
  cover: string;
  content: string;
}

const serverUrl = import.meta.env.VITE_SERVER_URL

const AuthorPage = () => {
  const { id } = useParams()
  const [author, setAuthor] = useState<UserProps | null>(null)
  useEffect(() => {
    const authorData = async () => {
      const response = await fetch(`http://localhost:4000/author/${id}`)
      const author = await response.json()
      setAuthor(author)

    }
    authorData()
    console.log(author)
  }, [])

  if (!author) return <></>

  return (
    <div className='author-wrapper'>
      <div className='author_page'>
        <div className="profile_image">
          <img src={`${serverUrl}${author.cover}`} alt="main imnage" />
        </div>
        <h1>{author.username}</h1>
      </div>
      <div className="content" dangerouslySetInnerHTML={{ __html: author.content }} />
    </div>
  )
}

export default AuthorPage