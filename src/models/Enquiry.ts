import mongoose from "mongoose";

const EnquirySchema = new mongoose.Schema(
  {
    name: String,
    phone: String,
    message: String,
    product: String,
  },
  { timestamps: true }
);

export default mongoose.models.Enquiry ||
  mongoose.model("Enquiry", EnquirySchema);