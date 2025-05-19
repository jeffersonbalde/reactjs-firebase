import React, { useEffect, useState } from "react";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    setIsAuthenticated(JSON.parse(localStorage.getItem("is_authenticated")));
  }, []);

  return (
    <div className="App">
      <div className="AppGlass flex justify-center items-center p-3">
        {isAuthenticated ? (
        <Dashboard setIsAuthenticated={setIsAuthenticated} />
        ) : (
          <Login setIsAuthenticated={setIsAuthenticated} />
        )}
      </div>
    </div>
  );
};

export default App;
