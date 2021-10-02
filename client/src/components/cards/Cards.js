import { Star } from "@material-ui/icons";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./cards.scss";

const Cards = ({ movie, genres }) => {
  const baseImgUrl = "https://image.tmdb.org/t/p/w500";

  return (
    <Link className="link" to={`/movie/${movie.id}/comments?all=${movie.id}`}>
      <div className="cardItem">
        <div className="imgContainer">
          <div className="movieInfo">
            <Star className="icon" />
            <span className="ratingText">
              {movie && movie.vote_average + " / 10"}
            </span>
            <span className="genre">
              {movie &&
                movie.genre_ids.map((id) => genres[id] + "\n").slice(0, 2)}
            </span>
            <button className="btnViewDet">View Details</button>
          </div>
          <img src={movie && baseImgUrl + movie.poster_path} alt="" />
        </div>
        <span className="movieTitle">{movie && movie.title}</span>
        <span className="yearDate">
          {movie.release_date && movie.release_date.substr(0, 4)}
        </span>
      </div>
    </Link>
  );
};

export default Cards;
