import { Favorite, PlayCircleOutline, Star } from "@material-ui/icons";
import { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import ModalVideo from "react-modal-video";
import "react-modal-video/scss/modal-video.scss";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

import "./singlepage.scss";
import axios from "axios";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

const SinglePage = ({ credits, cast, trailer }) => {
  const [distance, setDistance] = useState(null);
  const iconContainer = useRef();
  const [isOpen, setOpen] = useState(false);
  const [imagesArr, setImagesArr] = useState([]);
  const [movieDetails, setMovieDetails] = useState({});
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isClicked, setIsClicked] = useState(false);
  const [similar, setSimilar] = useState([]);
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const imageShort = "https://image.tmdb.org/t/p/w500/";

  const keyYT = trailer.filter((t) => t.type === "Trailer").slice(0, 1)[0];
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
    const getImages = async () => {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/${path}?api_key=f1e4f1d26bbe150de3c5a20dd724025f&language=en-US&append_to_response=images&include_image_language=en,null`
      );
      setImagesArr(res.data.images.backdrops);
    };
    getImages();
  }, [path]);

  useEffect(() => {
    const getDistance = () => {
      const result =
        iconContainer.current.getBoundingClientRect().x -
        iconContainer.current.getBoundingClientRect().x * 0.2;
      setDistance(result);
    };
    getDistance();
  }, [distance, path, movieDetails]);
  useEffect(() => {}, []);
  const imagesRefact = imagesArr.map((img) => img.file_path).slice(0, 4);
  const images = [...imagesRefact];

  useEffect(() => {
    const getSimilarMovies = async () => {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/${path}/similar?api_key=f1e4f1d26bbe150de3c5a20dd724025f&language=en-US&page=1`
      );
      setSimilar(res.data.results);
    };
    getSimilarMovies();
  }, [path]);
  return (
    <>
      <div className="singlePage">
        <div className="singlePageWrapper">
          <div className="movieInfo">
            <div className="movieRating">
              <div className="cardItemSingle">
                <div className="imgContainer">
                  <img
                    src={
                      movieDetails.poster_path &&
                      imageShort + movieDetails.poster_path
                    }
                    alt=""
                  />
                </div>
                <div className="titlesContainer">
                  <span className="movieTitle">
                    {movieDetails && movieDetails.title}
                  </span>
                  <span className="dateMovie">
                    {movieDetails.release_date &&
                      movieDetails.release_date.slice(0, 4)}
                  </span>
                  <span className="genre">
                    {movieDetails.genres &&
                      movieDetails.genres.slice(0, 3).map((item, i, arr) => (
                        <span key={i}>
                          {item.name} {i != arr.length - 1 ? "/" : ""}
                        </span>
                      ))}
                  </span>
                  <div className="likeContainer">
                    <Favorite className="icon" />
                    <span className="numOfLikes">
                      {movieDetails && movieDetails.vote_count}
                    </span>
                  </div>
                  <div className="imdbRate">
                    <img src="https://svgshare.com/i/_kM.svg" alt="" />
                    <span className="rate">
                      {movieDetails && movieDetails.vote_average}
                    </span>
                    <Star className="icon" />
                  </div>
                </div>
              </div>
            </div>
            <div className="similarMovies">
              <span className="similarTitle">Similar Movies</span>

              <div className="cardSimilarItem">
                {similar &&
                  similar
                    .map((s) => (
                      <Link
                        className="link"
                        to={`/movie/${s.id}/comments?all=${s.id}`}
                      >
                        <div className="imgContainer">
                          <img src={imageShort + s.poster_path} alt="" />
                        </div>
                      </Link>
                    ))

                    .slice(0, 4)}
              </div>
            </div>
          </div>
          <div className="movieTrailers">
            <div
              className="trailer"
              ref={iconContainer}
              onClick={() => setOpen(true)}
            >
              <div className="iconPlay">
                <PlayCircleOutline style={{ fontSize: "100px" }} />
              </div>
              <img
                src={
                  images[0]
                    ? imageShort + images[0]
                    : "https://techforluddites.com/wp-content/plugins/accelerated-mobile-pages/images/SD-default-image.png"
                }
                className="imgTrailerVideo"
                alt=""
              />
            </div>
            <img
              src={
                images[1]
                  ? imageShort + images[1]
                  : "https://techforluddites.com/wp-content/plugins/accelerated-mobile-pages/images/SD-default-image.png"
              }
              className="imgTrailer"
              alt=""
              onClick={() => setIsClicked(true)}
            />
            <img
              src={
                images[2]
                  ? imageShort + images[2]
                  : "https://techforluddites.com/wp-content/plugins/accelerated-mobile-pages/images/SD-default-image.png"
              }
              className="imgTrailer"
              alt=""
              onClick={() => setIsClicked(true)}
            />
          </div>
          <div className="movieCastContainer">
            <div className="synInfo">
              <div className="synopsisTitle">Synopsis</div>
              <div className="synopsisDesc">
                {movieDetails && movieDetails.overview}
              </div>
            </div>
            <div className="castInfo">
              <ul className="castList">
                <li className="list directorTitle">Director</li>
                {credits &&
                  credits
                    .map((c) => {
                      if (
                        c.department === "Production" &&
                        c.job === "Producer"
                      ) {
                        return (
                          <li key={c.id} className="list director">
                            <img
                              src={
                                c.profile_path
                                  ? imageShort + c.profile_path
                                  : "https://sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png"
                              }
                              alt=""
                            />
                            <span className="castName directorName">
                              {c.name}
                            </span>
                          </li>
                        );
                      }
                    })
                    .slice(0, 2)}
                <li className="listCastTitle">Cast</li>
                {cast &&
                  cast
                    .map((c) => (
                      <li key={c.id} className="list cast">
                        <img
                          src={
                            c.profile_path
                              ? imageShort + c.profile_path
                              : "https://sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png"
                          }
                          alt=""
                        />
                        <span className="castName">{c.name.slice(0, 20)}</span>{" "}
                        as
                        <span className="playerName">
                          {c.character.slice(0, 10)}
                        </span>
                      </li>
                    ))
                    .slice(0, 4)}
              </ul>
            </div>
          </div>
        </div>
        <ModalVideo
          channel="youtube"
          autoplay
          isOpen={isOpen}
          videoId={keyYT && keyYT.key}
          onClose={() => setOpen(false)}
        />
      </div>
      {isClicked && (
        <Lightbox
          mainSrc={imageShort + images[photoIndex]}
          nextSrc={imageShort + images[(photoIndex + 1) % images.length]}
          prevSrc={
            imageShort +
            images[(photoIndex + images.length - 1) % images.length]
          }
          onCloseRequest={() => setIsClicked(false)}
          onMovePrevRequest={() =>
            setPhotoIndex((photoIndex + images.length - 1) % images.length)
          }
          onMoveNextRequest={() =>
            setPhotoIndex((photoIndex + 1) % images.length)
          }
        />
      )}
    </>
  );
};

export default SinglePage;
