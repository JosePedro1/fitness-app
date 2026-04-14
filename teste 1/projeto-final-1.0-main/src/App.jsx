import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import AppRoutes from "./Routes/AppRoutes";

function App() {
  return (
    <div className="w-full min-h-screen h-auto bg-[#171717]">
      <Router>
        <Navbar />
        <AppRoutes />
      </Router>
    </div>
  );
}

export default App;
