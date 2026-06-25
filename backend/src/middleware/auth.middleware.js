 

// import jwt from "jsonwebtoken";
// import blacklistTokenModel from "../models/blacklist.Model.js";

// export const authMiddleware = async (req, res, next) => {
//   try {
//     console.log("AUTH HEADER:", req.headers.authorization);

//     const authHeader = req.headers.authorization;

//     if (!authHeader) {
//       return res.status(401).json({
//         message: "No token provided",
//       });
//     }

//     const token = authHeader.split(" ")[1];

//     console.log("TOKEN:", token);
//     console.log("JWT_SECRET:", process.env.JWT_SECRET);

//     const isBlacklisted = await blacklistTokenModel.findOne({ token });

//     if (isBlacklisted) {
//       return res.status(401).json({
//         message: "Token expired (logout)",
//       });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     console.log("DECODED:", decoded);

//     req.user = decoded;
//     next();
//   } catch (error) {
//     console.log("JWT ERROR:", error);

//     return res.status(401).json({
//       message: "invalid token",
//       error: error.message,
//     });
//   }
// };





import jwt from "jsonwebtoken";
import blacklistTokenModel from "../models/blacklist.Model.js";

export const authMiddleware = async (
  req,
  res,
  next
) => {
  try {
    const authHeader =
      req.headers.authorization;

    if (
      !authHeader ||
      !authHeader.startsWith("Bearer ")
    ) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    const token = authHeader.split(" ")[1];

    const blacklisted =
      await blacklistTokenModel.findOne({
        token,
      });

    if (blacklisted) {
      return res.status(401).json({
        success: false,
        message: "Token has been revoked",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
      error: error.message,
    });
  }
};