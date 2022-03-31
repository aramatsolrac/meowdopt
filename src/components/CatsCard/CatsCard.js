import "./CatsCard.scss";
import { Link } from "react-router-dom";
const baseURL = process.env.REACT_APP_API_URL;

function CatsCard({ id, image, catName, urlPath }) {
  return (
    <div className="catsCard__card">
      <Link to={`${urlPath}/${id}`} className="catsCard__link">
        <img src={`${baseURL}${image}`} alt="cat" className="catsCard__img" />
        <p className="catsCard__name">{catName}</p>
      </Link>
    </div>
  );
}

export default CatsCard;
