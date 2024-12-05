import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { GlobalStyle } from "./GlobalStyle";
import Detail from "./pages/Detail";
import MonDex from "./pages/MonDex";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route path="/pokemon" element={<MonDex />}></Route>
          <Route path="/digimon" element={<MonDex />}></Route>
          <Route path="/pokemon/:name" element={<Detail />} />
          <Route path="/digimon/:name" element={<Detail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
