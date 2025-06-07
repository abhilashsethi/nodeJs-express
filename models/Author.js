import mongoose, { Schema, model } from "mongoose";

const AuthorSchema = new Schema({
  name: String,
  bio: String
});

const Author = model("Author", AuthorSchema);
export default Author;