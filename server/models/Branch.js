import mongoose from "mongoose";
const BranchSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Branch Name is required"],
    },
    branchCode: {
      type: String,
      required: [true, "Branch code is required"],
      unique : true
    },
    contact: {
      type: String,
      required: [true, "Contact number is required"],
    },
    branchStrength: {
      type: Number,
      required: [true, "Branch Strength is required field"],
    },
    loginID: {
      type: String,
      required: [true, "Branch LoginID is required"],
    },
    password: {
      type: String,
      required: [true, "Branch Password is required"],
    },
    client: {
      type : mongoose.SchemaTypes.ObjectId,
      ref: "Client",
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

export default mongoose.model("Branch", BranchSchema);
