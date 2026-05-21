import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Cards from "../components/Cards";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:4001";

function Books() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get(`${API_BASE}/book`);
        setBooks(res.data);
      } catch (error) {
        console.error("Failed to load books:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  const genres = useMemo(() => {
    const unique = Array.from(new Set(books.map((book) => book.category)));
    return ["All", ...unique];
  }, [books]);

  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const matchesGenre = genre === "All" || book.category === genre;
      const matchesSearch = [book.name, book.author, book.title, book.description]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase());
      return matchesGenre && matchesSearch;
    });
  }, [books, genre, search]);

  return (
    <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 py-24">
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold">Book Catalog</h1>
        <p className="mt-3 max-w-2xl text-gray-600 dark:text-gray-300">
          Explore thousands of books across genres, authors, and learning styles.
          Filter by genre, search by title or author, and discover your next read.
        </p>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
        <div className="flex flex-wrap gap-2">
          {genres.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`btn btn-sm ${genre === cat ? "btn-primary" : "btn-outline"}`}
              onClick={() => setGenre(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="w-full md:w-96">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="search"
            placeholder="Search by title, author, or description"
            className="input input-bordered w-full"
          />
        </div>
      </div>

      {loading ? (
        <div className="text-center py-20 text-lg">Loading books...</div>
      ) : filteredBooks.length === 0 ? (
        <div className="text-center py-20 text-lg">No books found.</div>
      ) : (
        <div className="grid gap-4 lg:grid-cols-3 md:grid-cols-2">
          {filteredBooks.map((item) => (
            <Cards item={item} key={item._id} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Books;
