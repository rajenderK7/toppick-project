import React from "react";
import styles from "./ItemCard.module.css";

const ItemCard = (props) => {
  return (
    <div className={styles["item-card"]}>
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
      {/* <small className={styles["desc"]}>{props.desc}</small> */}
    </div>
  );
};

export default ItemCard;
