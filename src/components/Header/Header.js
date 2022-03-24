import "./Header.scss";
import catIcon from "../../assets/icons/cat.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

function Header() {
  return (
    <Link to="/" className="header">
      <div className="header__mobile">
        <div className="header__logo">
          <img
            src={catIcon}
            alt=""
            width="30"
            height="30"
            className="header__img"
          />
          <p>meowdopt</p>
        </div>
        <div>
          <FontAwesomeIcon icon={faBars} size="lg" className="header__menu" />
        </div>
      </div>
    </Link>
  );
}

export default Header;
