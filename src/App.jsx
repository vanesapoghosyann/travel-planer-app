import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Destinations from "./pages/Destinations";
import Planner from "./pages/Planner";
import Favorites from "./pages/Favorites";



function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route path="/" element={<Home />} />

        <Route
          path="/destinations"
          element={<Destinations />}
        />

        <Route
          path="/planner"
          element={<Planner />}
        />

        <Route
          path="/favorites"
          element={<Favorites />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;