import { useNavigate, useParams } from "react-router-dom";
import styles from "./BookDetails.module.css";
import Banner from "../../assets/HomeBanner.jpg";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import LoadingSpinner from "../shared/LoadingSpinner";
import { useForm } from "react-hook-form";
import axios from "axios";
import CustomComment from "./CustomComment";
import { allBooks } from "../../features/books/booksSlice";

const BookDetails = () => {
  const { id } = useParams();
  const { books } = useSelector((state) => state.books);
  const { user } = useSelector((state) => state.auth);
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  const [book, setBook] = useState(null);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const updateBook = () => {
    let bookFromDb = books.find((item) => item._id === id);
    setBook(bookFromDb);
  };

  const onCommentSubmit = async (commentObj) => {
    // get user name
    const username = user.username;
    const comment = {
      username,
      text: commentObj.comment,
    };

    // post comment
    let response = await axios.post(
      `http://localhost:4000/comment-api/books/${id}`,
      comment
    );
    if (response.data.message === "success") {
      reset();
      dispatch(allBooks());
    }
  };

  const formatDateTime = (date) => {
    date = new Date(date);
    const options = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return date.toLocaleDateString("en-us", options);
  };

  useEffect(() => {
    if (!user) {
      navigate("/books");
      return;
    } else {
      updateBook();
    }
  }, [books]);

  if (book === null) {
    return <LoadingSpinner />;
  }

  return (
    <div className={styles["page__container"]}>
      <div>
        <img src={Banner} alt="book" className={styles["header__image"]}></img>
        <img
          src={book.book_image}
          className={styles["poster__image"]}
          alt={book.title}
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
      <hr />
      <h4>Reviews and Comments</h4>
      <div className="container m-0 p-0">
        <div className="row">
          <div className="col-sm-12 col-lg-8">
            <ul className={styles["buy__links"]}>
              {book.comments.map((comment, index) => {
                return (
                  <CustomComment
                    key={index}
                    comment={comment.comment}
                    username={comment.commentedBy.username}
                    dateTime={formatDateTime(comment.postedOn)}
                    profileURL={comment.commentedBy.profileURL}
                  />
                );
              })}
            </ul>
          </div>
          <div className="col-sm-12 col-lg-4">
            <form>
              <textarea
                id="commnet"
                cols="50"
                rows="8"
                placeholder="Write your comment or review.."
                style={{ padding: "5px" }}
                {...register("comment", { required: true })}
              ></textarea>
            </form>
            <button
              type="submit"
              className="btn btn-secondary"
              style={{ width: "100px" }}
              onClick={handleSubmit(onCommentSubmit)}
            >
              Post
            </button>
          </div>
        </div>
      </div>
      <hr className="mb-5" />
    </div>
  );
};

export default BookDetails;
