import React from "react";
import { Link } from "react-router-dom";

import { ROUTES } from "../../utils/routes";

import styles from "../../styles/Footer.module.css";

import LOGO from "../../images/logo.svg";

const Footer = () => {
  return (
    <section className={styles.footer}>
      <div className={styles.logo}>
        <Link to={ROUTES.HOME}>
          <img src={LOGO} alt="Stuff" />
        </Link>
      </div>

      <div className={styles.rights}>
        Developed by{" "}
        <a
          href="https://github.com/TBukhaidze"
          target="_blank"
          rel="noreferrer"
        >
          Temuri Bukhaidze
        </a>
      </div>

      <div className={styles.socials}>
        <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
          <svg className="icon">
            <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#instagram`} />
          </svg>
        </a>

        <a
          href="https://www.facebook.com/buxa.buxa.7"
          target="_blank"
          rel="noreferrer"
        >
          <svg className="icon">
            <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#facebook`} />
          </svg>
        </a>
      </div>
    </section>
  );
};

export default Footer;
