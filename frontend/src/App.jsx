import { useEffect, useState } from "react"
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import api from "./api";
import Loader from "./components/Loader/Loader";




const App = () => {
  const [username, setUsername] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const getUsername = async () => {
    try {
      setIsLoading(true)
      const res = await api.get('user/get-username/');
      setUsername(res.data.username)
      setIsAuthenticated(true)
      return res.data
    } catch (error) {
      console.log(error.message)
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
      <Route path="/" element={<h1>Home</h1>} />
      <Route path="/login/" element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} />
      <Route path="/register/" element={<RegisterPage></RegisterPage>} />
    </Routes>
    </>
  )
}

export default App 