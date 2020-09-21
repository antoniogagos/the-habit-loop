import React, { useContext } from "react";
import { Route } from "react-router-dom";
import { AuthContext } from "../firebase/auth";
import HomePage from './HomePage'

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const { user } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={routeProps =>
        Boolean(user) ? (
          <RouteComponent {...routeProps}/>
        ) : (
          <HomePage/>
        )
      }
    />
  );
};

export default PrivateRoute