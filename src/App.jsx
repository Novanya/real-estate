import React from "react";
import Header from "./components/Header";
import About from "./components/About";
import Services from "./components/Services";
import Completed from "./components/Completed";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  return (
    <div>
      <Header />
      <About />
      <Services />
      <Completed />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
