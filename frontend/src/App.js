import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import AppRoutes from "./Routes";

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Navbar />
        <AppRoutes />
      </Router>
    </ChakraProvider>
  );
}

export default App;
