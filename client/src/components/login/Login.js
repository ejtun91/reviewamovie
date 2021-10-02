import { Fade, Modal } from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import { Lock, Person } from "@material-ui/icons";
import axios from "axios";
import { useContext, useRef, useState } from "react";
import { Context } from "../../context/Context";
import "./login.scss";

const Login = ({ open, handleClose }) => {
  const userRef = useRef();
  const passRef = useRef();
  const { dispatch, isFetching } = useContext(Context);
  const [failure, setFailure] = useState(false);

  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axiosInstance.post("/auth/login", {
        username: userRef.current.value,
        password: passRef.current.value,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      handleClose();
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE" });
      setFailure(true);
    }
  };

  const body = (
    <div className="modalContainer">
      <h2 id="simple-modal-title" className="loginTitle">
        Login
      </h2>
      <form className="loginForm" onSubmit={handleSubmit}>
        <div className="loginWrapper">
          <Person className="iconLogin user" />
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            className="inputLogin"
            ref={userRef}
          />
          <Lock className="iconLogin" />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            className="inputLogin"
            ref={passRef}
          />
          <button type="submit" className="loginBtn">
            Login
          </button>
        </div>
        {failure && (
          <span
            style={{ position: "absolute", bottom: "5px", color: "crimson" }}
          >
            Login failed, try again.
          </span>
        )}
      </form>
    </div>
  );

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>{body}</Fade>
      </Modal>
    </>
  );
};

export default Login;
