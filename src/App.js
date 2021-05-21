import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import ApplyForLoan from "./components/ApplyForLoan";
import { apiURL } from "./config";
import "./App.css";
import "antd/dist/antd.css";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "./redux/action";

function App() {
  const [authToken, setAuthToken] = useState("");
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  useEffect(() => {
    // token from localstorage
    const token = window.localStorage.getItem("token");
    if (token) {
      setAuthToken(token);
    }
  }, []);

  useEffect(() => {
    if (authToken) {
      fetch(`${apiURL}/getUserDetails`, {
        method: "GET",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${authToken}` },
      })
        .then((response) => response.json().then((body) => ({ status: response.status, body })))
        .then((res) => {
          if (res.status === 200) {
            dispatch(setUserData(res.body));
            window.localStorage.setItem("user", JSON.stringify(res.body));
          } else throw res;
        })
        .catch((err) => console.log(err));
    }
  }, [authToken]);

  return (
    <Router>
      <Switch>
        <Route path="/register">{state.name.length ? <Dashboard /> : <Register setAuthToken={setAuthToken} />}</Route>
        <Route exact path="/applyForLoan">
          {state.name.length ? <ApplyForLoan /> : <Login setAuthToken={setAuthToken} />}
        </Route>
        <Route path="/">{state.name.length ? <Dashboard /> : <Login setAuthToken={setAuthToken} />}</Route>
      </Switch>
    </Router>
  );
}

export default App;
