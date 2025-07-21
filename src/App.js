import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/notes/NoteState";
function App() {
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/about" element={<About />} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;

/*
You're wrapping <Router>, <Navbar>, <Routes>, etc. inside <NoteState>.

That means all these components (and their children like <Home /> and <About />)
can access the context data (name, class) using useContext(NoteContext).


*/

/// NoteState k andar jo v state variable hai 
// iske andar k sare components aur unke adnar k sare component availabe ho jaye