import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

import {
loginSchema,
type LoginFormData,
} from "../schema/loginSchema";

import { loginSuccess } from "../slice";

const LoginForm = () => {
const dispatch = useDispatch();
const navigate = useNavigate();

const {
register,
handleSubmit,
formState: { errors },
} = useForm<LoginFormData>({
resolver: zodResolver(loginSchema),
});

const onSubmit = (data: LoginFormData) => {
// 🔥 fake login success
dispatch(
loginSuccess({
user: {
email: data.email,
},
token: "fake-jwt-token",
})
);


// redirect
navigate("/");

};

return ( <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">


  {/* Email */}
  <div>
    <label className="block text-sm text-text mb-1">
      Email
    </label>

    <input
      type="email"
      {...register("email")}
      className="w-full border border-border bg-bg rounded-xl px-3 py-2 text-sm outline-none focus:border-accent"
      placeholder="Enter your email"
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
      className="w-full border border-border bg-bg rounded-xl px-3 py-2 text-sm outline-none focus:border-accent"
      placeholder="Enter your password"
    />

    {errors.password && (
      <p className="text-sm text-red-500 mt-1">
        {errors.password.message}
      </p>
    )}
  </div>

  {/* Submit */}
  <button
    type="submit"
    className="w-full bg-accent hover:bg-accent/90 text-white py-2.5 rounded-xl text-sm font-medium transition"
  >
    Login
  </button>

  {/* Register Link */}
  <p className="text-sm text-text-soft text-center">
    Don&apos;t have an account?{" "}
    <Link
      to="/auth/register"
      className="text-accent font-medium hover:underline"
    >
      Register
    </Link>
  </p>
</form>


);
};

export default LoginForm;
