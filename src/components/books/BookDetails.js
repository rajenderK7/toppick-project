import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./BookDetails.module.css";
import Temp from "../../assets/HomeBanner.jpg";

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState({});
  const getBook = async () => {
    const { data } = await axios.get(
      `https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=${process.env.REACT_APP_BOOKS_API_KEY}`
    );

    const book = data.results.books[id];
    setBook(book);
  };
  useEffect(() => {
    getBook();
  }, []);

  return (
    <div className={styles["page__container"]}>
      <div>
        <img src={Temp} alt="book" className={styles["header__image"]}></img>
        <img
          src={`${book.book_image}`}
          className={styles["poster__image"]}
          alt={`${book.title}`}
        ></img>
      </div>
      <div className={styles["title__auth"]}>
        <h2>{book.title}</h2>
        <span>
          by
          <h3 style={{ marginLeft: "10px" }}> {book.author}</h3>
        </span>
      </div>
      <div className={styles["book__desc"]}>
        <span>
          <b>Description:</b> <h5>{book.description && book.description}</h5>
        </span>
      </div>
      <div className={styles["buy__details"]}>
        <h2>Buy links</h2>
        <ul className={styles["buy__links"]}>
          {book.buy_links &&
            book.buy_links.map((buyLink, index) => {
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
