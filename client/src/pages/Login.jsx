import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import toast from "react-hot-toast";

const schema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(1, "Password is required"),
});

const Login = () => {
  const { login, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    setFocus,
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const handleKey = (e) => {
    const form = e.target.form;
    const elements = Array.from(form.elements);

    const index = elements.indexOf(e.target);

    if (e.key === "Enter" || e.key === "ArrowDown") {
      const next = elements[index + 1];

      if (next) {
        e.preventDefault();
        next.focus();
      }
    }

    if (e.key === "ArrowUp") {
      const prev = elements[index - 1];

      if (prev) {
        e.preventDefault();
        prev.focus();
      }
    }
  };

  const onSubmit = async (formData) => {
    try {
      const { data } = await API.post("/auth/login", formData);

      login(data.token);

      const profile = await API.get("/auth/profile");
      setUser(profile.data);

      toast.success("Login successful 🎉");

      const role = profile.data.role;

      if (role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }

    } catch (error) {
      console.log("LOGIN ERROR:", error.response?.data);

      let backendMessage = "";

      if (typeof error.response?.data === "string") {
        backendMessage = error.response.data;
      } else {
        backendMessage =
          error.response?.data?.message ||
          error.response?.data?.error ||
          error.response?.data?.msg;
      }

      toast.error(backendMessage || "Login failed");
    }
  };
  //Autofocus error
  const onError = (errors) => {
    const firstError = Object.keys(errors)[0];
    if (firstError) setFocus(firstError);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-slate-50 px-4">
      <div className="w-full max-w-md bg-white p-6 sm:p-10 rounded-2xl sm:rounded-3xl shadow-xl border">

        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-slate-800">
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-4 sm:space-y-5">
          <div>
            <input
              {...register("email")}
              placeholder="Email Address"
              onKeyDown={handleKey}
              className={`w-full px-4 py-3 text-sm sm:text-base rounded-xl border transition-all outline-none focus:ring-2 focus:ring-indigo-500/20 ${errors.email ? "border-red-500" : "border-gray-200"
                }`}
            />
          </div>

          <div>
            <input
              type="password"
              {...register("password")}
              placeholder="Password"
              onKeyDown={handleKey}
              className={`w-full px-4 py-3 text-sm sm:text-base rounded-xl border transition-all outline-none focus:ring-2 focus:ring-indigo-500/20 ${errors.password ? "border-red-500" : "border-gray-200"
                }`}
            />
          </div>

          <button
            type="submit"
            disabled={!isValid || isSubmitting}
            className={`w-full py-3 rounded-xl text-white font-black text-sm sm:text-base transition-all active:scale-95 ${isValid ? "bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200 cursor-pointer" : "bg-gray-300"
              }`}
          >
            {isSubmitting ? "Authenticating..." : "Login"}
          </button>
        </form>

        <p className="text-center mt-6 text-xs sm:text-sm text-slate-500">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-indigo-600 font-bold cursor-pointer hover:underline"
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;