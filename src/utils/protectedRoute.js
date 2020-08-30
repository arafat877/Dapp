import { useWeb3React } from '@web3-react/core';
import React from "react";
import { Redirect, Route } from "react-router";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const context = useWeb3React();
  const {
    active
  } = context;

  return (
    <Route
      {...rest}
      render={props =>
        active ? (
          <Component {...props} />
        ) : (
            <Redirect
              to={{
                pathname: "/",
                state: { from: props.location }
              }}
            />
          )
      }
    />
  );
};

export default ProtectedRoute;