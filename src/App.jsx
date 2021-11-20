import "./App.css";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Home from "./components/Home/Home";
import { Component } from "react";
import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebaseConfig";

export class App extends Component {
  app = initializeApp(firebaseConfig);
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
