import "./Header.scss";
import catIcon from "../../assets/icons/cat.png";
import { Link } from "react-router-dom";
import DropDownMenu from "../DropDownMenu/DropDownMenu";

function Header() {
  return (
    <div className="header__wrapper">
      <div className="header">
        <div className="header__container">
          <Link to="/" className="header__logo">
            <img
              src={catIcon}
              alt=""
              width="30"
              height="30"
              className="header__img"
            />
            <p>meowdopt</p>
          </Link>
          <div>
            <DropDownMenu />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
