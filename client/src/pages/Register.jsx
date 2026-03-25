import { useNavigate } from "react-router-dom";
import API from "../api/axios";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import toast from "react-hot-toast";

const schema = z
  .object({
    name: z.string().min(1, "Name is required"),

    email: z.string().email("Invalid email format"),

    password: z
      .string()
      .min(8, "Minimum 8 characters required")
      .regex(/[A-Z]/, "Must include uppercase letter")
      .regex(/[a-z]/, "Must include lowercase letter")
      .regex(/\d/, "Must include a number")
      .regex(/[@$!%*?&]/, "Must include special character"),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const Register = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    setFocus,
    setError,
    watch,
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const password = watch("password", "");

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
      const { confirmPassword, ...dataToSend } = formData;
      await API.post("/auth/register", dataToSend);

      toast.success("Account created successfully 🎉");
      navigate("/login");

    } catch (error) {
      console.log("REGISTER ERROR:", error.response?.data);

      let backendMessage = "";

      if (typeof error.response?.data === "string") {
        backendMessage = error.response.data;
      } else {
        backendMessage =
          error.response?.data?.message ||
          error.response?.data?.error ||
          error.response?.data?.msg;
      }

      if (backendMessage.toLowerCase().includes("email")) {
        setError("email", {
          type: "manual",
          message: backendMessage,
        });
      }

      toast.error(backendMessage || "Registration failed");
    }
  };

  const onError = (errors) => {
    const firstError = Object.keys(errors)[0];
    if (firstError) setFocus(firstError);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-slate-50 px-4 py-8">

      {/* Responsive Card:
      - p-6 on mobile (small)
      - sm:p-10 on larger screens
      - rounded-2xl for a softer mobile look
    */}
      <div className="w-full max-w-md bg-white p-6 sm:p-10 rounded-2xl sm:rounded-3xl shadow-xl border">

        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-slate-800">
          Create Account
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit, onError)}
          className="space-y-4 sm:space-y-5"
        >
          {/* NAME */}
          <div>
            <input
              {...register("name")}
              placeholder="Full Name"
              onKeyDown={handleKey}
              className={`w-full px-4 py-3 text-sm sm:text-base rounded-xl border transition-all outline-none focus:ring-2 focus:ring-indigo-500/20 ${errors.name ? "border-red-500" : "border-gray-200"
                }`}
            />
            {errors.name && (
              <p className="text-red-500 text-[11px] sm:text-xs mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* EMAIL */}
          <div>
            <input
              {...register("email")}
              placeholder="Email"
              onKeyDown={handleKey}
              className={`w-full px-4 py-3 text-sm sm:text-base rounded-xl border transition-all outline-none focus:ring-2 focus:ring-indigo-500/20 ${errors.email ? "border-red-500" : "border-gray-200"
                }`}
            />
            {errors.email && (
              <p className="text-red-500 text-[11px] sm:text-xs mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* PASSWORD */}
          <div>
            <input
              type="password"
              {...register("password")}
              placeholder="Password"
              onKeyDown={handleKey}
              className={`w-full px-4 py-3 text-sm sm:text-base rounded-xl border transition-all outline-none focus:ring-2 focus:ring-indigo-500/20 ${errors.password ? "border-red-500" : "border-gray-200"
                }`}
            />

            {/* PASSWORD STRENGTH - Grid layout for mobile efficiency */}
            <div className="grid grid-cols-2 gap-1 text-[10px] sm:text-xs mt-3 text-gray-400 font-medium">
              <p className={password.length >= 8 ? "text-green-500" : ""}>• 8+ chars</p>
              <p className={/[A-Z]/.test(password) ? "text-green-500" : ""}>• Uppercase</p>
              <p className={/[a-z]/.test(password) ? "text-green-500" : ""}>• Lowercase</p>
              <p className={/\d/.test(password) ? "text-green-500" : ""}>• Number</p>
              <p className={/[@$!%*?&]/.test(password) ? "text-green-500" : ""}>• Special</p>
            </div>
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="pb-2">
            <input
              type="password"
              {...register("confirmPassword")}
              placeholder="Confirm Password"
              onKeyDown={handleKey}
              className={`w-full px-4 py-3 text-sm sm:text-base rounded-xl border transition-all outline-none focus:ring-2 focus:ring-indigo-500/20 ${errors.confirmPassword ? "border-red-500" : "border-gray-200"
                }`}
            />
          </div>

          <button
            type="submit"
            disabled={!isValid || isSubmitting}
            className={`w-full py-3 rounded-xl text-white font-black text-sm sm:text-base cursor-pointer transition-all active:scale-95 ${isValid ? "bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200" : "bg-gray-300"
              }`}
          >
            {isSubmitting ? "Processing..." : "Create Account"}
          </button>
        </form>

        <p className="text-center mt-6 text-xs sm:text-sm text-slate-500">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-indigo-600 font-bold cursor-pointer hover:underline"
          >
            Sign in
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;