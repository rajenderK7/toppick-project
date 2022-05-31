import { useParams } from "react-router-dom";
import styles from "./BookDetails.module.css";
import Temp from "../../assets/HomeBanner.jpg";
import { useSelector } from "react-redux";

const BookDetails = () => {
  const { id } = useParams();
  const { books } = useSelector((state) => state.books);

  return (
    <div className={styles["page__container"]}>
      <div>
        <img src={Temp} alt="book" className={styles["header__image"]}></img>
        <img
          src={`${books[id].book_image}`}
          className={styles["poster__image"]}
          alt={`${books[id].title}`}
        ></img>
      </div>
      <div className={styles["title__auth"]}>
        <h2>{books[id].title}</h2>
        <span>
          by
          <h3 style={{ marginLeft: "10px" }}> {books[id].author}</h3>
        </span>
      </div>
      <div className={styles["book__desc"]}>
        <span>
          <b>Description:</b>{" "}
          <h5>{books[id].description && books[id].description}</h5>
        </span>
      </div>
      <div className={styles["buy__details"]}>
        <h2>Buy links</h2>
        <ul className={styles["buy__links"]}>
          {books[id].buy_links &&
            books[id].buy_links.map((buyLink, index) => {
              return (
                <li key={index}>
                  <a
                    className={styles["buy__link"]}
                    href={buyLink.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {buyLink.name}
                  </a>
                </li>
              );
            })}
        </ul>
      </div>
      <hr></hr>
    </div>
  );
};

export default BookDetails;
