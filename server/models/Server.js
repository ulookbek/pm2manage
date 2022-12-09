import mongoose from 'mongoose';

const ServerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    ip: {
      type: String,
      required: true,
      unique: true,
    },
    port: {
      type: Number,
        required: true,
        default: 0,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('Server', ServerSchema);
