import mongoose from "mongoose";
const BranchSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Branch Name is required"],
    },
    contact: {
      type: String,
      required: [true, "Contact number is required"],
    },
    loginID: {
      type: String,
      required : [true,"Branch LoginID is required"]
    },
    password: {
      type: String,
      required : [true,"Branch Password is required"]
    },
    branchStrength: {
      type: Number,
      required: [true, "Branch Strength is required field"],
    },
    client: {
      type: mongoose.SchemaTypes.ObjectId,
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
