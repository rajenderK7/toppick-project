import axios from "axios";
const booksURL = "http://localhost:4000/books-api/";

const getAllBooks = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  let respose = await axios.get(booksURL + "all-books", {
    headers: {
      authorization: `Bearer ${user.token}`,
    },
  });

  return respose.data;
};

export const bookService = {
  getAllBooks,
};
