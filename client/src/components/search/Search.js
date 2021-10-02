import axios from "axios";
import { useEffect, useRef, useState } from "react";
import "./search.scss";

const Search = ({ searchRef, setBrowse, setLength, pageNumber, yearRef }) => {
  const genreRef = useRef();
  const [genre, setGenre] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resSearch = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=f1e4f1d26bbe150de3c5a20dd724025f&region=${
          genreRef.current.value
        }&query=${
          searchRef.current.value
        }&include_adult=false&page=${pageNumber}&year=${parseInt(
          yearRef.current.value
        )}`
      );
      console.log(yearRef.current.value);
      setBrowse(resSearch.data.results);
      // setQuality(res.data.results);
      setLength(resSearch.data.total_results);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="search">
      <div className="searchWrapper">
        <form className="searchForm" onSubmit={handleSubmit}>
          <div className="searchBar">
            <span className="label searchTitle">Search Term:</span>
            <input type="text" id="searchInput" ref={searchRef} />
            <button type="submit" className="searchBtn">
              Search
            </button>
          </div>
          <div className="filters">
            <div className="optionContainer">
              <span className="label">Language:</span>
              <select
                ref={genreRef}
                onChange={(e) => setGenre(e.target.value)}
                name="genre"
                id="genre"
              >
                <option value="all">All</option>
                <option value="JP">Japanese</option>
                <option value="FR">French</option>
                <option value="IT">Italian</option>
                <option value="ES">Spanish</option>
                <option value="DE">German</option>
                <option value="KO">Korean</option>
                <option value="HI">Hindi</option>
                <option value="RU">Russian</option>
                <option value="PT">Portuguese</option>
              </select>
            </div>
            {/* <div className="optionContainer">
              <span className="label">Rating:</span>
              <select name="rating" id="rating">
                <option value="all">All</option>
                <option value="9">9+</option>
                <option value="8">8+</option>
                <option value="7">7+</option>
                <option value="6">6+</option>
                <option value="5">5+</option>
                <option value="4">4+</option>
                <option value="3">3+</option>
                <option value="2">2+</option>
                <option value="1">1+</option>
              </select>
            </div> */}

            <div className="optionContainer">
              <span className="label">Order By:</span>
              <select ref={yearRef} name="orderBy" id="orderBy">
                <option value="latest">Latest</option>
                <option value="2021">By 2021</option>
                <option value="2020">By 2020</option>
                <option value="2019">By 2019</option>
                <option value="2018">By 2018</option>
                <option value="2017">By 2017</option>
                <option value="2016">By 2016</option>
                <option value="2015">By 2015</option>
                <option value="2014">By 2014</option>
                <option value="2013">By 2013</option>
              </select>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Search;
