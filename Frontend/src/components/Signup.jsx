import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:4001";

function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      name: data.name,
      email: data.email,
      password: data.password,
    };

    try {
      const res = await axios.post(`${API_BASE}/user/signup`, userInfo);
      toast.success("Signup successful. Please log in.");
      console.log(res.data);
    } catch (err) {
      const message = err?.response?.data?.message || "Signup failed.";
      toast.error(message);
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 px-4">
      <div className="w-full max-w-md p-8 bg-white dark:bg-slate-800 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">Create Account</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
              Name
            </label>
            <input
              type="text"
              placeholder="Your full name"
              className="w-full mt-2 px-3 py-2 border rounded-lg bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white"
              {...register("name", { required: true })}
            />
            {errors.name && <p className="text-sm text-red-500">Name is required</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
              Email
            </label>
            <input
              type="email"
              placeholder="Your email"
              className="w-full mt-2 px-3 py-2 border rounded-lg bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white"
              {...register("email", { required: true })}
            />
            {errors.email && <p className="text-sm text-red-500">Email is required</p>}
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
              Password
            </label>
            <input
              type="password"
              placeholder="Choose a password"
              className="w-full mt-2 px-3 py-2 border rounded-lg bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white"
              {...register("password", { required: true, minLength: 6 })}
            />
            {errors.password && (
              <p className="text-sm text-red-500">Password must be at least 6 characters</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700 transition"
          >
            Sign up
          </button>
        </form>

        <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">
          Already have an account?{' '}
          <Link to="/" className="text-blue-600 dark:text-blue-400 underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
