import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const Home: React.FC = () => <div>Hello world!</div>;

const App: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  </Router>
);

export default App;
