import Search from "../../components/search/Search";
import Cards from "../../components/cards/Cards";
import "./browse.scss";
import { useEffect, useRef, useState } from "react";
import { useHistory, useLocation } from "react-router";
import axios from "axios";
import ReactPaginate from "react-paginate";

const Browse = () => {
  const location = useLocation();
  const pathSearch = location.pathname.split("/")[2];
  const path = location.pathname.split("/")[2];
  const [browse, setBrowse] = useState([]);
  const [length, setLength] = useState(null);
  const [pageNumber, setPageNumber] = useState(path);
  const [pageSearch, setPageSearch] = useState(pathSearch);
  const [genresArray, setGenresArray] = useState([]);
  const history = useHistory();

  const [locationKeys, setLocationKeys] = useState([]);

  const yearRef = useRef();
  const searchRef = useRef();

  const changePage = ({ selected }) => {
    setPageNumber(selected + 1);
    history.push(`/browse-movies/${selected + 1}`);
  };

  const changePageSearch = ({ selected }) => {
    setPageSearch(selected + 1);
    history.push(`/browse-movies/${selected + 1}`);
  };

  const usersPerPage = 20;

  useEffect(() => {
    const getGenre = async () => {
      const res = await axios.get(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=f1e4f1d26bbe150de3c5a20dd724025f&language=en-US`
      );
      const genres = res.data.genres.reduce((genres, gen) => {
        const { id, name } = gen;
        genres[id] = name;
        return genres;
      }, []);
      setGenresArray(genres);
    };
    getGenre();
  }, []);

  useEffect(() => {
    const getMovieSearch = async () => {
      const res = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=f1e4f1d26bbe150de3c5a20dd724025f&language=en-US&query=${searchRef.current.value}&include_adult=false&page=${pageSearch}&year=${yearRef.current.value}`
      );
      setBrowse(res.data.results);
      setLength(res.data.total_results);
    };
    if (searchRef.current.value !== "") {
      getMovieSearch();
    }
  }, [pageSearch]);

  useEffect(() => {
    return history.listen((location) => {
      if (history.action === "PUSH") {
        setLocationKeys([location.key]);
      }

      if (history.action === "POP") {
        if (locationKeys[1] === location.key) {
          setLocationKeys(([_, ...keys]) => keys);

          // Handle forward event
          if (length < 10000) {
            setPageSearch(pageSearch + 1);
          } else {
            setPageNumber(pageNumber + 1);
          }
        } else {
          setLocationKeys((keys) => [location.key, ...keys]);

          // Handle back event
          if (length < 10000) {
            setPageSearch(pageSearch - 1);
          } else {
            setPageNumber(pageNumber - 1);
          }
        }
      }
    });
  }, [locationKeys, pageNumber, pageSearch]);

  useEffect(() => {
    const getMoviesSuggestion = async () => {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=f1e4f1d26bbe150de3c5a20dd724025f&language=en-US&page=${pageNumber}`
      );
      setBrowse(res.data.results);
      setLength(res.data.total_results);
    };
    getMoviesSuggestion();
  }, [pageNumber]);

  const displayPosts = browse.map((p, i) => {
    return <Cards key={i} genres={genresArray} movie={p} />;
  });

  const activePage = (item) => {
    console.log(item);
  };

  const pageCount = Math.ceil(length / usersPerPage);

  let nf = new Intl.NumberFormat();
  return (
    <div className="browse">
      <div className="browseWrapper">
        <Search
          setBrowse={setBrowse}
          searchRef={searchRef}
          setLength={setLength}
          pageSearch={pageSearch}
          yearRef={yearRef}
        />

        <span className="moviesLength">
          <span style={{ fontWeight: "600", fontSize: "28px" }}>
            {nf.format(length)}
          </span>{" "}
          movies found
        </span>
        <div className="pagButtons">
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            pageCount={pageCount}
            onPageChange={length < 10000 ? changePageSearch : changePage}
            containerClassName={"paginationBttns"}
            previousLinkClassName={"previousBttn"}
            nextLinkClassName={"nextBttn"}
            disabledClassName={"paginationDisabled"}
            activeClassName={"paginationActive"}
            pageLinkClassName={"pageLinkClassName"}
            pageClassName={"pageClassName"}
            onPageActive={activePage}
          />
        </div>
        <div className="cardWrapper">{displayPosts}</div>
      </div>
    </div>
  );
};

export default Browse;
