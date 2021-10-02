import { Equalizer, ListAlt, Person, SearchOutlined } from "@material-ui/icons";
import { useContext, useEffect, useRef, useState } from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";
import axios from "axios";
import Login from "../login/Login";
import Register from "../register/Register";
import { Context } from "../../context/Context";
import { useMediaQuery } from "@material-ui/core";
import { useClickAway } from "react-use";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [openReg, setOpenReg] = useState(false);
  const [search, setSearch] = useState("");
  const [listSearch, setListSearch] = useState([]);
  const imageShort = "https://image.tmdb.org/t/p/w300/";
  const { user, dispatch } = useContext(Context);
  const [showDiv, setShowDiv] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const PF = "http://localhost:5000/images/";
  const matches = useMediaQuery("(min-width:768px)");
  const slideContainerRef = useRef();
  const [distance, setDistance] = useState("");

  const divRef = useRef();
  const searchRef = useRef();

  const handleOpen = () => {
    setOpen(true);
  };

  // useEffect(() => {
  //   const getDistance = () => {
  //     const result =
  //       slideContainerRef.current.getBoundingClientRect().x -
  //       slideContainerRef.current.getBoundingClientRect().x;

  //     setDistance(result);
  //   };
  //   getDistance();
  // }, [distance]);

  // console.log(distance);

  useClickAway(
    slideContainerRef,
    () => (slideContainerRef.current.style.display = "none")
  );

  useClickAway(divRef, () => {
    divRef.current.style.display = "none";
    setShowDiv(!showDiv);
  });

  useClickAway(searchRef, () => {
    searchRef.current.style.display = "none";
    setShowSearchBar(!showSearchBar);
  });

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenReg = () => {
    setOpenReg(true);
  };

  const handleCloseReg = () => {
    setOpenReg(false);
  };

  const handleClick = () => {
    slideContainerRef.current.display = "none";
    setSearch("");
  };

  useEffect(() => {
    const getList = async () => {
      const res = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=f1e4f1d26bbe150de3c5a20dd724025f&language=en-US&query=${search}&include_adult=false}`
      );
      setListSearch(res.data.results);
    };
    if (search !== "") {
      getList();
      const element = document.querySelector(".slideSearchContainer");
      element.style.display = "block";
    }
    if (search === "") {
      const element = document.querySelector(".slideSearchContainer");
      element.style.display = "none";
    }
  }, [search]);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <div className="navbar">
      <div className="navbarWrapper">
        <Link
          className="link"
          style={{ display: "flex", alignItems: "center" }}
          to="/"
        >
          <div className="logo">
            <span className="logoTitle">RM.</span>

            <span className="logoSub">com</span>
            <span className="logoSubDesc">
              Thousands of movies with reviews.
            </span>
          </div>
        </Link>
        <div className="menuSearchContainer">
          <div className="searchWrapper">
            <input
              type="text"
              className="searchInput"
              placeholder="Quick Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="slideSearchContainer" ref={slideContainerRef}>
              <ul className="slideList">
                {listSearch &&
                  listSearch.slice(0, 5).map((l, i) => (
                    <Link
                      className="link"
                      onClick={handleClick}
                      to={`/movie/${l.id}`}
                    >
                      <li key={i} className="itemSlide">
                        <img src={imageShort + l.poster_path} alt="" />
                        <div className="slideDetails">
                          <span className="titleSlide">{l.title}</span>
                          <span className="dateSlide">{l.release_date}</span>
                        </div>
                      </li>
                    </Link>
                  ))}
              </ul>
            </div>
            <SearchOutlined className="searchIcon" />
            {showSearchBar && (
              <input
                type="text"
                className="mobile"
                placeholder="Quick Search"
                value={search}
                ref={searchRef}
                onChange={(e) => setSearch(e.target.value)}
              />
            )}
            <SearchOutlined
              onClick={() => setShowSearchBar(!showSearchBar)}
              className="iconSearch"
              style={{ display: "none" }}
            />
          </div>
          <div className="listItems" style={{ marginRight: "15%" }}>
            <ul className="itemsWrap">
              <li className="item">
                <Link className="link" to="/">
                  <span className="textLink">Home</span>
                </Link>
              </li>
              <li className="item">
                <Link className="link" to="/browse-movies/2160p">
                  <span className="textLink quality">4K</span>
                </Link>
              </li>
              <li className="item">
                <Link className="link" to="/trending">
                  <span className="textLink">Trending</span>
                  <Equalizer className="iconLink" style={{ display: "none" }} />
                </Link>
              </li>
              <li className="item">
                <Link className="link" to="/browse-movies/1">
                  <span className="textLink">Browse Movies</span>
                  <ListAlt className="iconLink" style={{ display: "none" }} />
                </Link>
              </li>
            </ul>
            {user && (
              <>
                {matches && (
                  <Link className="link" to={"/settings"}>
                    <span className="profileUser">
                      <img
                        src={
                          user.profileImg
                            ? user.profileImg
                            : "https://sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png"
                        }
                        alt=""
                      />
                    </span>
                  </Link>
                )}
                {!matches && (
                  <span
                    onClick={() => setShowDiv(!showDiv)}
                    className="profileUser"
                  >
                    <img
                      src={
                        user.profileImg
                          ? user.profileImg
                          : "https://sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png"
                      }
                      alt=""
                    />
                  </span>
                )}
              </>
            )}

            <ul className="loginRegItems">
              {!user ? (
                <div className="logReg">
                  <li
                    className="itemAuth person"
                    onClick={() => setShowDiv(!showDiv)}
                    style={{
                      display: "none",
                      marginLeft: "40%",
                      border: "none",
                    }}
                  >
                    <Person />
                  </li>
                  {showDiv && (
                    <div className="lore" ref={divRef}>
                      <li onClick={handleOpen} className="itemAuth">
                        Login
                      </li>
                      <li onClick={handleOpenReg} className="itemAuth">
                        Register
                      </li>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  {showDiv && (
                    <div className="loreLogout" ref={divRef}>
                      <li onClick={handleLogout} className="itemAuth">
                        Logout
                      </li>
                      <Link
                        setShowDiv={setShowDiv}
                        className="link"
                        to={"/settings"}
                      >
                        <li className="itemAuth">Settings</li>
                      </Link>
                    </div>
                  )}
                </>
              )}
            </ul>
            <ul className="loginRegItems desktopLog">
              {!user ? (
                <div className="logReg">
                  <div
                    className="lore"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <li onClick={handleOpen} className="itemAuth">
                      Login
                    </li>
                    <li onClick={handleOpenReg} className="itemAuth">
                      Register
                    </li>
                  </div>
                </div>
              ) : (
                <div
                  className="loreLogout"
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <li
                    onClick={handleLogout}
                    className="itemAuth"
                    style={{ border: "none" }}
                  >
                    Logout
                  </li>
                </div>
              )}
            </ul>
          </div>
        </div>
      </div>

      <Login handleClose={handleClose} open={open} />
      <Register handleCloseReg={handleCloseReg} openReg={openReg} />
    </div>
  );
};

export default Navbar;
