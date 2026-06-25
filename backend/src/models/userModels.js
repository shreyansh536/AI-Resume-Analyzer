// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//   username: {
//     type: String,
//     unique: [true, "this name is already taken"]
//   },
//   email: {
//     type: String,
//     unique: [true, "account already exists"],
//     required: true
//   },
//   password: {
//     type: String,
//     required: true
//   }
// });

// const userModel = mongoose.model("User", userSchema);

// export default userModel;








import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
 