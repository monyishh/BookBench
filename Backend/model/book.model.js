import mongoose from "mongoose";

const bookSchema = mongoose.Schema({
  name: { type: String, required: true },
  author: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  rating: { type: Number, default: 4.5 },
  publisher: String,
  pages: Number,
  language: String,
  isbn: String,
  releaseDate: String,
  format: String,
  buyLink: { type: String, required: true },
  featured: { type: Boolean, default: false },
});
const Book = mongoose.model("Book", bookSchema);

export default Book;