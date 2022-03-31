import styles from "./Books.module.css";
import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import ItemCard from "../shared/ItemCard";

const Books = () => {
  const [booksData, setBooksData] = useState([]);

  const fetchMovies = async () => {
    const res = await axios.get(
      `https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=${process.env.REACT_APP_BOOKS_API_KEY}`
    );
    const books = res.data.results.books;
    setBooksData(books);
    console.log(books);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div className={styles["page__container"]}>
      <div>
        <span className={styles["books-intro"]}>
          Books{" "}
          <span>
            <small className={styles["books-intro-tagline"]}>
              curated for you!!
            </small>
          </span>
        </span>
      </div>
      <div className={styles["books-list"]}>
        {booksData.length > 0 &&
          booksData.map((book, index) => {
            return (
              <ItemCard
                key={index}
                id={index}
                title={book.title}
                author={book.author}
                image={book.book_image}
                desc={book.description}
                publisher={book.publisher}
              ></ItemCard>
            );
          })}
      </div>
    </div>
  );
};

export default Books;
