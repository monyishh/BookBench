import React from "react";

function About() {
  return (
    <div className="min-h-screen py-16 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-4">About BookBench</h1>
        <p className="mb-4">
          BookBench is a book-discovery website that helps users explore a
          wide variety of books across genres and topics. Browse curated
          collections, search by title or author, and open detailed pages to
          learn more about each book.
        </p>
        <p className="mb-4">
          Use BookBench to discover new reads, save favorites, and find the
          right book to dive into next. Click on any book to view its details
          and follow the provided links to read or purchase.
        </p>
        <p>
          Ready to explore? Visit the <a href="/books" className="text-blue-600 underline">Books</a> page to get
          started.
        </p>
      </div>
    </div>
  );
}

export default About;
