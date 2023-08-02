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
      required: [true, "Login ID is required field"],
    },
    branchStrength : {
        type : Number,
        required: [true, "Branch Strength is required field"],
    },
    password: {
      type: String,
      required: [true, "password is required field"],
    },
    client : {
        type : mongoose.SchemaTypes.ObjectId,
        ref : "Client"
    }
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

