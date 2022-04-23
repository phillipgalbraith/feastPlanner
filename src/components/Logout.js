import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

import axiosWithAuth from "../utils/axiosWithAuth";

const Logout = () => {
  const { push } = useHistory();

  useEffect(() => {
    axiosWithAuth()
      .post("./logout")
      .then(() => {
        localStorage.removeItem("token"); // when a token is removed, they no longer have access to the components wrapped with the PrivateRoute Component.
        push("/login");
      });
  }, []);

  return <div></div>;
};

export default Logout;
