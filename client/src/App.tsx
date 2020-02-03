import React from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";

import Login from "./components/auth/login";
import Register from "./components/auth/register";
import Home from "./components/home";
import Profile from "./components/profile";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/profile" component={Profile} />
        {/* <Route exact path="/profile" component={Profile} /> */}
        <Route exact path="**" component={Home} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
