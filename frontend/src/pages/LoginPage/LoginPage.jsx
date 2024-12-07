import { useEffect, useState } from "react";
import FooterPage from "../FooterPage/FooterPage"
import "./LoginPage.css"
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/ReactToastify.css";
import Loader from "../../components/Loader/Loader";





const LoginPage = ({ setIsAuthenticated, }) => {
  const navigator = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false)

  const getAccessToken = async () => {
    console.log('starting auth')
    try {
      setIsLoading(true)
      const res = await api.post('auth/', {email, password});
      localStorage.setItem(ACCESS_TOKEN, res.data.access)
      localStorage.setItem(REFRESH_TOKEN, res.data.refresh)
      navigator("/")
      setIsAuthenticated(true)
    } catch (error) {
      toast(error.response.data.detail);
    } finally {
      setIsLoading(false)
    }
  };


  if (isLoading) return <Loader></Loader>


  const handleChange = (e) => {
    if (e.target.name == "email") {
      setEmail(e.target.value)
    } else {
      setPassword(e.target.value)
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault()
    await getAccessToken()
  };
  return (
    <>
    <div className="login">
        <h2>Login To Your Account</h2>
        <form onSubmit={handleSubmit}>
            <div className="field">
                <input type="text" onChange={handleChange} value={email} name="email" placeholder="Enter your email"  required id="email" />
            </div>
            <div className="field">
                <input type="password" onChange={handleChange} value={password} name="password" placeholder="Enter your password" required id="password" />
            </div>
            <div className="field">
                <input type="submit" value="Login" id="submit" />
            </div>
        </form>
    </div>
    <ToastContainer />
    <FooterPage />
    </>
  )
}

export default LoginPage