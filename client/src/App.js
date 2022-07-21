import React from "react";
import Home from "./Pages/Home";
import Chat from "./Pages/Chat";
import { Route } from "react-router-dom";
import "./App.css";
function App() {
  return (
    <div className="App">
      <Route path="/" component={Home} exact></Route>
      <Route path="/chats" component={Chat} exact></Route>
    </div>
  );
}

export default App;
