import { useParams, useNavigate } from "react-router-dom";
import "./PostDetail.css";
import { useEffect, useState, useRef } from "react";
import api from "../../api";
import Loader from "../../components/Loader/Loader";
import Card from "../../components/Card/Card";
import { BASE_URL } from "../../utils/constants";

const PostDetail = ({ username }) => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [postImage, setPostImage] = useState(null);
  const deleteButtonRef = useRef(null);

  const getPost = async () => {
    try {
      setIsLoading(true);
      const res = await api.get(`posts/${slug}/`);
      setPost(res.data);
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const updatePost = async (data) => {
    try {
      const res = await api.put(`/update-post/${post.slug}/`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate(`/posts/${res.data.slug}/`);
      location.reload();
    } catch (error) {
      console.log(error.message);
    }
  };

  const deletePost = async () => {
    try {
      const res = await api.delete(`/delete-post/${post.slug}/`);
      console.log("post deleted", post.title);
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getPost();
  }, []);

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
      setSelectedCategory(post.category);
    }
    if (deleteButtonRef.current) {
      deleteButtonRef.current.onclick = deletePost;
    }
  }, [post]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (postImage) {
      formData.append("post_image", postImage);
    }

    if (selectedCategory) {
      formData.append("category", selectedCategory);
    }
    await updatePost(formData);
  };

  if (isLoading) return <Loader></Loader>;

  //   update-post/post-3/

  return (
    <>
      <div className="post-detail">
        <Card elements={post} key={post.pk} />
      </div>
      {post.author?.username === username ? (
        <>
          <button className="delete-btn" ref={deleteButtonRef}>Delete this post {post.title} </button>
          <form onSubmit={handleSubmit} className="update-post-form">
            <div className="field">
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                placeholder="Enter post title"
              />
            </div>
            <div className="field">
              <input
                value={content}
                onChange={(e) => setContent(e.target.value)}
                type="text"
                placeholder="Enter post content"
              />
            </div>
            <div className="field">
              <p>{`Current Image: ${BASE_URL}${post.post_image}`} </p>
              <input
                onChange={(e) => setPostImage(e.target.files[0])}
                type="file"
                accept="image/*"
              />
            </div>
            <div className="field">
              <select
                name=""
                id="default"
                value={selectedCategory || ""}
                onChange={(e) =>
                  e.target.value ? setSelectedCategory(e.target.value) : null
                }
              >
                <option value="">select a category</option>
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
                <option value="Fullstack">Fullstack</option>
              </select>
            </div>
            <div className="field">
              <input type="submit" value="Update post" />
            </div>
          </form>
        </>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default PostDetail;
