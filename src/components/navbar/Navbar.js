import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";

function NavBar() {
  const [menuIcon, setMenuIcon] = useState(false);
  const handleMenuIcon = () => setMenuIcon(!menuIcon);
  const closeMobileMenu = () => setMenuIcon(false);
  return (
    <div>
      <div className={styles["nav__bar"]}>
        <div className={styles["nav__container"]}>
          <div>
            <Link
              className={styles["logo__text"]}
              to="/"
              onClick={closeMobileMenu}
            >
              TopPick
            </Link>
          </div>
          <div className={styles["menu__icon"]} onClick={handleMenuIcon}>
            <i
              className={menuIcon ? "fa-solid fa-times" : "fa-solid fa-bars"}
            ></i>
          </div>
          <ul
            className={`${styles["nav__menu"]} ${
              menuIcon ? styles["nav__active"] : ""
            }`}
          >
            <li className={styles["nav__item"]}>
              <Link
                to="/books"
                className={styles["nav__link"]}
                onClick={closeMobileMenu}
              >
                Books
              </Link>
            </li>
            <li className={styles["nav__item"]}>
              <Link
                to="/movies"
                className={styles["nav__link"]}
                onClick={closeMobileMenu}
              >
                Movies
              </Link>
            </li>
            <li className={styles["nav__item"]}>
              <Link
                to="/upload"
                className={styles["nav__link"]}
                onClick={closeMobileMenu}
              >
                Upload
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
