import styles from "./Books.module.css";
import React from "react";
import { useEffect } from "react";
import ItemCard from "../shared/ItemCard";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { allBooks, resetBooksState } from "../../features/books/booksSlice";
import LoadingSpinner from "../shared/LoadingSpinner";
import { resetAuthState } from "../../features/auth/authSlice";

const Books = () => {
  const authState = useSelector((state) => state.auth);

  const booksState = useSelector((state) => state.books);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const fetchBooks = async () => {
    dispatch(allBooks());
  };

  useEffect(() => {
    if (!authState.user) {
      navigate("/login");
      dispatch(resetAuthState());
      return;
    } else {
      fetchBooks();
      dispatch(resetBooksState());
    }
  }, [authState.user]);

  if (booksState.isLoading) {
    return <LoadingSpinner />;
  }

  if (booksState.message === "error") {
    return (
      <div className="text-center text-primary">
        <h1>Something went wrong...</h1>
      </div>
    );
  }

  return (
    <div className={styles["page__container"]}>
      <div>
        <span className={styles["books-intro"]}>
          Top rated Books{" "}
          <span>
            <small className={styles["books-intro-tagline"]}>for you!!</small>
          </span>
        </span>
      </div>
      {booksState.isLoading && <LoadingSpinner />}
      <div className={styles["books-list"]}>
        {booksState.books.length > 0 &&
          booksState.books.map((book, index) => {
            return (
              <ItemCard key={index} id={index} db_id={book._id}></ItemCard>
            );
          })}
      </div>
    </div>
  );
};

export default Books;
