import axios from "axios";
import { useEffect, useState } from "react";
import Cards from "../../components/cards/Cards";
import "./trending.scss";

const Trending = () => {
  const [trending, setTrending] = useState([]);
  const [length, setLength] = useState(null);
  const [pageNumber, setPageNumber] = useState(0);
  const [genresArray, setGenresArray] = useState([]);

  const changePage = ({ selected }) => {
    setPageNumber(selected + 1);
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

  // useEffect(() => {
  //   const getMovies = async () => {
  //     const res = await axios.get(
  //       `https://yts.mx/api/v2/list_movies.json&sort_by=download_count&limit=15`
  //     );
  //     setTrending(res.data.data.movies);
  //   };
  //   getMovies();
  // }, []);

  useEffect(() => {
    const getMoviesSuggestion = async () => {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=f1e4f1d26bbe150de3c5a20dd724025f&language=en-US&page=1`
      );
      setTrending(res.data.results);
      setLength(20);
    };
    getMoviesSuggestion();
  }, [pageNumber]);

  return (
    <div className="trending">
      <div className="trendingWrapper">
        <span className="trendingTitle">24H Trending Movies</span>

        <div className="cardWrapper">
          {trending.map((p, i) => {
            return <Cards key={i} genres={genresArray} movie={p} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Trending;
