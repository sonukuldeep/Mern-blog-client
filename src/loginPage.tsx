import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserContext } from './context/userContext'

const serverUrl = import.meta.env.VITE_SERVER_URL

const LoginPage = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const { setUserInfo } = useUserContext()
  const navigate = useNavigate();

  async function login(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const response = await fetch(`${serverUrl}login`, {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    })

    if (response.status === 200) {

      const { username, id } = await response.json()
      setUserInfo({ username, id })
      setUsername("")
      setPassword("")
      navigate("/")
    } else {
      alert("Check username and password again")
      setPassword("")
    }
  }

  return (
    <form className='login' onSubmit={login}>
      <h2 className='heading'>Log in</h2>
      <input type="text" placeholder='username' value={username} onChange={e => setUsername(e.target.value)} />
      <input type="password" placeholder='password' value={password} onChange={e => setPassword(e.target.value)} />
      <button>Login</button>
    </form>
  )
}

export default LoginPage