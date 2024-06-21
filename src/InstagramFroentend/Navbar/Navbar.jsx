import React, { useContext } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { LoginContaxt } from "../contaxt/LoginContaxt";
function Navbar({ login }) {
  const { setModalOpen } = useContext(LoginContaxt);

  const loginStatus = () => {
    const token = localStorage.getItem("jwt");
    if (login || token) {
      return [
        <>
          <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="#">
              <Link to="/Profile">
                <b>Profile</b>
              </Link>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="#">
              <Link to="/CreatePost">
                <b>Create Post</b>
              </Link>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="#">
              <Link to={""}>
                <button
                  onClick={() => {
                    setModalOpen(true);
                  }}
                  className="btn btn-outline-danger mx-3 btn-sm"
                  style={{ fontWeight: "bold" }}
                >
                  Log Out
                </button>
              </Link>
            </a>
          </li>
        </>,
      ];
    } else {
      return [
        <>
          <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="#">
              <Link to="/SingnUp">
                <b>Sign Up</b>
              </Link>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="#">
              <Link to="/Signin">
                <b>Sign In</b>
              </Link>
            </a>
          </li>
        </>,
      ];
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light  NavBar">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img
              src="https://logos-download.com/wp-content/uploads/2016/03/Instagram_Logo_2016.png"
              width="140px"
              height="40px"
            />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse " id="navbarNav">
            <ul className="navbar-nav">{loginStatus()}</ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
