import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { PostProps } from '../../typings'

const serverUrl = "http://localhost:4000/"

const Post = ({ postData }: { postData: PostProps }) => {
    return (
        <div className='post'>
            <div className='image'>
                <Link to={`/post/${postData._id}`}>
                    <img src={`${serverUrl}${postData.cover}`} alt='main image' />
                </Link>
            </div>
            <div className='texts'>
                <Link to={`/post/${postData._id}`}>

                    <h2>{postData.title}</h2>
                </Link>
                <div className='info'>
                    <Link to={`/author/${postData.author._id}`} className='author'>{postData.author.username}
                    </Link>
                    <span>{format(new Date(postData.updatedAt), 'MMM d yyyy HH:mm')}</span>
                </div>
                <p className='summary'>{postData.summary}</p>
            </div>
        </div>
    )
}

export default Post