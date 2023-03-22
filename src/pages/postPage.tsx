import { format } from 'date-fns'
import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { PostProps } from '../../typings'
import { useUserContext } from '../context/userContext'

const serverUrl = "http://localhost:4000/"

const PostPage = () => {
    const { id } = useParams()
    const [post, setPost] = useState<PostProps | null>(null)
    const { userInfo } = useUserContext()
    useEffect(() => {
        const fetchPost = async () => {
            const response = await fetch(`${serverUrl}post/${id}`)
            const post = await response.json()
            setPost(post)
        }

        fetchPost()
    }, [])

    if (!post) return (<></>)

    return (
        <>
            <div className="post-page">
                {userInfo?.id === post.author._id ?
                    <div className='edit-text'>
                        <Link to={`/editPost/${id}`}>Edit this post</Link>
                    </div>
                    : ""}
                <h1 className='title'>{post.title}</h1>
                <div className="image">
                    <img src={`${serverUrl}${post.cover}`} alt="main image" />
                </div>
                <div className="author_title">
                    <Link to={`/author/${post.author._id}`}>By {post.author.username}</Link><sub className='time'>{format(new Date(post.createdAt), 'MMM d yyy HH:mm')}</sub>
                </div>
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>
        </>
    )
}

export default PostPage