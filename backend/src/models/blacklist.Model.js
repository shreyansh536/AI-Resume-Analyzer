// import mongoose from "mongoose";

// const blackListTokenSchema = new mongoose.Schema(
//   {
//     token: {
//       type: String,
//       required: [true, "Token is required to be added in blacklist"],
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// const blackListTokenModel = mongoose.model(
//   "BlackListToken",
//   blackListTokenSchema
// );

// export default blackListTokenModel;






import mongoose from "mongoose";

const blacklistSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("BlacklistToken", blacklistSchema);