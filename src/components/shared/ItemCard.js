import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./ItemCard.module.css";

const ItemCard = ({ id, db_id }) => {
  // This component is only responsible for showing
  // the book in books page
  const { books } = useSelector((state) => state.books);
  return (
    <Link
      to={`/books/${db_id}`}
      className={`${styles["item__navigate"]} ${styles["item-card"]}`}
    >
      <img
        className={styles["poster"]}
        src={books[id].book_image}
        alt={books[id].title}
      ></img>
      <b className={styles["title"]}>{books[id].title}</b>
      <hr style={{ margin: "1px 0px" }} />
      <span>
        <small>Author:</small>{" "}
        <span className={styles["auth"]}>{books[id].author}</span>
      </span>
      <span>
        <small>Publisher:</small>{" "}
        <span className={styles["auth"]}>{books[id].publisher}</span>
      </span>
    </Link>
  );
};

export default ItemCard;
