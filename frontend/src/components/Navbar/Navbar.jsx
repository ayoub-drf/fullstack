import { useEffect } from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";



const Navbar = ({ isAuthenticated, username,  setIsAuthenticated }) => {
    const navigator = useNavigate()

    const logout = () => {
      localStorage.clear()
      setIsAuthenticated(false)
      navigator('/login/')
    }
    return (
      <nav>
        <div className="logo">
          <a href="/" className="logoLink">
            OpenBook
          </a>
        </div>
        <ul className="links">
          <li className="link">
            <a href="/">
            Home
            </a>
          </li>
          <li className="link">
            <a href="/posts/create-post/">
              Create Post
            </a>
          </li>
          {isAuthenticated ? (
            <>
              <li className="link">
                <a href={`user/profile/${username}/`}>
                  {username}
                </a>
              </li>
              <button onClick={logout} className="link">Logout</button>
            </>
          ) : (
            <>
              <li className="link">
                <a href="/login/">
                  Login
                </a>
              </li>
              <li className="link">
                <a href="/register/">
                register
                </a>
              </li>
            </>
          )}
        </ul>
      </nav>
    );
};

export default Navbar;
