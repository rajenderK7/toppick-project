import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { bookService } from "./booksService";

export const allBooks = createAsyncThunk(
  "books/getAllBooks",
  async (_, thunkAPI) => {
    try {
      return await bookService.getAllBooks();
    } catch (e) {
      thunkAPI.rejectWithValue(e.message);
    }
  }
);

const initialState = {
  books: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    resetBooksState: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: {
    [allBooks.pending]: (state) => {
      state.isLoading = true;
    },
    [allBooks.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.books = action.payload.books;
      state.message = action.payload.message;
    },
    [allBooks.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.payload.message || action.message;
      state.books = [];
    },
  },
});

export const { resetBooksState } = booksSlice.actions;

export default booksSlice.reducer;
