import "./Search.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import DropdownFilter from "../DropDownFilter/DropDownFilter";

const Search = ({ searchCats, filterCats, handleClear }) => {
  return (
    <div className="search">
      <label htmlFor="search">
        <FontAwesomeIcon icon={faSearch} className="search__icon-search" />
      </label>
      <input
        className="search__field"
        type="text"
        id="search"
        placeholder="Search"
        onChange={searchCats}
      ></input>
      <DropdownFilter filterCats={filterCats} handleClear={handleClear} />
    </div>
  );
};

export default Search;
