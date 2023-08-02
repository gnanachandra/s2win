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
    },
    url: {
      type: String,
      required: "Client URL is required",
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

ClientSchema.virtual("branches", {
  ref: "Branch",
  localField: "_id",
  foreignField: "client",
});
export default mongoose.model("Client", ClientSchema);