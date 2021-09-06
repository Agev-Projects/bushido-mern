import { createContext, useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import GET_USER from "../graphql/Queries/getUser";

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const { loading, error, data } = useQuery(GET_USER, {
    errorPolicy: "ignore",
  });

  useEffect(() => {
    if (data) {
      console.log(data);
      setUser(data);
    }
    if (loading) return console.log("Loading: ", loading);
    if (error) {
      setUser(null);
    }
  }, [loading, error, data]);

  return (
    <AuthContext.Provider value={{ user, loading, setUser }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
