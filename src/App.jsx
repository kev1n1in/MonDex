import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Digimon from "./pages/Digimon";
import NotFound from "./pages/NotFound";
import Pokemon from "./pages/Pokemon";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/pokemon" element={<Pokemon />}></Route>
          <Route path="/digimon" element={<Digimon />}></Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
