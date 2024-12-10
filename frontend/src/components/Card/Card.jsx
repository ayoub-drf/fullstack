import "./Card.css";
import cardImage from "../../../public/post.png";
import { BASE_URL } from "../../utils/constants";

const Card = ({ elements }) => {
  return (
    <div className="card">
      <div className="image">
        <img src={`${BASE_URL}${elements.post_image}`} alt="" />
      </div>
      <a href={`/posts/${elements.slug}/`} className="title">
        {elements.title}
      </a>
      <div className="description">{elements.content}</div>
      {elements.author ? (
        <div className="author">
          <a href={`/user/profile/${elements.author.username}/`} >creator: {elements.author.username}</a>
        </div>
      ) : <div className="author">creator: <a href="/">Unknown</a></div>}
    </div>
  );
};

export default Card;
