import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";

import {
registerSchema,
type RegisterFormData,
} from "../schema/registerSchema";

const RegisterForm = () => {
const navigate = useNavigate();

const {
register,
handleSubmit,
formState: { errors },
} = useForm<RegisterFormData>({
resolver: zodResolver(registerSchema),
});

const onSubmit = (data: RegisterFormData) => {
console.log("Registered User:", data);


// 🔥 fake success
navigate("/auth/login");


};

return ( <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">


  {/* Name */}
  <div>
    <label className="block text-sm text-text mb-1">
      Name
    </label>

    <input
      type="text"
      {...register("name")}
      placeholder="Enter your name"
      className="w-full border border-border bg-bg rounded-xl px-3 py-2 text-sm outline-none focus:border-accent"
    />

    {errors.name && (
      <p className="text-sm text-red-500 mt-1">
        {errors.name.message}
      </p>
    )}
  </div>

  {/* Email */}
  <div>
    <label className="block text-sm text-text mb-1">
      Email
    </label>

    <input
      type="email"
      {...register("email")}
      placeholder="Enter your email"
      className="w-full border border-border bg-bg rounded-xl px-3 py-2 text-sm outline-none focus:border-accent"
    />

    {errors.email && (
      <p className="text-sm text-red-500 mt-1">
        {errors.email.message}
      </p>
    )}
  </div>

  {/* Password */}
  <div>
    <label className="block text-sm text-text mb-1">
      Password
    </label>

    <input
      type="password"
      {...register("password")}
      placeholder="Enter password"
      className="w-full border border-border bg-bg rounded-xl px-3 py-2 text-sm outline-none focus:border-accent"
    />

    {errors.password && (
      <p className="text-sm text-red-500 mt-1">
        {errors.password.message}
      </p>
    )}
  </div>

  {/* Confirm Password */}
  <div>
    <label className="block text-sm text-text mb-1">
      Confirm Password
    </label>

    <input
      type="password"
      {...register("confirmPassword")}
      placeholder="Confirm password"
      className="w-full border border-border bg-bg rounded-xl px-3 py-2 text-sm outline-none focus:border-accent"
    />

    {errors.confirmPassword && (
      <p className="text-sm text-red-500 mt-1">
        {errors.confirmPassword.message}
      </p>
    )}
  </div>

  {/* Submit */}
  <button
    type="submit"
    className="w-full bg-accent hover:bg-accent/90 text-white py-2.5 rounded-xl text-sm font-medium transition"
  >
    Create Account
  </button>

  {/* Login Link */}
  <p className="text-sm text-text-soft text-center">
    Already have an account?{" "}
    <Link
      to="/auth/login"
      className="text-accent font-medium hover:underline"
    >
      Login
    </Link>
  </p>
</form>


);
};

export default RegisterForm;
