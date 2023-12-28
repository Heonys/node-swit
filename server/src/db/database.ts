import Mongoose, { Schema } from "mongoose";
import config from "../config.js";

export async function connectDB() {
  return Mongoose.connect(config.db.host);
}

export function useVirtualId(schema: Schema) {
  schema.virtual("id").get(function (this: any) {
    return this._id.toString();
  });
  schema.set("toJSON", { virtuals: true });
  schema.set("toObject", { virtuals: true });
}
