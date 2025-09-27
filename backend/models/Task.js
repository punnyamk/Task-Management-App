import { Schema, model } from "mongoose";

const TaskSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
    },
    color: {
      type: String,
      default: "bg-gray-500",
    },
    tags: [
      {
        type: String,
      },
    ],
    date: {
      type: String,
      required: true,
    },
    repeat: {
      type: String,
      default: "Daily",
    },
    repeatDays: [
      {
        type: String,
      },
    ],
    repeatInterval: {
      type: String,
      default: "Every Week",
    },
  },
  {
    timestamps: true,
  }
);

export default model("Task", TaskSchema);
