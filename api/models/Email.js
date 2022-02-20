import mongoose from 'mongoose';

const instance = new mongoose.Schema(
  {
    from: {
      type: String,
      required: true,
    },
    to: String,
    subject: String,
    message: String,
    read: {
      type: Boolean,
      default: false,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);


const modelName = 'Email';

export default mongoose.model(modelName, instance);
