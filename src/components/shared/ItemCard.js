import React from "react";
import { Link } from "react-router-dom";
import styles from "./ItemCard.module.css";

const ItemCard = (props) => {
  return (
    <Link
      to={`/books/${props.id}`}
      className={`${styles["item__navigate"]} ${styles["item-card"]}`}
    >
      <img
        className={styles["poster"]}
        src={props.image}
        alt={props.title}
      ></img>
      <b className={styles["title"]}>{props.title}</b>
      <hr style={{ margin: "1px 0px" }} />
      <span>
        <small>Author:</small>{" "}
        <span className={styles["auth"]}>{props.author}</span>
      </span>
      <span>
        <small>Publisher:</small>{" "}
        <span className={styles["auth"]}>{props.publisher}</span>
      </span>
    </Link>
  );
};

export default ItemCard;
