 
// import { useContext, useEffect } from "react";
// import { AuthContext } from "../auth.context";
// import { login, register, logout, getMe } from "../services/auth.api";



// export const useAuth = () => {

//     const context = useContext(AuthContext)
//     const { user, setUser, loading, setLoading } = context


   
//  const handleLogin = async ({ email, password }) => {
//   console.log("handleLogin called");
//   console.log("Email:", email);
//   console.log("Password:", password);

//   setLoading(true);

//   try {
//     const data = await login({ email, password });

//     console.log("Login Response:", data);

//     setUser(data.user);
//   } catch (err) {
//     console.log("Login Error:", err.response?.data || err.message);
//   } finally {
//     setLoading(false);
//   }
// };

//     const handleRegister = async ({ username, email, password }) => {
//         setLoading(true)
//         try {
//             const data = await register({ username, email, password })
//             setUser(data.user)
//         } catch (err) {

//         } finally {
//             setLoading(false)
//         }
//     }

//     const handleLogout = async () => {
//         setLoading(true)
//         try {
//             const data = await logout()
//             setUser(null)
//         } catch (err) {

//         } finally {
//             setLoading(false)
//         }
//     }
 

//     // useEffect(() => {

//     //     const getAndSetUser = async () => {
//     //         try {

//     //             const data = await getMe()
//     //             setUser(data.user)
//     //         } catch (err) { } finally {
//     //             setLoading(false)
//     //         }
//     //     }

//     //     getAndSetUser()

//     // }, [])
//     useEffect(() => {

//     const getAndSetUser = async () => {
//         try {
//             const data = await getMe();

//             console.log("getMe response:", data);

//             setUser(data.user);
//         } catch (err) {
//             console.log(
//                 "getMe error:",
//                 err.response?.data || err.message
//             );
//         } finally {
//             setLoading(false);
//         }
//     };

//     getAndSetUser();

// }, []);

//     return { user, loading, handleRegister, handleLogin, handleLogout }
// }


import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context";
import { login, register, logout, getMe } from "../services/auth.api";

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  const { user, setUser, loading, setLoading } = context;

  // ==========================================
  // LOGIN
  // ==========================================
  const handleLogin = async ({ email, password }) => {
    setLoading(true);

    try {
      const data = await login({ email, password });
      setUser(data.user);
    } catch (err) {
      console.log("Login Error:", err.response?.data || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // REGISTER
  // ==========================================
  const handleRegister = async ({ username, email, password }) => {
    setLoading(true);

    try {
      const data = await register({ username, email, password });
      setUser(data.user);
    } catch (err) {
      console.log("Register Error:", err.response?.data || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // LOGOUT
  // ==========================================
  const handleLogout = async () => {
    setLoading(true);

    try {
      await logout();
      setUser(null);
    } catch (err) {
      console.log("Logout Error:", err.response?.data || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // AUTO LOGIN (SESSION CHECK)
  // ==========================================
  useEffect(() => {
    const getAndSetUser = async () => {
      setLoading(true);

      try {
        const data = await getMe();
        setUser(data.user || null);
      } catch (err) {
        console.log(
          "getMe error:",
          err.response?.data || err.message
        );
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    getAndSetUser();
  }, []);

  return {
    user,
    loading,
    handleRegister,
    handleLogin,
    handleLogout,
  };
};