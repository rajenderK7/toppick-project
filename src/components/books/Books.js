import styles from "./Books.module.css";
import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import ItemCard from "../shared/ItemCard";

const Books = () => {
  const [booksData, setBooksData] = useState([]);

  const fetchMovies = async () => {
    const res = await axios.get(
      "https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=Z9LgWgjSDAtoIEwNXSy7mOWiGeuqZJrk"
    );
    const books = res.data.results.books;
    setBooksData(books);
    console.log(booksData);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div className={styles["page__container"]}>
      <div className="text-center">
        {booksData.map((book, index) => {
          return <ItemCard index={index} title={book.title}></ItemCard>;
        })}
      </div>
      <ItemCard />
    </div>
  );
};

export default Books;
