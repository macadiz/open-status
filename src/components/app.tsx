import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainPage } from "./pages/main";
import { DetailsPage } from "./pages/details";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/details" element={<DetailsPage />} />
      </Routes>
    </BrowserRouter>
  );
};
