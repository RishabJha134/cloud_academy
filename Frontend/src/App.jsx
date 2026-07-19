import React from "react";
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

      <div className="bg-gray-100">
        <CardScroller />
      </div>

      <Feature />
      <Scroller />

      <section id="courses">
        <Courses />
      </section>

      <section id="about">
        <About />
      </section>

      <section id="contact">
        <Contact />
      </section>

      <section id="register">
        <Register />
      </section>

      <Footer />
    </>
  );
}

export default App;
