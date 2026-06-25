// import express from "express";
// import {
//   registerUserController,
//   loginUserController,
//   logoutUserController,
//   getMeController
// } from "../controllers/auth.controllers.js";

// import { authUser } from "../middleware/auth.middleware.js";

// const router = express.Router();

// router.post("/register", registerUserController);
// router.post("/login", loginUserController);
// router.get("/logout", logoutUserController);

// // Protected Route
// router.get("/get-me", authUser, getMeController);

// export default router;





import express from "express";
import {
  registerUserController,
  loginUserController,
  logoutUserController,
 getMeController,
} from "../controllers/auth.controllers.js";

import { authMiddleware } from "../middleware/auth.middleware.js";
 ;
const router = express.Router();

router.post("/register", registerUserController);
router.post("/login", loginUserController);
router.post("/logout", logoutUserController);

router.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "Auth router working",
  });
});
router.get("/get-me", authMiddleware, getMeController);

export default router;