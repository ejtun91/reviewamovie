import { Star } from "@material-ui/icons";
import { Link } from "react-router-dom";
import Cards from "../cards/Cards";
import "./latestdown.scss";

const LatestDown = ({ movies, genres }) => {
  return (
    <div className="latestDown">
      <div className="latestWrapper">
        <div className="latestTitles">
          <span className="latestTitle">Latest Movies</span>
          <Link className="link" to="/browse-movies">
            <span className="browseMovies">Browse Movies</span>
          </Link>
        </div>
        <div className="cardWrapper">
          {movies &&
            movies
              .slice(0, 8)
              .map((m) => <Cards key={m.id} genres={genres} movie={m} />)}
        </div>
      </div>
    </div>
  );
};

export default LatestDown;
