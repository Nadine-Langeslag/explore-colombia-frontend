import "./App.css";

import { Routes, Route } from "react-router-dom";
import { useAuth } from "./contexts/useAuth.js";

import Header from "./components/Header/Header.jsx";
import Main from "./components/Main/Main.jsx";
import About from "./components/About/About.jsx";
import Footer from "./components/Footer/Footer.jsx";
import DestinationPage from "./components/DestinationPage/DestinationPage.jsx";
import PlacePage from "./components/PlacePage/PlacePage.jsx";
import Signup from "./components/Signup/Signup.jsx";
import Signin from "./components/Signin/Signin.jsx";
import Saved from "./components/Saved/Saved.jsx";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute.jsx";
import { PublicRoute } from "./components/ProtectedRoute/PublicRoute.jsx";

function App() {
  const { register, login } = useAuth();
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
        <Route
          path="/destinations/:destinationId/places/:placeId"
          element={<PlacePage />}
        />

        <Route element={<PublicRoute />}>
          <Route path="/signup" element={<Signup onSignup={register} />} />
          <Route path="/signin" element={<Signin onSignin={login} />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/saved" element={<Saved />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
