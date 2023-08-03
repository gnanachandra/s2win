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
    perStudentAmount : {
      type : Number,
      required : [true,"Per student amount is required"]
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

BranchSchema.virtual("payments",{
  ref : "Payment",
  localField : "_id",
  foreignField : "branch"
})

BranchSchema.virtual("amountPaid").get(function () {
  return this.payments?.reduce((total, payment) => total + payment.amount || 0, 0);
});

BranchSchema.virtual("amount").get(function () {
  return this.branchStrength * parseFloat(this.perStudentAmount || 0);
});


export default mongoose.model("Branch", BranchSchema);

