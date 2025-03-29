import { Route, Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import EmployeeDetails from "./pages/EmployeeDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/employee/:id" element={<EmployeeDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
