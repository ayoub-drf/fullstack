import { useEffect, useState } from "react"
import Card from "../../components/Card/Card"
import FooterPage from "../FooterPage/FooterPage"
import "./HomePage.css"
import api from "../../api"
import Loader from "../../components/Loader/Loader"



const HomePage = () => {
  const [posts, setPosts] = useState();
  const [isLoading, setIsLoading] = useState(true)
  let [currentPage, setCurrentPage] = useState(1)
  let [totalPages, setTotalPages] = useState(1)
  

  const getPosts = async (page=1) => {
    try {
      setIsLoading(true)
      setCurrentPage(page)
      const res = await api.get(`posts/?q=${page}`);
      setTotalPages(Math.ceil(res.data.count / 3))
      setPosts(res.data.results)
      return res.data
    } catch (error) {
      console.log(error.message)
    } finally {
      setIsLoading(false)
    }
  };

  useEffect(() => {
    getPosts(currentPage)
  }, [currentPage])

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage)
    }
  };
  

  const generatePageNumber = () => {
    let pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i)      
    }
    return pages
  }


  if (isLoading) return <Loader></Loader>

  return (
    <>
      <div className="card-container">
        {posts.map((elem, index) => {
          return <Card elements={elem} key={index} />
        })}
      </div>
      <div className="paginator">
        the current page {currentPage} of total pages {totalPages}
        <br />
        <button onClick={() => handlePageChange(currentPage -= 1)} disabled={currentPage === 1}>Previous</button>
        <br />
        {generatePageNumber().map((ele, i) => (
          <button key={i} disabled={currentPage === ele}  onClick={() => setCurrentPage(ele)}>{ele}</button>
        ))}
        <br />
        <button onClick={() => handlePageChange(currentPage += 1)} disabled={currentPage === totalPages}>next</button>
      </div>
      <FooterPage />
    </>
  )
}

export default HomePage