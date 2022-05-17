import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar.component.js";
import EditExercises from "./components/editexercises.component";
import CreateExercise from "./components/createexercise.component";
import CreateUser from "./components/createuser.component";
import ExerciseList from "./components/exerciseslist.component.js";
import PageNotFound from "./components/pagenotfound.component.js";

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Navbar />
        <br />
        <Routes>
          <Route path="/" exact element={<ExerciseList />} />
          <Route path="/edit/:id" exact element={<EditExercises />} />
          <Route path="/create" exact element={<CreateExercise />} />
          <Route path="/user" exact element={<CreateUser />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
