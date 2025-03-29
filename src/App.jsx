import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import EmployeeList from "./components/EmployeeList";
import EmployeeEdit from "./pages/EmployeeEdit";
import EmployeeAdd from "./pages/EmployeeAdd";
import "./styles/App.scss";

const App = () => {
  return (
    <Router>
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<EmployeeList />} />
            <Route path="/edit/:id" element={<EmployeeEdit />} />
            <Route path="/add" element={<EmployeeAdd />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
