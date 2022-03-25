import Card from "../UI/Card";
import styles from "./CategoryCard.module.css";
import { BiCameraMovie } from "react-icons/bi";
import { FaBook } from "react-icons/fa";
import { Link } from "react-router-dom";

const CategoryCard = (props) => {
  return (
    <Link
      to={`/${props.category}`}
      style={{ textDecoration: "none", color: "#000" }}
    >
      <Card
        styles={{
          width: "90%",
          maxWidth: "45rem",
          margin: "20px auto",
          boxShadow: "3px 5px 8px rgba(0, 0, 0, 0.35)",
          borderRadius: "14px",
        }}
      >
        <div className={styles["row__container"]}>
          <div
            className={styles["movie__icon"]}
            style={{ color: `${props.isMovie ? "#E88949" : "#00B3A6"}` }}
          >
            {props.isMovie ? <BiCameraMovie /> : <FaBook />}
          </div>
          <section className={styles["summary"]}>
            <h2 style={{ fontFamily: "Ubuntu, sans-serif" }}>{props.title}</h2>
            <p>{props.desc}</p>
          </section>
        </div>
      </Card>
    </Link>
  );
};

export default CategoryCard;
