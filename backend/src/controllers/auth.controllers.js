  
// import userModel from "../models/userModels.js";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import blacklistTokenModel from "../models/blacklist.Model.js";

// export async function registerUserController(req, res) {
//   try {
//     const { username, email, password } = req.body;

//     if (!username || !email || !password) {
//       return res.status(400).json({ message: "All fields required" });
//     }

//     const exists = await userModel.findOne({
//       $or: [{ email }, { username }],
//     });

//     if (exists) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     const hashed = await bcrypt.hash(password, 10);

//     const user = await userModel.create({
//       username,
//       email,
//       password: hashed,
//     });

//     const token = jwt.sign(
//       { id: user._id, username: user.username },
//       process.env.JWT_SECRET,
//       { expiresIn: "15m" }
//     );

//     return res.status(201).json({
//       message: "Registered successfully",
//       token,
//       user,
//     });
//   } catch (err) {
//     return res.status(500).json({ message: err.message });
//   }
// }

// export async function loginUserController(req, res) {
//   try {
//     const { email, password } = req.body;

//     const user = await userModel.findOne({ email });

//     if (!user) {
//       return res.status(400).json({ message: "User not found" });
//     }

//     const match = await bcrypt.compare(password, user.password);

//     if (!match) {
//       return res.status(400).json({ message: "Invalid password" });
//     }

//     const token = jwt.sign(
//       { id: user._id, username: user.username },
//       process.env.JWT_SECRET,
//       { expiresIn: "15m" }
//     );

//     return res.status(200).json({
//       message: "Login successful",
//       token,
//       user,
//     });
//   } catch (err) {
//     return res.status(500).json({ message: err.message });
//   }
// }

// export async function logoutUserController(req, res) {
//   try {
//     const authHeader = req.headers.authorization;

//     const token = authHeader?.split(" ")[1];

//     if (token) {
//       await blacklistTokenModel.create({ token });
//     }

//     return res.status(200).json({
//       message: "Logged out successfully",
//     });
//   } catch (err) {
//     return res.status(500).json({ message: err.message });
//   }
// }

// export async function getMeController(req, res) {
//   return res.status(200).json({
//     message: "User fetched successfully",
//     user: req.user,
//   });
// }



import userModel from "../models/userModels.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import blacklistTokenModel from "../models/blacklist.Model.js";

// ======================================================
// REGISTER
// ======================================================

export async function registerUserController(req, res) {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingUser = await userModel.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      username,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    return res.status(201).json({
      success: true,
      message: "Registration successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("REGISTER ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

// ======================================================
// LOGIN
// ======================================================

export async function loginUserController(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

// ======================================================
// LOGOUT
// ======================================================

export async function logoutUserController(req, res) {
  try {
    const authHeader = req.headers.authorization;

    const token = authHeader?.split(" ")[1];

    if (token) {
      await blacklistTokenModel.create({
        token,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    console.error("LOGOUT ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

// ======================================================
// GET CURRENT USER
// ======================================================

export async function getMeController(req, res) {
  try {
    const user = await userModel
      .findById(req.user.id)
      .select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("GET ME ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}