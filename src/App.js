import React from "react";
import "./App.css";
import Header from "./components/Header";
import Converter from "./components/Converter";
import Footer from "./components/Footer";

const App = () => {
  return (
    <>
      <div className="main-container">
        <Header />
        <Converter />
      </div>
      <Footer />
    </>
  );
};

export default App;
