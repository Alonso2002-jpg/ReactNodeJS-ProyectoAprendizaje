import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from '../context/AuthContext'
import {Link, useNavigate} from 'react-router-dom'
import Image from '../components/Image'
import homepic from '../assets/homepic.jpg'

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {signin,errors:signInErrors,isAuthenticated} = useAuth()
  const navigate=useNavigate()

  const onSubmit = handleSubmit((data) => {
    signin(data)
  });

  useEffect(()=>{
    if(isAuthenticated) navigate('/tasks')
  },[isAuthenticated])
  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center ">
      <div className="bg-zinc-800 p-10 rounded-md">
        {
          signInErrors.map((error,i)=>(
            <div className="bg-red-500 p-2 mb-1 rounded-md  text-white text-center" key={i}>
            {error}
          </div>
          ))
        }
        <form onSubmit={onSubmit} className="bg-zinc-600 p-6 rounded-md">
          <h1 className="text-3xl mb-3 font-bold ">Sign In!</h1>
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
            Login
          </button>
        </form>
        <p className="flex gap-x-2 justify-between mt-4 bg-blue-500 p-2 rounded-md">
          Don't have an account? <Link to="/register" className="text-sky-300">Sign Up</Link>
        </p>
      </div>
      <div className="bg-zinc-800 p-10 rounded-md max-w-5xl">
            <Image url={homepic}/>
      </div>
    </div>
  );
};

export default LoginPage;
