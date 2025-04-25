import React, { useEffect, useState } from "react";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // useEffect(() => {
  //   setIsAuthenticated(JSON.parse(localStorage.getItem("is_authenticated")));
  // })

  return (
    <div className="App">
      <div className="AppGlass">
        {isAuthenticated ? (
          <Dashboard />
        ): (
          <Login />
        )}
      </div>
    </div>
  );
};

export default App;