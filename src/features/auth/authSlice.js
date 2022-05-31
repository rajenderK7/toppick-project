import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

// get the user if already present
const user = JSON.parse(localStorage.getItem("user"));

// register thunk
export const registerUser = createAsyncThunk(
  "auth/register",
  async (user, thunkApi) => {
    try {
      return await authService.register(user);
    } catch (e) {
      thunkApi.rejectWithValue(e.message);
    }
  }
);

// login thunk
export const loginUser = createAsyncThunk(
  "auth/login",
  async (user, thunkApi) => {
    try {
      return await authService.login(user);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkApi.rejectWithValue(message);
    }
  }
);

export const logoutUser = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
});

const initialState = {
  user: user ? user : null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuthState: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: {
    [registerUser.pending]: (state) => {
      state.isLoading = true;
    },
    [registerUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.message = action.payload.message;
    },
    [registerUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.message = action.payload.message;
      state.user = user || null;
    },
    [loginUser.pending]: (state) => {
      state.isLoading = true;
    },
    [loginUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.message = action.payload.message;
      state.user = action.payload.user || null;
    },
    [loginUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.message = action.payload;
      state.user = user || null;
    },
    [logoutUser.fulfilled]: (state) => {
      state.user = null;
    },
  },
});

export const { resetAuthState } = authSlice.actions;

export default authSlice.reducer;
