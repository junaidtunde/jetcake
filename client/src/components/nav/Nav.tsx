import React from "react";
import { useHistory } from "react-router-dom";
import style from "./Nav.module.scss";

const Nav = () => {
  const history = useHistory();
  const user = localStorage.getItem("payld_token");

  const logout = () => {
    localStorage.clear();
    history.push("/");
  };

  return (
    <nav
      className={`${style.navbar} navbar navbar-expand-lg navbar-light fixed-top`}
    >
      <a href="/" className={`${style.navbar_brand} navbar-brand`}>
        <img
          src="/img/images/jetcake.png"
          className={`nav-icon ${style.nav_icon}`}
          alt="Jetcake logo"
        />
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className={`${style.navbar_nav} navbar-nav ml-auto`}>
          <li className="nav-item">
            {user ? (
              <button
                className={`btn btn-primary ${style.home_btn}`}
                onClick={logout}
              >
                Logout
              </button>
            ) : (
              <a href="/login" className="nav-link">
                <button className={`btn btn-primary ${style.home_btn}`}>
                  Login
                </button>
              </a>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
