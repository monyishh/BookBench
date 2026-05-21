import React from "react";
import Home from "./home/Home";
import { Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";
import About from "./components/About";
import Books from "./books/Books";
import BookDetail from "./books/BookDetail";
import { Toaster } from "react-hot-toast";
import { useAuth } from "./context/AuthProvider";

function App() {
  const [authUser, setAuthUser] = useAuth();
  console.log(authUser);
  return (
    <>
      <div className="dark:bg-slate-900 dark:text-white">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<Books />} />
          <Route path="/about" element={<About />} />
          <Route path="/books/:id" element={<BookDetail />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
        <Toaster />
      </div>
    </>
  );
}

export default App;
