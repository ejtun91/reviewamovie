import { Add, Face } from "@material-ui/icons";
import axios from "axios";
import { useContext, useRef, useState } from "react";
import { Context } from "../../context/Context";
import "./settings.scss";
import storage from "../../firebase";
import { Button, Dialog, DialogActions, DialogTitle } from "@material-ui/core";

import { initializeApp } from "firebase/app";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

const Settings = () => {
  const { user, dispatch } = useContext(Context);
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const formAvatar = useRef();
  const [uploaded, setUploaded] = useState(false);
  const [open, setOpen] = useState(false);

  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });

  const firebaseConfig = {
    apiKey: "AIzaSyC-0SywA3E5AysUmRt9olvzRsTzj61w3IE",
    authDomain: "reviewamovie-ad325.firebaseapp.com",
    projectId: "reviewamovie-ad325",
    storageBucket: "reviewamovie-ad325.appspot.com",
    messagingSenderId: "417639526636",
    appId: "1:417639526636:web:19abf95504100cd20435c9",
    measurementId: "G-T6FSS25ZXJ",
  };

  initializeApp(firebaseConfig);
  const metadata = {
    contentType: "image/jpeg",
  };
  const storage = getStorage();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAvatar = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    const updatedUser = {
      userId: user._id,
      password,
      //    profileImg: file.img,
    };
    if (username) {
      updatedUser.username = username || user.username;
    }
    if (email) {
      updatedUser.email = email || user.email;
    }

    if (file) {
    }
    try {
      const res = await axiosInstance.put("/users/" + user._id, updatedUser);
      setSuccess(true);
      formAvatar.current.reset();
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
    } catch (error) {
      dispatch({ type: "UPDATE_FAILURE" });
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    upload([{ file: file, label: "img" }]);
  };

  const upload = (items) => {
    items.forEach((item) => {
      const fileName = new Date().getTime() + item.label + item.file.name;
      const storageRef = ref(storage, `/images/${fileName}`);
      const uploadTask = uploadBytesResumable(storageRef, item.file, metadata);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + " % done");
        },
        (err) => {
          console.log(err);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            setFile((prev) => {
              return { ...prev, [item.label]: url };
            });
            setUploaded(true);
          });
        }
      );
    });
  };

  const handleAccount = async () => {
    try {
      await axiosInstance.delete(`/users/${user._id}`, {
        data: { userId: user._id },
      });
      window.location.replace("/");
      dispatch({ type: "LOGOUT" });
    } catch (error) {
      console.log(error);
    }
  };

  const setPicture = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    try {
      const res = await axiosInstance.put("/users/" + user._id, {
        profileImg: file.img,
      });
      console.log(res.data);
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
    } catch (error) {
      dispatch({ type: "UPDATE_FAILURE" });
    }
  };

  return (
    <div className="settings">
      <span
        className="deleteAccount"
        style={{
          alignSelf: "flex-end",
          color: "crimson",
          cursor: "pointer",
          marginTop: "5em",
          marginRight: "2em",
        }}
        onClick={handleClickOpen}
      >
        Delete my account
      </span>
      <span className="settingsTitle">Edit my Profile</span>
      <div className="settingsWrapper">
        <form className="settingsForm" ref={formAvatar} onSubmit={handleAvatar}>
          <div className="editUser">
            <label htmlFor="username">Change Username:</label>
            <input
              type="text"
              className="settingsInput"
              placeholder={user.username}
              onChange={(e) => setUsername(e.target.value)}
              id="username"
              name="username"
            />
            <label htmlFor="email">Change Email:</label>
            <input
              type="email"
              className="settingsInput"
              placeholder={user.email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
            />
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              className="settingsInput"
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              required
            />
          </div>

          <button type="submit" className="settingsBtn">
            Update Bio Info
          </button>
        </form>
        {success && (
          <span
            className="sucess"
            style={{
              marginTop: "2em",
              color: "green",
              width: "100%",
              textAlign: "center",
            }}
          >
            Profile has been updated
          </span>
        )}
        <hr
          style={{ width: "100%", border: "1px solid gray", marginTop: "20px" }}
        />

        <form className="setPicture" onSubmit={setPicture}>
          <div className="settingsFormAvatar">
            <label htmlFor="addImageInput" className="inputSettingsAdd">
              {/* <Face className="iconSettings" />
              <Add className="addImg" /> */}
            </label>

            <input
              type="file"
              id="addImageInput"
              style={{
                alignSelf: "center",
                marginBottom: "15px",
                color: "white",
              }}
              name="file"
              onChange={(e) => setFile(e.target.files[0])}
            />

            <img
              className="settingsImg"
              style={{ alignSelf: "center" }}
              src={
                user.profileImg
                  ? user.profileImg
                  : "https://sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png"
              }
              alt=""
            />
            {file && (
              <button
                type="submit"
                onClick={handleUpload}
                style={{
                  marginTop: "30px",
                  alignSelf: "center",
                  width: "55%",
                  marginBottom: "2em",
                  backgroundColor: "#44a6c6",
                }}
                className="settingsPicBtn"
              >
                Upload profile Image
              </button>
            )}
            {uploaded && (
              <span
                className="sucess"
                style={{
                  color: "green",
                  width: "100%",
                  textAlign: "center",
                }}
              >
                Picture Updated
              </span>
            )}
          </div>
          <button className="settingsPicBtn" type="submit">
            Submit
          </button>
        </form>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure you want to delete your account?
        </DialogTitle>

        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={handleAccount}>Yes</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Settings;
