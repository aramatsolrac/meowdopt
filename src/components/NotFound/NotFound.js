import "./NotFound.scss";
import notFound from "../../assets/icons/not-found.png";

function NotFound() {
  return (
    <div className="notFound">
      <div className="notFound__card">
        <img src={notFound} alt="cat" />
      </div>
    </div>
  );
}

export default NotFound;
