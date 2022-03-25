import "./App.css";
import NavBar from "./components/navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import Books from "./components/books/Books";
import Movies from "./components/movies/Movies";

function App() {
  return (
    <div className="App">
      <NavBar />
      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/books" element={<Books />}></Route>
        <Route path="/movies" element={<Movies />}></Route>
      </Routes>
    </div>
  );
}

export default App;
