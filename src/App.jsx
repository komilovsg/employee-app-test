import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Header from "./components/Header";
import EmployeeList from "./components/EmployeeList";
import LoadingSpinner from "./components/LoadingSpinner";
import "./styles/App.scss";

// Ленивая загрузка компонентов
const EmployeeEdit = lazy(() => import("./pages/EmployeeEdit"));
const EmployeeAdd = lazy(() => import("./pages/EmployeeAdd"));

function App() {
  return (
    <Router>
      <div className="app">
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: "#333",
              color: "#fff",
            },
            success: {
              duration: 3000,
              theme: {
                primary: "#4CAF50",
              },
            },
            error: {
              duration: 4000,
              theme: {
                primary: "#ff4b4b",
              },
            },
          }}
        />
        <Header />
        <main className="main-content">
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<EmployeeList />} />
              <Route path="/edit/:id" element={<EmployeeEdit />} />
              <Route path="/add" element={<EmployeeAdd />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </Router>
  );
}

export default App;
