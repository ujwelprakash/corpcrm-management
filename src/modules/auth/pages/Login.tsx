import LoginForm from "../components/LoginForm";

const Login = () => {
return ( <div className="min-h-screen flex items-center justify-center bg-bg px-4"> <div className="w-full max-w-md bg-surface border border-border rounded-2xl p-6 shadow-sm"> <h1 className="text-2xl font-bold text-text mb-2">
Welcome Back </h1>

    <p className="text-sm text-text-soft mb-6">
      Login to continue to your dashboard
    </p>

    <LoginForm />
  </div>
</div>


);
};

export default Login;
