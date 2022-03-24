import "./CatsCard.scss";
import { Link } from "react-router-dom";
const baseURL = process.env.REACT_APP_API_URL;

function CatsCard({ id, image, catName, urlPath }) {
  return (
    <div className="cats__card">
      <Link to={`${urlPath}/${id}`} className="cats__link">
        <img src={`${baseURL}${image}`} alt="cat" className="cats__img" />
        <p className="cats__name">{catName}</p>
      </Link>
    </div>
  );
}

export default CatsCard;
