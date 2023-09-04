import mongoose from "mongoose";
const ClientSchema = new mongoose.Schema(
  {
    clientId: {
      type: Number,
      required: [true, "Client Id is required"],
    },
    name: {
      type: String,
      required: [true, "Client Name is required"],
    },
    contact: {
      type: String,
      required: [true, "Contact number is required"],
      unique: true,
    },
    url: {
      type: String,
      required: "Client URL is required",
      unique: true,
    },
    loginId: {
      type: String,
      required: [true, "Login ID of client is required"],
    },
    password: {
      type: String,
      required: [true, "Password of client is required"],
    },
    hasBranches: {
      type: String,
      required: [true, "Has branches is required field"],
    },
    paymentType: {
      type: String,
      required: [true, "Payment Type is required"],
    },
    amount: {
      type: Number,
      required: [true, "Amount is required"],
    },
    studentsCount: {
      type: Number,
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
  return this.branches?.length || 0;
});

ClientSchema.virtual("totalStrength").get(function () {
  return this.branches?.reduce(
    (total, branch) => total + branch.branchStrength,
    this.studentsCount || 0
  );
});

ClientSchema.virtual("totalAmount").get(function () {
  return this.paymentType === "perStudent"
    ? this.amount * this.totalStrength
    : this.amount * this.branchesCount;
});

ClientSchema.virtual("totalAmountPaid").get(function () {
  return this.payments?.reduce(
    (total, payment) => total + payment.amount || 0,
    0
  );
});

ClientSchema.virtual("branches", {
  ref: "Branch",
  localField: "_id",
  foreignField: "client",
});

ClientSchema.virtual("payments", {
  ref: "Payment",
  localField: "_id",
  foreignField: "client",
});

export default mongoose.model("Client", ClientSchema);
