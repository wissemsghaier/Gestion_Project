// import React, { createContext, useContext, useState  ,useEffect } from 'react';




// const AuthContext = createContext();


//  export const AuthProvider = ({children }) => {
//     const [token , setToken ]= useState(null );
//     const [userData , setUserData] = useState(null);
//     const [isAuthenticated , setIsAuthenticated] = useState(false);
//     const storedData = JSON.parse(localStorage.getItem('user_data'));
    

//     useEffect(()=>{
      
//         if(storedData){
//           const { userToken, user } = storedData;
//         setToken(userToken);
//         setUserData(user);
//         setIsAuthenticated(true);
//     }

//     },[])

//   const login= (newTocken, newData) =>{
//     localStorage.setItem('user_data',
//                          JSON.stringify({userTocken: newTocken, user: newData }),);
//     setToken(newTocken);
//     setUserData(newData);
//     setIsAuthenticated(true);
//   };
//   const logout = () =>{
//     localStorage.removeItem ('user_data');
//     setToken(null);
//     setUserData(null);
//     setIsAuthenticated(false);
//   }
//   return (
//     <div>
//         <AuthContext.Provider value={(token, isAuthenticated, login, logout, userData) }>
//     {children}
//   </AuthContext.Provider>
//     </div>
  
//   );
// };


// export const  useAuth = () => useContext(AuthContext);




// import React, { createContext, useContext, useState, useEffect } from 'react';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [token, setToken] = useState(null);
//   const [userData, setUserData] = useState(null);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const storedData = JSON.parse(localStorage.getItem('user_data'));

//   useEffect(() => {
//     if (storedData) {
//       const { userToken, user } = storedData;
//       setToken(userToken);
//       setUserData(user);
//       setIsAuthenticated(true);
//     }
//   }, []);

//   const login = (newToken, newData) => {
//     localStorage.setItem('user_data', JSON.stringify({ userToken: newToken, user: newData }));
//     setToken(newToken);
//     setUserData(newData);
//     setIsAuthenticated(true);
//   };

//   const logout = () => {
//     localStorage.removeItem('user_data');
//     setToken(null);
//     setUserData(null);
//     setIsAuthenticated(false);
//   };

//   return (
//     <AuthContext.Provider value={{ token, isAuthenticated, login, logout, userData }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);















// // AuthContext.jsx
// import React, { createContext, useContext, useState, useEffect } from 'react';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [token, setToken] = useState(null);
//   const [userData, setUserData] = useState(null);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const storedData = JSON.parse(localStorage.getItem('user_data'));

//   useEffect(() => {
//     if (storedData) {
//       const { userToken, user } = storedData;
//       setToken(userToken);
//       setUserData(user);
//       setIsAuthenticated(true);
//     }
//   }, []);

//   const login = (newToken, newData) => {
//     localStorage.setItem('user_data', JSON.stringify({ userToken: newToken, user: newData }));
//     setToken(newToken);
//     setUserData(newData);
//     setIsAuthenticated(true);
//   };

//   const logout = () => {
//     localStorage.removeItem('user_data');
//     setToken(null);
//     setUserData(null);
//     setIsAuthenticated(false);
//   };



  

//   return (
//     <AuthContext.Provider value={{ token, isAuthenticated, login, logout, userData }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);















import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Vérifiez l'état d'authentification initial
    const checkAuthStatus = async () => {
      try {
        const response = await axios.get('/api/auth/status');
        if (response.data.isAuthenticated) {
          setIsAuthenticated(true);
          setUserData(response.data.user);
        } else {
          setIsAuthenticated(false);
          setUserData(null);
        }
      } catch (error) {
        console.error('Erreur lors de la vérification de l\'état d\'authentification:', error);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (credentials) => {
    try {
      const response = await axios.post('/api/auth/login', credentials);
      setIsAuthenticated(true);
      setUserData(response.data.user);
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
    }
  };

  const logout = async () => {
    try {
      await axios.post('/api/auth/logout');
      setIsAuthenticated(false);
      setUserData(null);
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
