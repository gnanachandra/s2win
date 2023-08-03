import mongoose from "mongoose";
const PaymentSchema = new mongoose.Schema({
  branch: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Branch",
    required: [true, "Branch details cannot be empty"],
  },
  client: {
    type: mongoose.SchemaTypes.ObjectId,
    ref : "Client",
    required: [true, "Client details cannot be empty"],
  },
  amount: {
    type: Number,
    required: [true, "Amount cannot be empty"],
  },
  mode: {
    type: String,
    required: [true, "Mode of payment cannot be empty"],
  },
  date: {
    type: Date,
    required: [true, "Date of payment cannot be empty"],
  },
},{
    timestamps : true,
    toJSON : {
        virtuals : true,
    },
    toObject : {
        virtuals : true,
    }
});

export default mongoose.model("Payment",PaymentSchema);