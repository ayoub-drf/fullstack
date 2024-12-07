import { useState } from "react";
import FooterPage from "../FooterPage/FooterPage";
import "./RegisterPage.css";
import api from "../../api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/ReactToastify.css";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../utils/constants";
import { useNavigate } from "react-router-dom";

const RegisterPage = ({ setIsAuthenticated }) => {
  const navigator = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const getAccessToken = async () => {
    try {
      const res = await api.post("auth/", { email: email, password: password });
      localStorage.setItem(ACCESS_TOKEN, res.data.access);
      localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        navigator("/")
        setIsAuthenticated(true)
    } catch (error) {
      toast(error.response.data.detail);
    }
  };

  const registerUser = async () => {
    try {
      const res = await api.post("register/", {
        email: email,
        username: username,
        password: password,
      });
      if (res.status == 201) {
        await getAccessToken()
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await registerUser();
  };
  return (
    <>
      <div className="register">
        <h2>Create An Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              name="username"
              placeholder="Enter your username"
              required
              id="username"
            />
          </div>
          <div className="field">
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              placeholder="Enter your email"
              required
              id="email"
            />
          </div>
          <div className="field">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              placeholder="Enter your password"
              required
              id="password"
            />
          </div>
          <div className="field">
            <input type="submit" value="Register" id="submit" />
          </div>
        </form>
      </div>
      <ToastContainer />
      <FooterPage />
    </>
  );
};

export default RegisterPage;
