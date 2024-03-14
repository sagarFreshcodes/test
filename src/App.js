import { Routes, Route } from "react-router-dom";
import Home from "./component/Home";
import Navbar from "./component/Navbar";
import AddEditPage from "./component/CRUD/AddEditPage";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/edit" element={<AddEditPage />} />
        <Route path="/add" element={<AddEditPage />} />
      </Routes>
    </>
  );
}

export default App;
