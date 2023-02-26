import logo from "./logo.png";
import "./App.css";
import { ShowData } from "./showdata";
import React, { useState, useEffect } from "react";
import { useTheme, ThemeProvider, createTheme } from "@mui/material/styles";
function App() {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);

  return (
    <div className="App">
      {loading ? (
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />

          <h1 className="companyName">Sapnadip's Corporation</h1>
        </header>
      ) : (
        <div className="mainapp">
          <ThemeProvider theme={darkTheme}>
            <ShowData />
          </ThemeProvider>
        </div>
      )}
    </div>
  );
}

export default App;
/**
 * in this web app i have created my own refresh module using local time as dependency array in useEffect 
 */