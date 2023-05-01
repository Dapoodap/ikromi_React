import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import Header from "./components/Header";
import Protected from "./components/Protected";
import Dashboard from "./pages/users/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NoTokenAccess from "./components/NoTokenAccess";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <BrowserRouter>
        {/* <Header /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={
              <NoTokenAccess>
                <Login />
              </NoTokenAccess>
            }
          />
          <Route
            path="/register"
            element={
              <NoTokenAccess>
                <Register />
              </NoTokenAccess>
            }
          />
          <Route
            path="/users/dashboard"
            element={
              <Protected>
                <Dashboard />
              </Protected>
            }
          />
        </Routes>

        <ToastContainer theme="colored" />

        <Routes>
          <Route path="/detail/:id" element={<MovieDetails />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
