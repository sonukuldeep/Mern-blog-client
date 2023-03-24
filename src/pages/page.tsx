import React, { useEffect, useState } from 'react'
import Post from './post'
import { PostProps } from '../../typings'

const serverUrl = import.meta.env.VITE_SERVER_URL

const Page = () => {
    const [posts, setPosts] = useState<PostProps[]>([])

    useEffect(() => {
        const getPosts = async () => {
            try {
                const req = await fetch(`${serverUrl}post`)
                const posts = await req.json()
                setPosts(posts)

            } catch (error) {
                console.error('something bad happened' + error)
            }
        }
        getPosts()
    }, [])

    return (
        <>
            {posts.map(post => (<Post key={post._id} postData={post} />))}
        </>
    )
}

export default Page