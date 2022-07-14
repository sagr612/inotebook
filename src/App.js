import "./App.css";
import React from "react";
import { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import About from "./Components/About";
import Home from "./Components/Home";
import NoteState from "./context/Notes/NoteState";
import Alert from "./Components/Alert";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
function App() {
  const [alert,setAlert]=useState({});

  const showalert=(message,type)=>
  {
    setAlert({
      msg:message,
      type:type
    })
    setTimeout(() => {
      setAlert({});
    }, 2000);
  }
  return (
    <>
      <NoteState>
        <Router>
          <Navbar></Navbar>
          <Alert alert={alert}></Alert>
          <div className="container">
            <Switch>
              <Route exact path="/">
                <Home showalert={showalert}></Home>
              </Route>
              <Route exact path="/about">
                <About showalert={showalert}></About>
              </Route>
              <Route exact path="/login">
                <Login showalert={showalert}></Login>
              </Route>
              <Route exact path="/signup">
                <Signup showalert={showalert}></Signup>
              </Route>
            </Switch>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
