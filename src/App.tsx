import './App.css'
import { Routes, Route } from 'react-router-dom'
import Pages from './pages/page'
import Layout from './layout'
import LoginPage from './loginPage'
import RegisterPage from './registerPage'
import { UserContextProvider } from './context/userContext'
import CreatePost from './pages/createPost'
import PostPage from './pages/postPage'
import AuthorPage from './pages/authorPage'
import EditPost from './pages/editPost'

const App = () => {
  return (
    <UserContextProvider>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Pages />} />
          <Route path={'/login'} element={<LoginPage />} />
          <Route path={'/register'} element={<RegisterPage />} />
          <Route path={'/create'} element={<CreatePost />} />
          <Route path={'/post/:id'} element={<PostPage />} />
          <Route path={'/author/:id'} element={<AuthorPage />} />
          <Route path={'/editPost/:id'} element={<EditPost />} />
        </Route>
      </Routes>
    </UserContextProvider>
  )
}

export default App