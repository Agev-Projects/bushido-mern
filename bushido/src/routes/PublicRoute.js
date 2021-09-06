import { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../context/Authentication";

const PublicRoute = ({ component: Component, ...rest }) => {
  const { user, loading } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (user) {
          return (
            <Redirect
              to={{ pathname: "/home", state: { from: props.location } }}
            />
          );
        } else if (!loading) {
          return <Component />;
        }
      }}
    />
  );
};

export default PublicRoute;

// <Redirect
//               to={{ pathname: "/home", state: { from: props.location } }}
//             />
