import "./App.css";
import NavBar from "./components/navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import Books from "./components/books/Books";
import Movies from "./components/movies/Movies";
import BookDetails from "./components/books/BookDetails";
import SignUp from "./components/auth/SignUp";
import Login from "./components/auth/Login";
import Landing from "./components/landing/Landing";

function App() {
  return (
    <div className="App">
      <NavBar />
      {/* Routes */}
      <Routes>
        <Route path="/" element={<Landing />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/books" element={<Books />}></Route>
        <Route path="/books/:id" element={<BookDetails />}></Route>
        <Route path="/movies" element={<Movies />}></Route>
        <Route path="/sign-up" element={<SignUp />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </div>
  );
}

export default App;
