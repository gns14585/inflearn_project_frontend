import React from "react";
import { RouterProvider } from "react-router-dom";
import root from "./rooter/root";

function App(props) {
  return <RouterProvider router={root} />;
}

export default App;
