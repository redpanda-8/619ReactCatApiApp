import {Routes, Route} from "react-router-dom";
import Home from "../home/Home.jsx";
import Movie from "../movie/Movie.jsx";

function App() {

  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies/:id" element={<Movie />} />
    </Routes>
  )
}

export default App