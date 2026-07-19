import React from "react";
import { Routes, Route } from "react-router-dom";
import Feature from "./assets/Feature";
import Scroller from "./assets/Scroller";
import Footer from "./assets/Footer";
import HeroSection from "./assets/HeroSection";
import CardScroller from "./assets/CardScoller";
import Contact from "./components/Contact";
import Courses from "./components/Courses";
import About from "./components/About";
import Register from "./Register";

function App() {
  return (
    <>
      <HeroSection />

      <Routes>
        {/* Home page — shows all homepage sections */}
        <Route
          path="/"
          element={
            <>
              <div className="bg-gray-100">
                <CardScroller />
              </div>
              <Feature />
              <Scroller />
            </>
          }
        />

        {/* Sub-pages — show only their own content */}
        <Route path="/Register" element={<Register />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Courses" element={<Courses />} />
        <Route path="/About" element={<About />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
