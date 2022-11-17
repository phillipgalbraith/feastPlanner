import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

const Logout = () => {
  const { push } = useHistory();

  useEffect(() => {
        localStorage.removeItem("token"); // when a token is removed, they no longer have access to the components wrapped with the PrivateRoute Component.
        localStorage.removeItem("password"); 
        localStorage.removeItem("user_id"); 
        push("/login");
  }, []);

  return <p>Logging out...</p>;
};

export default Logout;
