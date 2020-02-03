import React from "react";
import style from "./Footer.module.scss";

const Footer = () => {
  return (
    <nav className={`${style.navbar} navbar navbar-expand-lg navbar-light`}>
      <a href="/" className={`${style.navbar_brand} navbar-brand`}>
        <img
          src="/img/images/jetcake.png"
          className={`nav-icon ${style.nav_icon}`}
          alt="Jetcake logo"
        />
      </a>
      <span>
        <p>&copy; copyright 2020.</p>
      </span>
    </nav>
  );
};

export default Footer;
