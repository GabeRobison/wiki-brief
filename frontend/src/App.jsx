import React from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import WikipediaSearch from "./components/WikipediaSearch";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-indigo-900 text-white">
      <NavBar />
      <div className="container mx-auto px-4 pb-8">
        <WikipediaSearch />
      </div>
    </div>
  );
}

export default App;
