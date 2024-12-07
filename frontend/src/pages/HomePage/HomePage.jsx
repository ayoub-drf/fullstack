import { useEffect, useState } from "react"
import Card from "../../components/Card/Card"
import FooterPage from "../FooterPage/FooterPage"
import "./HomePage.css"
import api from "../../api"
import Loader from "../../components/Loader/Loader"



const HomePage = () => {
  const [posts, setPosts] = useState();
  const [isLoading, setIsLoading] = useState(true)
  

  const getPosts = async () => {
    try {
      setIsLoading(true)
      const res = await api.get('posts/');
      setPosts(res.data)
      return res.data
    } catch (error) {
      console.log(error.message)
    } finally {
      setIsLoading(false)
    }
  };

  useEffect(() => {
    getPosts()
  }, [])

  if (isLoading) return <Loader></Loader>

  return (
    <>
      <div className="card-container">
        {posts.map((elem, index) => {
          return <Card elements={elem} key={index} />
        })}
      </div>
      <FooterPage />
    </>
  )
}

export default HomePage