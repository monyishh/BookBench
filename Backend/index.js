import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from "cors"
import path from "path"
import { fileURLToPath } from "url"
import userRoute from "./route/user.route.js"
import bookRoute from "./route/book.route.js"
import Book from "./model/book.model.js"
import booksData from "./data/bookData.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({ path: path.resolve(__dirname, ".env") })

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Constants
const PORT = process.env.PORT || 4000
const URI = process.env.MongoDBURI

const initializeBooks = async () => {
  for (const book of booksData) {
    await Book.findOneAndUpdate(
      { title: book.title, author: book.author },
      { $set: book },
      { upsert: true }
    )
  }
  const count = await Book.countDocuments()
  console.log(`Book collection synced with sample data, ${count} items available`)
}

// Connect to MongoDB
if (!URI) {
  console.error("MongoDBURI is not defined in the .env file")
  process.exit(1) // Exit the app if the URI is not defined
}

mongoose
  .connect(URI)
  .then(async () => {
    console.log("Connected to MongoDB")
    await initializeBooks()

    // Routes
    app.use("/user", userRoute)
    app.use("/book", bookRoute)

    // Start server after DB connection
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`)
    })
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error)
    process.exit(1) // Exit the app on connection failure
  })
