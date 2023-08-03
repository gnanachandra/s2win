import mongoose from "mongoose";
const ClientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Client Name is required"],
    },
    contact: {
      type: String,
      required: [true, "Contact number is required"],
      unique : true
    },
    url: {
      type: String,
      required: "Client URL is required",
      unique : true
    },
    hasBranches: {
      type: String,
      required: [true, "Has branches is required field"],
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

ClientSchema.virtual("branchesCount").get(function () {
  return this.branches?.length || 0
});

ClientSchema.virtual("totalStrength").get(function () {
  return this.branches?.reduce((total, branch) => total + branch.branchStrength, 0);
});

ClientSchema.virtual("totalAmountPaid").get(function () {
  return this.branches?.reduce((total, branch) => total + branch.amountPaid || 0, 0);
});

ClientSchema.virtual("totalAmount").get(function () {
  return this.branches?.reduce((total, branch) => total + branch.amount || 0, 0);
});


ClientSchema.virtual("branches", {
  ref: "Branch",
  localField: "_id",
  foreignField: "client",
});
export default mongoose.model("Client", ClientSchema);