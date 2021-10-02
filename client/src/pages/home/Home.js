import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import LatestDown from "../../components/latestDown/LatestDown";
import PopDown from "../../components/popDown/PopDown";
import UpcomingDown from "../../components/upcomingDown/UpcomingDown";
import "./home.scss";

const Home = () => {
  const pageNumber = 1;
  const [movies, setMovies] = useState([]);
  const [movieSuggest, setMovieSuggest] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [genresArray, setGenresArray] = useState([]);
  const [list, setList] = useState([]);

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
    const getMovies = async () => {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=f1e4f1d26bbe150de3c5a20dd724025f&language=en-US&page=1`
      );
      setMovies(res.data.results);
    };
    getMovies();
  }, []);

  useEffect(() => {
    const getMoviesSuggestion = async () => {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=f1e4f1d26bbe150de3c5a20dd724025f&language=en-US&page=2`
      );
      setMovieSuggest(res.data.results);
    };
    getMoviesSuggestion();
  }, []);

  useEffect(() => {
    const getMoviesUpcoming = async () => {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=f1e4f1d26bbe150de3c5a20dd724025f&language=en-US&page=2`
      );
      setUpcoming(res.data.results);
    };
    getMoviesUpcoming();
  }, []);

  //https://yts.123proxy.biz/api/v2/list_movies.json
  return (
    <div className="home">
      <Header />
      <PopDown genres={genresArray} movieSuggest={movieSuggest} />
      <LatestDown genres={genresArray} movies={movies} />
      <UpcomingDown genres={genresArray} upcoming={upcoming} />
    </div>
  );
};

export default Home;
