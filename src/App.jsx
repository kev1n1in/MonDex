import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { GlobalStyle } from "./GlobalStyle";
import Digimon from "./pages/Digimon";
import NotFound from "./pages/NotFound";
import Pokemon from "./pages/Pokemon";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route path="/pokemon" element={<Pokemon />}></Route>
          <Route path="/digimon" element={<Digimon />}></Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
