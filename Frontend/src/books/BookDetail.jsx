import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:4001";

function BookDetail() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(`${API_BASE}/book/${id}`);
        setBook(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Unable to load book details.");
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  if (loading) {
    return <div className="text-center py-20 text-lg">Loading book details...</div>;
  }

  if (error) {
    return <div className="text-center py-20 text-lg text-red-500">{error}</div>;
  }

  if (!book) {
    return <div className="text-center py-20 text-lg">Book not found.</div>;
  }

  return (
    <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 py-24">
      <div className="mb-10">
        <Link to="/books" className="text-sm text-blue-600 hover:underline">
          ← Back to catalog
        </Link>
      </div>
      <div className="grid gap-10 lg:grid-cols-3">
        <div className="rounded-xl overflow-hidden shadow-lg bg-base-100 dark:bg-slate-900">
          <img src={book.image} alt={book.name} className="w-full h-full object-cover" />
        </div>
        <div className="lg:col-span-2 space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="badge badge-secondary">{book.category}</span>
            <span className="badge badge-outline">{book.format}</span>
            <span className="badge badge-outline">{book.language}</span>
          </div>
          <h1 className="text-4xl font-bold">{book.name}</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">by {book.author}</p>
          <div className="flex flex-wrap gap-4 items-center">
            <span className="text-2xl font-semibold">${book.price}</span>
            <span className="badge badge-info">{book.rating} ★</span>
            <span className="badge badge-outline">{book.pages} pages</span>
          </div>
          <div className="rounded-xl border p-6 bg-base-200 dark:bg-slate-800">
            <h2 className="text-2xl font-semibold mb-3">Overview</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{book.description}</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border p-6 bg-base-200 dark:bg-slate-800">
              <h3 className="text-lg font-semibold mb-2">Book Details</h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li><strong>Publisher:</strong> {book.publisher || "Unknown"}</li>
                <li><strong>ISBN:</strong> {book.isbn || "N/A"}</li>
                <li><strong>Released:</strong> {book.releaseDate || "N/A"}</li>
                <li><strong>Genre:</strong> {book.category}</li>
              </ul>
            </div>
            <div className="rounded-xl border p-6 bg-base-200 dark:bg-slate-800">
              <h3 className="text-lg font-semibold mb-2">Where to buy</h3>
              {book.buyLink ? (
                <a
                  href={book.buyLink}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-primary"
                >
                  Purchase this book
                </a>
              ) : (
                <span className="text-gray-700 dark:text-gray-300">Buy link unavailable</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookDetail;
