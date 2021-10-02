import { Star } from "@material-ui/icons";
import Cards from "../cards/Cards";
import "./popdown.scss";

const PopDown = ({ movieSuggest, genres }) => {
  return (
    <div className="popDown">
      <div className="popdownWrapper">
        <div className="popTitle">
          <Star className="iconStar" />
          <span className="popTitleSub">Popular Movies</span>
        </div>
        <div className="cardWrapper">
          {movieSuggest &&
            movieSuggest
              .slice(0, 4)
              .map((m) => <Cards key={m.id} genres={genres} movie={m} />)}
        </div>
      </div>
    </div>
  );
};

export default PopDown;
