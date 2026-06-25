// import { createContext, useState } from "react";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//     const [user, setUser] = useState(null);
//     const [loading, setLoading] = useState(false);

//     return (
//         <AuthContext.Provider
//             value={{ user, setUser, loading, setLoading }}
//         >
//             {children}
//         </AuthContext.Provider>
//     );
// };

import { createContext, useState, useMemo } from "react";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // start with true to avoid UI flicker on refresh
  const [loading, setLoading] = useState(true);

  const value = useMemo(
    () => ({
      user,
      setUser,
      loading,
      setLoading,
    }),
    [user, loading]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};