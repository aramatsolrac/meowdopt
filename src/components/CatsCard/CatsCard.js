import "./CatsCard.scss";
import { Link } from "react-router-dom";
import likeIcon from "./../../assets/icons/heart.svg";
const baseURL = process.env.REACT_APP_API_URL;

function CatsCard({ id, link, image, catName, urlPath }) {
  return (
    <div className="cats__card">
      <Link to={`${urlPath}/${id}`} className="cats__link">
        <img src={likeIcon} alt="" arid-hidden="true" className="cats__like" />
        <img src={`${baseURL}${image}`} alt="cat" className="cats__img" />
        <p className="cats__name">{catName}</p>
      </Link>
    </div>
  );
}

export default CatsCard;
