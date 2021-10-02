import "./header.scss";

const Header = () => {
  return (
    <div className="header">
      <div className="headerWrapper">
        <span className="headerTitle">
          Find your movie tonight and make a review.
        </span>
        <span className="headerSub">
          Welcome to the official RM.com website. Here you can browse and review
          movies or find your best movie to watch by reading other reviews.
        </span>
        <span className="anotherSub">
          IMPORTANT - RM.com is the movie review website only.
        </span>
      </div>
    </div>
  );
};

export default Header;
