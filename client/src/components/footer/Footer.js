import "./footer.scss";
import { Link } from "react-router-dom";
import Login from "../login/Login";
import { useState } from "react";

const Footer = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className="footer">
      <div className="footerWrapper">
        <span className="footerSub">
          Made by <span className="useragrLink">Antonio K</span>, inspired by
          Yify.
        </span>
        <div className="footerList">
          <ul className="listItems">
            <li className="item footerLogo">RM.com&copy;2021</li>
            <li className="item line">-</li>
            <li className="item">Blog</li>
            <li className="item line">-</li>
            <li className="item">DMCA</li>
            <li className="item line">-</li>
            <li className="item">API</li>
            <li className="item line">-</li>
            <li className="item">RSS</li>
            <li className="item line">-</li>
            <li className="item">
              <Link className="link" to="/contact">
                Contact
              </Link>
            </li>
            <li className="item line">-</li>
            <li className="item">
              <Link className="link" to="/browse-movies">
                Browse Movies
              </Link>
            </li>
            <li className="item line">-</li>
            <li className="item">Requests</li>
            <li className="item line">-</li>
            <li onClick={handleOpen} className="item">
              <a className="link">Login</a>
            </li>
            <li className="item">RM TV</li>
            <li className="item line">-</li>
            <li className="item">Status</li>
            <li className="item line">-</li>
            <li className="item">RM Proxies</li>
          </ul>
        </div>
      </div>
      <Login handleClose={handleClose} open={open} />
    </div>
  );
};

export default Footer;
