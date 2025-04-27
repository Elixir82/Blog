import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import Authservices from '../appwrite/auth'
import { Button, Input, Logo } from './index'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../store/authSlice'
function Signup() {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let [error, Seterror] = useState("");
  let {register, handleSubmit} = useForm();

  let signu = async (data) => {
    Seterror("");
    try {
      let userdata = await Authservices.createAccount(data);
      if (userdata) {
        console.log(userdata);
        let userdata = await Authservices.getCurrentUser();
        if (userdata) {
          dispatch(login({userdata}));
          navigate('/');
        }
      }
    } catch (error) {
      console.log("This is an error in signup component")
      Seterror(error.message)
    }
  }
  return (
    <div className="flex items-center justify-center">
      {/* <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
        <span className="inline-block w-full max-w-[100px]">
          <Logo width="100%" />
        </span>
      </div> */}
      <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
      <p className="mt-2 text-center text-base text-black/60">
        Already have an account?&nbsp;
        <Link
          to="/login"
          className="font-medium text-primary transition-all duration-200 hover:underline"
        >
          Sign In
        </Link>
      </p>
      {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
      <form onSubmit={handleSubmit(signu)}>
        <div className='space-y-5'>
          <Input
            label='Name: '
            placeholder='Enter your name'
            type='text'
            {...register('name', {
              required: true
            })}
          />
          <Input
            label="Email: "
            placeholder="Enter your email"
            type="email"
            {...register("email", {
              required: true,
              validate: {
                matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                  "Email address must be a valid address",
              }
            })}
          />
          <Input
            label="Password: "
            type="password"
            placeholder="Enter your password"
            {...register("password", {
              required: true
            })}
          />
          <Button type="submit" className="w-full">
            Create Account
          </Button>
        </div>
      </form>
    </div>
  )
}

export default Signup