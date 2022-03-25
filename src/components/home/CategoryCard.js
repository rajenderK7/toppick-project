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
          boxShadow: "0 1px 2px 3px rgba(0, 0, 0, 0.25)",
          borderRadius: "14px",
        }}
      >
        <div className={styles["row__container"]}>
          <div className={styles["movie__icon"]}>
            {props.isMovie ? <BiCameraMovie /> : <FaBook />}
          </div>
          <section className={styles["summary"]}>
            <h2>{props.title}</h2>
            <p>{props.desc}</p>
          </section>
        </div>
      </Card>
    </Link>
  );
};

export default CategoryCard;
