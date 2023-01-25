import './App.css';
import { Route, Routes } from "react-router-dom";
import React, { Suspens } from "react"; // {} zapis objektu v JavaScript, z React berem jen Suspens
import Layout from './components/Layout';
import Home from './components/Home';
import Contact from './components/Contact';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        {/* definujeme co ma routr sledovat  */}
        <Route path="/contact" element={<Contact />} />
      </Route>
    </Routes> 
  );
}

export default App;
