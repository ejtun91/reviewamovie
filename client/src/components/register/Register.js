import { Backdrop, Fade, Modal } from "@material-ui/core";
import { Lock, Mail, Person } from "@material-ui/icons";
import "./register.scss";
import axios from "axios";
import { useRef, useState } from "react";

const Register = ({ openReg, handleCloseReg }) => {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const emailRef = useRef();
  const formRef = useRef();
  const [error, setError] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      await axiosInstance.post("/auth/register", {
        username: usernameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });
      setConfirm(true);
      formRef.current.reset();
    } catch (error) {
      setError(true);
      setConfirm(false);
    }
  };

  const bodyReg = (
    <div className="modalContainerReg">
      <h2 id="simple-modal-title" className="regTitle">
        Register
      </h2>
      <form ref={formRef} className="regForm" onSubmit={handleSubmit}>
        <div className="regWrapper">
          <Person className="iconRegister user" />
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            className="inputRegister"
            ref={usernameRef}
            required
          />
          <Mail className="iconRegister mail" />
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            className="inputRegister"
            ref={emailRef}
            required
          />
          <Lock className="iconRegister" />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            className="inputRegister"
            ref={passwordRef}
            required
          />
          <button type="submit" className="regBtn">
            Register
          </button>
        </div>
        {error && (
          <span style={{ position: "absolute", bottom: "5px", color: "red" }}>
            Username under those credentials already exists.
          </span>
        )}
        {confirm && (
          <span style={{ position: "absolute", bottom: "5px", color: "green" }}>
            You are registered now, go ahead and login.
          </span>
        )}
      </form>
    </div>
  );
  return (
    <>
      <Modal
        open={openReg}
        onClose={handleCloseReg}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openReg}>{bodyReg}</Fade>
      </Modal>
    </>
  );
};

export default Register;
