import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./NavBar.module.css";
import { Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../features/auth/authSlice";

function NavBar() {
  const [menuIcon, setMenuIcon] = useState(false);
  const handleMenuIcon = () => setMenuIcon(!menuIcon);
  const closeMobileMenu = () => setMenuIcon(false);

  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogoutHandler = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  return (
    <div>
      <div className={styles["nav__bar"]}>
        <div className={styles["nav__container"]}>
          <div>
            <Link
              className={styles["logo__text"]}
              to="/home"
              onClick={closeMobileMenu}
            >
              <b>TopPick</b>
            </Link>
          </div>
          <div className={styles["menu__icon"]} onClick={handleMenuIcon}>
            <i
              className={menuIcon ? "fa-solid fa-times" : "fa-solid fa-bars"}
            ></i>
          </div>
          {user !== null && (
            <div className={styles["user_avatar"]}>
              <Dropdown>
                <Dropdown.Toggle variant="light" id="dropdown-basic">
                  {/* add an icon here (like a user) */}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.ItemText>Hi, {user.username}!</Dropdown.ItemText>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={onLogoutHandler}>
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          )}
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
            {user !== null ? (
              <li
                className={`${styles["nav__item"]} ${styles["avatar-dropdown"]}`}
              >
                <Dropdown>
                  <Dropdown.Toggle variant="light" id="dropdown-basic">
                    Hi, {user.username}!
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item onClick={onLogoutHandler}>
                      Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </li>
            ) : (
              <li
                className={`${styles["nav__item"]} ${
                  user !== null && styles["avatar-dropdown"]
                }`}
              >
                <Link
                  to="/login"
                  className={styles["nav__link"]}
                  onClick={closeMobileMenu}
                >
                  Join
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
