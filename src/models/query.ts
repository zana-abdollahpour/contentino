import mongoose, { Schema, model } from "mongoose";

import type { Template } from "@/utils/templates";

export interface TQuery {
  template: Template;
  email: string;
  query: string;
  content?: string;
}

const QuerySchema = new Schema(
  {
    template: {
      type: Object,
      required: true,
    },
    email: {
      type: String,
      required: true,
      index: true,
    },
    query: {
      type: String,
      required: true,
    },
    content: {
      type: String,
    },
  },
  { timestamps: true },
);

const Query = mongoose.models.Query || model("Query", QuerySchema);
export default Query;
