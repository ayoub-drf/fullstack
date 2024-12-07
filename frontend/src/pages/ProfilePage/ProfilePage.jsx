import { useParams } from "react-router-dom"
import "./ProfilePage.css"
import api from "../../api";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader/Loader";
import Card from "../../components/Card/Card"
import { BASE_URL } from "../../utils/constants";



const ProfilePage = () => {
  const [profileData, setProfileData] = useState([]);
  const { username } = useParams();
  const [isLoading, setIsLoading] = useState(true)


  const getProfileData = async () => {
    try {
      setIsLoading(true)
      const res = await api.get(`/user/profile/${username}/`);
      console.log(res.data)
      setProfileData(res.data) 
    } catch (error) {
      console.log(error.message)  
    } finally {
      setIsLoading(false)
    }
  };

  useEffect(() => {
    getProfileData()
  }, [])

  if (isLoading) return <Loader></Loader>


  return (
    <>
      <div className="profile">
        <img src={`${BASE_URL}${profileData.avatar}`} alt="" />
        <p>{profileData.username}</p>
        <p>user posts</p>
      </div>
      <div className="card-container">
        {profileData.profile_posts.map((elem, index) => {
          return <Card elements={elem} key={index} />
        })}
      </div>
    </>
  )
}

export default ProfilePage