 

// import axios from "axios";

// const API_URL = "http://localhost:5000/api/auth";

// // REGISTER
// export async function register({ username, email, password }) {
//   try {
//     const response = await axios.post(
//       `${API_URL}/register`,
//       {
//         username,
//         email,
//         password,
//       }
//     );

//     // token save
//     if (response.data.token) {
//       localStorage.setItem("token", response.data.token);
//     }

//     return response.data;
//   } catch (err) {
//     console.error(
//       "Register Error:",
//       err.response?.data || err.message
//     );
//     throw err;
//   }
// }

// // LOGIN
// export async function login({ email, password }) {
//   try {
//     const response = await axios.post(
//       `${API_URL}/login`,
//       {
//         email,
//         password,
//       }
//     );

//     // token save
//     if (response.data.token) {
//       localStorage.setItem("token", response.data.token);
//     }

//     return response.data;
//   } catch (err) {
//     console.error(
//       "Login Error:",
//       err.response?.data || err.message
//     );
//     throw err;
//   }
// }

// // GET CURRENT USER
// export async function getMe() {
//   try {
//     const token = localStorage.getItem("token");

//     const response = await axios.get(
//       `${API_URL}/get-me`,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );

//     return response.data;
//   } catch (err) {
//     console.error(
//       "GetMe Error:",
//       err.response?.data || err.message
//     );
//     throw err;
//   }
// }

// // LOGOUT
// export async function logout() {
//   try {
//     const token = localStorage.getItem("token");

//     const response = await axios.post(
//       `${API_URL}/logout`,
//       {},
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );

//     localStorage.removeItem("token");

//     return response.data;
//   } catch (err) {
//     console.error(
//       "Logout Error:",
//       err.response?.data || err.message
//     );
//     throw err;
//   }
// }


import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

// ==========================================
// Axios Instance
// ==========================================
const api = axios.create({
  baseURL: API_URL,
});

// ==========================================
// Attach token automatically
// ==========================================
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// ==========================================
// REGISTER
// ==========================================
export async function register({ username, email, password }) {
  try {
    const response = await api.post("/register", {
      username,
      email,
      password,
    });

    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }

    return response.data;
  } catch (err) {
    console.error("Register Error:", err.response?.data || err.message);
    throw err;
  }
}

// ==========================================
// LOGIN
// ==========================================
export async function login({ email, password }) {
  try {
    const response = await api.post("/login", {
      email,
      password,
    });

    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }

    return response.data;
  } catch (err) {
    console.error("Login Error:", err.response?.data || err.message);
    throw err;
  }
}

// ==========================================
// GET CURRENT USER
// ==========================================
export async function getMe() {
  try {
    const response = await api.get("/get-me");
    return response.data;
  } catch (err) {
    console.error("GetMe Error:", err.response?.data || err.message);
    throw err;
  }
}

// ==========================================
// LOGOUT
// ==========================================
export async function logout() {
  try {
    const response = await api.post("/logout");

    // only remove token if backend succeeds
    localStorage.removeItem("token");

    return response.data;
  } catch (err) {
    console.error("Logout Error:", err.response?.data || err.message);
    throw err;
  }
}