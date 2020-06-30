import React, { useEffect } from "react";
import "./App.css";

import { Switch, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Loading from "./components/Loading";
import MessageBox from "./components/MessageBox";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import { useDispatch, useSelector } from "react-redux";
import { selectAppLoading } from "./store/appState/selectors";
import { getUserWithStoredToken } from "./store/user/actions";
import { Jumbotron } from "react-bootstrap";
import { useQuery } from "@apollo/react-hooks";
import { CHECK_TOKEN } from "./store/user/gql";

const Home = () => (
  <Jumbotron>
    <h1>Home</h1>
  </Jumbotron>
);
const Other = () => (
  <Jumbotron>
    <h1>Other</h1>
  </Jumbotron>
);

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectAppLoading);

  const token = localStorage.getItem("token");
  const { loading, error, data } = useQuery(CHECK_TOKEN, { skip: !token });

  useEffect(() => {
    if (!loading) dispatch(getUserWithStoredToken(data, error));
  }, [dispatch, loading, data, error]);

  return (
    <div className="App">
      <Navigation />
      <MessageBox />
      {isLoading ? <Loading /> : null}
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/other" component={Other} />
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={Login} />
      </Switch>
    </div>
  );
}

export default App;
