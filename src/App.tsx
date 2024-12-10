import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import RootLayout from "./Rootlayout/Rootlayout";
import Contact from "./Components/Contact";
import About from "./Components/About";
import SelectCategory from "./Pages/selectCategory";
import Alltrendyposts from "./Pages/Allnewpost";
import Details from "./Details/Details";
import EditProdil from "./User/EditProdil";
import Home from "./Home/Home";
import Profil from "./User/Profil";

const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="contact" element={<Contact />} />
            <Route path="about" element={<About />} />
            <Route path="/:categoryName" element={<SelectCategory />} />
            <Route path="profil" element={<Profil />} />
            <Route path="allnewpost" element={<Alltrendyposts />} />
            <Route path="details/:id" element={<Details />} />
            <Route path="/edit-profile" element={<EditProdil />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
