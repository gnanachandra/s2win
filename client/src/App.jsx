import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Client from "./components/Client";
import Branch from "./components/Branch";
import { Toaster } from "react-hot-toast";
import RequireAuth from "./features/RequireAuth";
import Login from "./components/Login";
const App = () => {
  
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login/>}></Route>
        <Route element={<RequireAuth />}>
          <Route path="/" element={<Home />} />
          <Route path="/clients/:id" element={<Client />} />
          <Route path="/payments/:id" element={<Branch />} />
        </Route>
      </Routes>
      <Toaster position="top-right" />
    </Router>
  );
};

export default App;
