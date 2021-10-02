import { ChatBubble, Star } from "@material-ui/icons";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import ShowMoreText from "react-show-more-text";
import Login from "../login/Login";
import Register from "../register/Register";
import parse from "html-react-parser";
import "./comments.scss";
import { Context } from "../../context/Context";
import { useLocation } from "react-router";
import { v4 as uuidv4 } from "uuid";

const Comments = ({ movieDetails, path }) => {
  const [reviews, setReviews] = useState([]);
  const [isReadMore, setIsReadMore] = useState([]);
  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState(false);
  const [openReg, setOpenReg] = useState(false);
  const { user } = useContext(Context);
  const [desc, setDesc] = useState("");
  const [comments, setComments] = useState([]);
  const PF = "http://localhost:5000/images/";
  const { search } = useLocation();
  // const id = comments[0].movieId;

  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });

  const toggleReadMore = (index) => {
    setIsReadMore(!isReadMore);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenReg = () => {
    setOpenReg(true);
  };

  const handleCloseReg = () => {
    setOpenReg(false);
  };

  useEffect(() => {
    const getReviews = async () => {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/${path}/reviews?api_key=f1e4f1d26bbe150de3c5a20dd724025f&language=en-US`
      );
      setReviews(res.data.results);
      setIsReadMore(true);
    };
    getReviews();
  }, [path]);

  useEffect(() => {
    const getComments = async () => {
      const res = await axiosInstance.get(`/comments` + search);
      setComments(res.data);
    };

    getComments();
  }, [path]);
  // useEffect(() => {
  //   const getReviews = async () => {
  //     const res = await axios.get(
  //       `https://imdb-api.com/API/Reviews/k_ozq6fal7/${movieDetails.imdb_id}`
  //     );
  //     setReviews(res.data.items);
  //     setIsReadMore(true);
  //   };
  //   getReviews();
  // }, [imdb_code]);

  const handleComment = async (e) => {
    e.preventDefault();
    const newComment = {
      id: uuidv4(),
      username: user.username,
      desc,
      movieId: parseInt(path),
      profileImg: user.profileImg,
      createdAt: new Date(Date.now()),
    };
    try {
      await axiosInstance.post("/comments", newComment);
      setComments([...comments, newComment]);
      setDesc("");
    } catch (error) {}
  };
  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/comments/${id}`, {
        data: { username: user.username },
      });
      setComments(comments.filter((item) => item.id !== id));
    } catch (error) {}
  };

  return (
    <div className="commentsContainer">
      <div className="commentsWrapper">
        <div className="commentAndInput">
          <div className="inputLogin">
            <div className="commentTitleContainer">
              <ChatBubble style={{ color: "#6ac045", fontSize: "29px" }} />
              <span className="commentTitle">
                {comments.length} RM Comments
              </span>
            </div>
            {comments.length === 0 && (
              <span
                className="firstComment"
                style={{
                  marginTop: ".5em",
                  width: "86%",
                  textAlign: "center",
                  color: "white",
                  marginBottom: ".5em",
                }}
              >
                Be first to make a comment
              </span>
            )}
            {user ? (
              <form className="commentForm" onSubmit={handleComment}>
                <textarea
                  type="text"
                  placeholder="Leave a comment"
                  className="inputComment"
                  onChange={(e) => setDesc(e.target.value)}
                  value={desc}
                />
                <button type="submit" className="commentInputBtn">
                  Submit
                </button>
              </form>
            ) : (
              <>
                <button
                  className="commentBtn"
                  style={{ padding: "5px 5px" }}
                  onClick={handleOpen}
                >
                  <span className="btnText">Login to leave a comment</span>
                </button>
                {/* <button className="commentBtn reg" onClick={handleOpenReg}>
                  <span className="btnText">Register</span>
                </button> */}
              </>
            )}
          </div>
          <div className="commentsSection">
            {comments
              .map((c) => (
                <div key={c._id} className="commentBubble">
                  <img
                    src={
                      c.profileImg
                        ? c.profileImg
                        : "https://sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png"
                    }
                    alt=""
                  />
                  <span className="userName">{c.username}</span>
                  <span className="dateComment">
                    {new Date(c.createdAt).toDateString()}
                  </span>
                  {user
                    ? user.username === c.username && (
                        <span
                          className="deleteComment"
                          onClick={() => handleDelete(c.id)}
                        >
                          Delete Comment
                        </span>
                      )
                    : ""}
                  <div className="commentDesc">{c.desc}</div>
                </div>
              ))
              .reverse()}
          </div>
        </div>
        <div className="reviewsSection">
          <div className="reviewTitleContainer">
            <Star style={{ color: "#6ac045", fontSize: "29px" }} />
            <span className="reviewTitle">TMDB Movie Reviews</span>
          </div>
          {reviews &&
            reviews
              .map((r, i) => (
                <div className="reviewWrapper" key={i}>
                  <div className="reviewBubble">
                    <div className="reviewUsername">
                      Reviewed by
                      <span className="reviewUser">{r.author}</span>
                      <Star style={{ color: "#6ac045", fontSize: "20px" }} />
                      <span className="reviewRate">
                        {r.author_details.rating + "/10"}
                      </span>
                    </div>
                    <div className="reviewDescContainer">
                      {/* <div className="reviewSubject">{r.subject}</div> */}
                      <div className="reviewDesc">
                        <ShowMoreText
                          lines={3}
                          more={
                            <span
                              className="readMore"
                              style={{
                                textDecoration: "inherit",
                              }}
                            >
                              Read More
                            </span>
                          }
                          less={
                            <span
                              className="readMore"
                              style={{
                                textDecoration: "inherit",
                              }}
                            >
                              Show Less
                            </span>
                          }
                          className="content-css"
                          anchorClass="my-anchor-css-class"
                          expanded={false}
                          width={380}
                          truncatedEndingComponent={"... "}
                        >
                          {parse(r.content)}
                        </ShowMoreText>
                      </div>
                    </div>
                  </div>
                </div>
              ))
              .slice(0, 3)}
          <span
            className="readMoreReviews"
            style={{ color: "white", alignSelf: "flex-end" }}
          >
            <a
              href={`https://www.imdb.com/title/${movieDetails.imdb_id}/reviews`}
              target="_link"
              className="link"
            >
              Check IMDB Reviews
            </a>
          </span>
        </div>
      </div>

      <Login handleClose={handleClose} open={open} />
      <Register handleCloseReg={handleCloseReg} openReg={openReg} />
    </div>
  );
};

export default Comments;
