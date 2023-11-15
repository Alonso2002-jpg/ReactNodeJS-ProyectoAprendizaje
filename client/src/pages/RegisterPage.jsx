import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useNavigate,Link } from "react-router-dom";

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signup, isAuthenticated, errors: registerErrors } = useAuth();
  const navigate = useNavigate();

  useEffect(()=>{
    if(isAuthenticated) navigate('/tasks')
  },[isAuthenticated])
  const onSubmit = handleSubmit(async (values) => {
    signup(values);
  });

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="bg-zinc-800 max-w-md p-10 rounded-md m-auto mt-11">
        {registerErrors.map((error, i) => (
          <div className="bg-red-500 p-2 mb-1 rounded-md  text-white" key={i}>
            {error}
          </div>
        ))}
        <form onSubmit={onSubmit} className="bg-zinc-600 p-6 rounded-md">
          <h1 className="text-3xl mb-3 font-bold ">Sign Up!</h1>
          <input
            type="text"
            {...register("username", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 m-2 rounded-md"
            placeholder="username"
          />
          {errors.username && (
            <p className="text-red-500 font-bold">Username is required</p>
          )}
          <input
            type="email"
            {...register("email", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 m-2 rounded-md"
            placeholder="email"
          />
          {errors.email && <p className="text-red-500 font-bold">Email is required</p>}
          <input
            type="password"
            {...register("password", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 m-2 rounded-md"
            placeholder="password"
          />
          {errors.password && (
            <p className="text-red-500 font-bold">Password is required</p>
          )}
          <button
            type="submit"
            className="bg-zinc-300 p-2 rounded-md text-black"
          >
            Register
          </button>
        </form>
        <p className="flex gap-x-2 justify-between mt-4 bg-blue-500 p-2 rounded-md">
          Already have an account? <Link to="/login" className="text-sky-300">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
