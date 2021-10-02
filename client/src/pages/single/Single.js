import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import Comments from "../../components/comments/Comments";
import SinglePage from "../../components/singlePage/SinglePage";
import "./single.scss";

const Single = () => {
  const [movieDetails, setMovieDetails] = useState({});
  const [credits, setCredits] = useState([]);
  const [cast, setCast] = useState([]);
  const [trailer, setTrailer] = useState([]);
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const similarWord = movieDetails.original_title;

  useEffect(() => {
    const getTrailer = async () => {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/${path}?api_key=f1e4f1d26bbe150de3c5a20dd724025f&append_to_response=videos
        `
      );
      setTrailer(res.data.videos.results);
    };
    getTrailer(path);
  }, [path]);
  useEffect(() => {
    const getMovieDetails = async () => {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/${path}?api_key=f1e4f1d26bbe150de3c5a20dd724025f&language=en-US`
      );
      setMovieDetails(res.data);
    };
    getMovieDetails();
  }, [path]);

  useEffect(() => {
    const getCredits = async () => {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/${path}/credits?api_key=f1e4f1d26bbe150de3c5a20dd724025f&language=en-US`
      );
      setCredits(res.data.crew);
    };
    getCredits();
  }, [path]);

  useEffect(() => {
    const getCast = async () => {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/${path}/credits?api_key=f1e4f1d26bbe150de3c5a20dd724025f&language=en-US`
      );
      setCast(res.data.cast);
    };
    getCast();
  }, [path]);

  return (
    <div className="single">
      <div className="singleWrapper">
        <SinglePage
          similarWord={similarWord}
          credits={credits}
          cast={cast}
          trailer={trailer}
        />
        <Comments movieDetails={movieDetails} path={path} />
      </div>
    </div>
  );
};

export default Single;
