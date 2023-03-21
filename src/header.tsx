import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useUserContext } from './context/userContext'

const serverUrl = "http://localhost:4000/"

const Header = () => {
    const { userInfo, setUserInfo } = useUserContext()

    useEffect(() => {
        fetch(`${serverUrl}profile`, {
            credentials: 'include',
        })
            .then(res => res.json())
            .then(user => {
                setUserInfo(user)
            })
    }, [])

    async function logout() {
        const response = await fetch(`${serverUrl}logout`, {
            credentials: 'include',
            method: 'POST',
        })
        if (response.status === 200) {
            setUserInfo(null)
        }
    }
    console.log('header rendered now')
    return (
        <header>
            <Link to='/' className='logo'>My Blog</Link>
            <nav>
                {userInfo ?
                    (
                        <div>
                            <p>Hello {userInfo.username}</p>
                            <Link to="/create">Create new post</Link>
                            <a onClick={() => logout()}>Log out</a>
                        </div>
                    ) : (
                        <div>
                            <Link to='/login'>Login</Link>
                            <Link to='/register'>Register</Link>
                        </div>
                    )}
            </nav>
        </header>
    )
}

export default Header