import "./Search.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faXmark } from "@fortawesome/free-solid-svg-icons";
import DropdownFilter from "../DropDownFilter/DropDownFilter";

const Search = ({
  searchCats,
  filterCats,
  handleClearFilter,
  handleClearSearch,
}) => {
  return (
    <div className="search">
      <div className="search__container">
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
        <FontAwesomeIcon
          icon={faXmark}
          className="search__icon-xmark"
          onClick={handleClearSearch}
        />
        <DropdownFilter
          filterCats={filterCats}
          handleClearFilter={handleClearFilter}
        />
      </div>
    </div>
  );
};

export default Search;
