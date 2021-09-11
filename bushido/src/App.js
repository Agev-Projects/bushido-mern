import { Suspense } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import AuthContextProvider from "./context/Authentication";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";

//views
import HomePage from "./views/HomePage";
import List from "./views/List";
import LandingPage from "./views/LandingPage";
import LoginPage from "./views/LoginPage";
import SignPage from "./views/SignPage";
import AnimeDetails from "./views/AnimeDetails.js";
import MangaDetails from "./views/MangaDetails.js";
import Watch from "./views/Watch";

//Loading
import Loading from "./components/States/Loading";

function App() {
  return (
    <Router>
      <Suspense
        fallback={
          <div className="centered-loader">
            <Loading stroke="#EA2C59" />
          </div>
        }
      >
        <Switch>
          <AuthContextProvider>
            <PrivateRoute path="/home" component={HomePage} />
            <PrivateRoute path="/list" component={List} />
            <PrivateRoute path="/anime/:slug" component={AnimeDetails} />
            <PrivateRoute path="/manga/:slug" component={MangaDetails} />
            <PrivateRoute path="/watch/:slug" component={Watch} />
            <PublicRoute path="/login" component={LoginPage} />
            <PublicRoute path="/signup" component={SignPage} />
            <PublicRoute exact path="/" component={LandingPage} />
          </AuthContextProvider>
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
