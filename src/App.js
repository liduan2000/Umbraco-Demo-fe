// import logo from './logo.svg';
import './App.css';
import Home from "./pages/Home";
import Subject from "./pages/Subject";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="subject/:id" element={<Subject />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;