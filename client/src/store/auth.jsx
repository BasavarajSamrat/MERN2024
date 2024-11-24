

// // import { createContext, useContext, useEffect, useState } from "react";

// // export const AuthContext = createContext();

// // export const AuthProvider = ({ children }) => {
// //   // const [token, setToken] = useState("");
// //   const [user ,setUser] = useState();
// //   const [token, setToken] = useState("");

 
// //   const storeTokenInLS = (serverToken) => {
// //     setToken(serverToken);
// //     return localStorage.setItem("token", serverToken);
// //   };

// //   let isLoggedIn = !!token;
// //   console.log("token", token);
// //   console.log("isLoggedin ", isLoggedIn);

// //   const LogoutUser = () => {
// //     setToken("");
// //     return localStorage.removeItem("token");
// //   };

// //   const userAuthentication = async () =>{
// //     try{
// //       const response = await fetch("http://localhost:9000/api/auth/user",{
// //         method : "GET",
// //         headers :{
// //           Authorization : `Bearer ${token}`,
// //         }
// //       });
// //       if(response.ok){
// //         const data = await response.json();
// //         console.log
// //         setUser(data);
// //       }
      
// //     } 
// //     catch(error){
// //       console.error("Error fetching user data"); 
// //     }
// //   }

// //   useEffect( ()=> {
// //     userAuthentication();

// //   },[token]);


// //   return (
// //     <AuthContext.Provider value={{ isLoggedIn, storeTokenInLS, LogoutUser,user}}>
// //       {children}
// //     </AuthContext.Provider>
// //   );
// // };

// // export const useAuth = () => {
// //   const authContextValue = useContext(AuthContext);
// //   if (!authContextValue) {
// //     throw new Error("useAuth used outside of the Provider");
// //   }
// //   return authContextValue;
// // };

import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState("");

  const storeTokenInLS = (serverToken) => {
    setToken(serverToken);
    return localStorage.setItem("token", serverToken);
  };

  let isLoggedIn = !!token;
  console.log("token", token);
  console.log("isLoggedin ", isLoggedIn);

  const LogoutUser = () => {
    setToken(""); 
    return localStorage.removeItem("token"); 

  };

  const userAuthentication = async () => {
    try {
      const response = await fetch("http://localhost:9000/api/auth/user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();

        setUser(data.userData);
      } 
      else {
        // LogoutUser(); 
        console.error("Error fetching user data")
      }
    } catch (error) {
      console.error("Error fetching user data", error);
      // LogoutUser(); 
  };

  useEffect(() => {
      userAuthentication();
  }, []); 


  
}
  return (
    <AuthContext.Provider value={{ isLoggedIn, storeTokenInLS, LogoutUser, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth used outside of the Provider");
  }
  return authContextValue;
};

