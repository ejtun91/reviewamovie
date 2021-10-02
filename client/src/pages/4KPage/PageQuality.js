import axios from "axios";
import { useEffect, useRef, useState } from "react";
import ReactPaginate from "react-paginate";
import Cards from "../../components/cards/Cards";
import Search from "../../components/search/Search";
import "./pagequality.scss";

const PageQuality = () => {
  const [quality, setQuality] = useState([]);
  const [length, setLength] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [genresArray, setGenresArray] = useState([]);

  const changePage = ({ selected }) => {
    setPageNumber(selected + 1);
  };

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

  const usersPerPage = 20;

  // useEffect(() => {
  //   const getMovies = async () => {
  //     const res = await axios.get(
  //       `https://yts.mx/api/v2/list_movies.json?quality=2160p&page=${pageNumber}`
  //     );
  //     setQuality(res.data.data.movies);
  //     setLength(res.data.data.movie_count);
  //   };
  //   getMovies();
  // }, [pageNumber]);

  const displayPosts = quality.map((p, i) => {
    return <Cards key={i} genres={genresArray} movie={p} />;
  });

  const pageCount = Math.ceil(length / usersPerPage);

  useEffect(() => {
    const getMoviesSuggestion = async () => {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=f1e4f1d26bbe150de3c5a20dd724025f&language=en-US&page=${pageNumber}`
      );
      setQuality(res.data.results);
      setLength(60);
    };
    getMoviesSuggestion();
  }, [pageNumber]);

  let nf = new Intl.NumberFormat();
  let searchRef = useRef();
  return (
    <div className="pageQuality">
      <div className="pageQualityWrapper">
        {/* <Search
          setQuality={setQuality}
          searchRef={searchRef}
          setLength={setLength}
        /> */}
        <span className="moviesLength" style={{ marginTop: "5%" }}>
          <span style={{ fontWeight: "600", fontSize: "27px" }}>
            {nf.format(length)}
          </span>
          <span style={{ color: "lightblue" }}> 2160p 4K</span> you can watch on
          your service provider
          <em>(by latest)</em>
        </span>
        <div className="pagButtons">
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName={"paginationBttns"}
            previousLinkClassName={"previousBttn"}
            nextLinkClassName={"nextBttn"}
            disabledClassName={"paginationDisabled"}
            activeClassName={"paginationActive"}
            pageLinkClassName={"pageLinkClassName"}
          />
        </div>
        <div className="cardWrapper">{displayPosts}</div>
      </div>
    </div>
  );
};

export default PageQuality;
