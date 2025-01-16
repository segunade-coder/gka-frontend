import { GrGoogle } from "react-icons/gr";
import logo from "../../assets/react.svg";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { FormEvent, useEffect, useState } from "react";
import img from "../../assets/images/4957147.jpg";
import { toast, Toaster } from "sonner";
import { useLogin } from "@/hooks/mutation";
import { useLocation, useNavigate } from "react-router-dom";
const Login = () => {
  const [viewPassword, setViewPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const loginFnc = useLogin();
  const navigate = useNavigate();
  const { state } = useLocation();
  useEffect(() => {
    if (state && !state.authentication) {
      toast.error("Error", {
        description: `You've been logged out. Try login again`,
        id: "login-error",
      });
    }
  }, []);

  const submitForm = async (e: FormEvent) => {
    e.preventDefault();
    if (email !== "" && password !== "") {
      toast.loading("Loading...", { id: "loading-login" });
      setLoading(true);
      try {
        await loginFnc.mutateAsync({ email, password });
        setLoading(false);
        toast.dismiss("loading-login");
        toast.success("Login Successful");
        setEmail("");
        setPassword("");
        navigate("/admin");
      } catch (error) {
        setLoading(false);
      }
    } else {
      toast.warning("Warning", {
        description: "Make sure you fill in all the fields",
      });
    }
  };
  return (
    <div className="w-full h-screen flex p-10 bg-blue-50">
      <Toaster richColors />
      <div className="w-[65%] rounded-tl-3xl rounded-bl-3xl">
        <img src={img} alt="" className="w-full h-full object-cover" />
      </div>
      <form
        className="flex flex-col flex-1 py-10 px-12 backdrop-blur-xl  rounded-tr-2xl rounded-br-2xl"
        onSubmit={submitForm}
      >
        <img src={logo} alt="logo" className="w-20 mx-auto" />
        <p className="text-2xl font-medium pt-5 leading-18 title text-center text-stone-600">
          Welcome Back
        </p>
        <small className="text-xs mb-6 text-stone-500 text-center">
          Please enter your details
        </small>

        <input
          type="email"
          placeholder="Email"
          className="py-2 border-b-[1px] bg-transparent border-stone-400 w-full my-5 outline-none placeholder:text-stone-600 text-sm text-stone-500 placeholder:text-sm px-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="relative w-full flex">
          {!viewPassword ? (
            <BsEyeSlash
              className="text-lg cursor-pointer absolute bottom-5 right-0 text-blue-900"
              onClick={() => setViewPassword(!viewPassword)}
            />
          ) : (
            <BsEye
              className="text-lg cursor-pointer absolute bottom-5 right-0 text-blue-900"
              onClick={() => setViewPassword(!viewPassword)}
            />
          )}
          <input
            type={viewPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="py-2 border-b-[1px] bg-transparent border-stone-400 w-full my-2 outline-none placeholder:text-stone-600 text-sm text-stone-500 placeholder:text-sm px-3"
          />
        </div>

        <div className="w-full flex justify-between text-xs py-3 px-3">
          <label htmlFor="" className="flex items-center gap-2 text-stone-500">
            <input type="checkbox" />
            Remember for 10 days
          </label>
          <a href="" className="text-stone-400">
            forgot password?
          </a>
        </div>
        <button
          type="submit"
          className="w-full text-sm bg-primary text-white py-3 rounded-lg flex gap-3 items-center px-3 mt-10 justify-center"
          disabled={loading}
        >
          {loading ? "Loading..." : "Login"}
        </button>
        <button
          disabled={loading}
          className="w-full text-sm ring-1 ring-primary/40 bg-blue-100 text-primary py-3 rounded-lg flex gap-3 items-center px-3 my-3 justify-center"
        >
          <GrGoogle /> Sign in with Google
        </button>
        <div className="h-full text-xs text-stone-500 flex items-end justify-center">
          <a href="/">Go Back to Homepage</a>
        </div>
      </form>
    </div>
  );
};

export default Login;
