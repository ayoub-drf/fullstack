import { useEffect, useState } from "react"
import { Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import api from "./api";
import Loader from "./components/Loader/Loader";
import HomePage from "./pages/HomePage/HomePage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import PostDetail from "./pages/PostDetail/PostDetail";
import CreatePost from "./pages/CreatePost/CreatePost";



const App = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState(null)
  const [id, setId] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const getUsername = async () => {
    try {
      setIsLoading(true)
      const res = await api.get('user/get-username/');
      setUsername(res.data.username)
      setId(res.data.id)
      setIsAuthenticated(true)
      return res.data
    } catch (error) {
      // navigate("/login/")
      console.log("getUsername Error", error.message)
    } finally {
      setIsLoading(false)
    }
  };

  useEffect(() => {
    getUsername()

  }, [isAuthenticated])

  if (isLoading) return <Loader></Loader>

  return (
    <>
    <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} setUsername={setUsername}  username={username} />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login/" element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} />
      <Route path="/register/" element={<RegisterPage setIsAuthenticated={setIsAuthenticated} />} />
      <Route path="/user/profile/:username/" element={<ProfilePage />} />
      <Route path="/posts/:slug/" element={<PostDetail username={username} />} />
      <Route path="/posts/create-post/" element={<CreatePost id={id} isAuthenticated={isAuthenticated} />} />
    </Routes>
    </>
  )
}

export default App 