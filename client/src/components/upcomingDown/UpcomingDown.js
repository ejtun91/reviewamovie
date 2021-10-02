import { Star } from "@material-ui/icons";
import Cards from "../cards/Cards";
import "./upcomingdown.scss";

const UpcomingDown = ({ upcoming, genres }) => {
  return (
    <div className="upcomingDown">
      <div className="upcomingDownWrapper">
        <div className="upcomingTitles">
          <span className="upcomingTitle">Upcoming Movies to Review</span>
          <span className="requestMovie">Request Movies</span>
        </div>
        <div className="cardWrapper">
          {upcoming.slice(0, 4).map((m) => (
            <Cards genres={genres} key={m.id} movie={m} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UpcomingDown;
