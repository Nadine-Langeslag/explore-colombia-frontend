import "./App.css";

import { Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header.jsx";
import Main from "./components/Main/Main.jsx";
import About from "./components/About/About.jsx";
import Footer from "./components/Footer/Footer.jsx";
import DestinationPage from "./components/DestinationPage/DestinationPage.jsx";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/destinations/:destinationId"
          element={<DestinationPage />}
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
