import FooterPage from "../FooterPage/FooterPage"
import "./RegisterPage.css"

const RegisterPage = () => {
  return (
    <>
    <div className="register">
        <h2>Create An Account</h2>
        <form>
            <div className="field">
                <input type="text" name="username" placeholder="Enter your username" required id="username" />
            </div>
            <div className="field">
                <input type="text" name="email" placeholder="Enter your email"  required id="email" />
            </div>
            <div className="field">
                <input type="password" name="password" placeholder="Enter your password" required id="password" />
            </div>
            <div className="field">
                <input type="submit" value="Register" id="submit" />
            </div>
        </form>
    </div>
    <FooterPage />
    </>
  )
}

export default RegisterPage