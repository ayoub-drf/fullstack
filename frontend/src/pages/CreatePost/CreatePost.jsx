import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreatePost.css";
import api from "../../api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/ReactToastify.css";

const CreatePost = ({ id, isAuthenticated }) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [postImage, setPostImage] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");

  const createPost = async (formData) => {
    try {
      const res = await api.post("create-post/", formData, {
        headers: {
          "Content-Type": "application/form-data",
        },
      });
      navigate(`/posts/${res.data.slug}`);
    } catch (error) {
      toast(error.response.data.detail);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    if (content) formData.append("content", content);
    if (postImage) {
      formData.append("post_image", postImage);
    }
    if (selectedCategory) {
      formData.append("category", selectedCategory);
    }
    if (isAuthenticated && id) {
      formData.append("author", id);
    }
    await createPost(formData);
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="update-post-form">
        <div className="field">
          <input
            value={title}
            required
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
          <input type="submit" value="Create Post" />
        </div>
      </form>
      <ToastContainer />
    </>
  );
};

export default CreatePost;
