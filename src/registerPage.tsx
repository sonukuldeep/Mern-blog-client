import React, { useEffect, useState } from 'react'
import Editor from './editor'

const serverUrl = "http://localhost:4000/"

const RegisterPage = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [repeatPassword, setRepeatPassword] = useState<string | undefined>(undefined)
    const [content, setContent] = useState("")
    const [imageFile, setImageFile] = useState<FileList | null>(null)
    const [validateForm, setValidateForm] = useState(false)

    useEffect(() => {
        const passwordsmatch = password === repeatPassword && username !== "" && content !== ""
        setValidateForm(passwordsmatch)
    }, [password, repeatPassword, username, content])


    async function register(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if (validateForm) {

            const response = await fetch(`${serverUrl}register`, {
                method: 'POST',
                body: JSON.stringify({ username, password }),
                headers: { 'Content-Type': 'application/json' },
            })

            if (response.status !== 200) {
                console.log("Registration failed, probably the user already exist")
                alert("Registration failed")
            } else {
                alert("Registration successful!")
            }

            setUsername("")
            setPassword("")
        }
    }

    return (
        <form className='register' onSubmit={register}>
            <h2>Register</h2>
            <input type="text" placeholder='username' minLength={6} value={username} onChange={e => setUsername(e.target.value)} />
            <input type="password" placeholder='enter password' minLength={6} value={password} onChange={e => setPassword(e.target.value)} />
            <input type="password" placeholder='repeat password' value={repeatPassword} onChange={e => setRepeatPassword(e.target.value)} />
            <sub>Upload profile pic</sub>
            <input type="file" onChange={e=>setImageFile(e.target.files)} accept="image/png, image/webp, image/jpeg, image/avif"/>
            <h3>Your Brief Introduction</h3>
            <Editor value={content} onChange={setContent} />
            <button style={validateForm  ? { cursor: 'pointer' } : { cursor: 'not-allowed' }}>Register</button>
        </form>
    )
}

export default RegisterPage

