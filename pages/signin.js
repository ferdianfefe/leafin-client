import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Router from 'next/router';

import Button from '../components/Button';
import { useDispatch } from 'react-redux';
import { login } from '../components/reducers/login';

export default function Signin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const loginHandler = async ({ email, password }) => {
    const data = await fetch('http://localhost:5000/api/user/signin', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const result = data.status;

    dispatch(
      login({
        name: 'test',
        email,
        loggedIn: true,
      })
    );

    console.log(await data.json());
    if (result === 200) {
      return Router.push('profile');
    } else {
      return setError(await data.json().then((res) => res.message));
    }
  };

  return (
    <div className="container py-10 px-4 mx-auto flex flex-wrap justify-center items-center">
      <p className="w-full text-left font-bold text-4xl">
        Welcome <br />
        Back
      </p>
      <form
        onSubmit={handleSubmit(loginHandler)}
        className="mt-5 flex w-full flex-wrap"
      >
        <label htmlFor="email" className="font-semibold w-full">
          Email
          <input
            {...register('email', {
              required: true,
              pattern:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            })}
            placeholder="Email"
            type="text"
            className={`mt-2 px-4 border-primary border w-full py-4 rounded-xl ${
              errors?.email?.type === 'required' && 'border-red-500'
            } ${errors?.email?.type === 'pattern' && 'border-red-500'}`}
          ></input>
        </label>

        <label htmlFor="password" className="mt-5 font-semibold w-full">
          Password
          <input
            {...register('password', { required: true })}
            placeholder="Password"
            className={`mt-2 px-4 py-4 rounded-xl border border-primary w-full ${
              errors?.password?.type === 'required' && 'border-red-500'
            }`}
            type="password"
          ></input>
        </label>

        <div className="flex items-center justify-center gap-5 mt-5">
          <input
            {...register('rememberMe')}
            type="checkbox"
            className="ml-1 w-5 h-5 accent-primary rounded"
          ></input>
          <p className="text-[12.13px] text-gray-primary ">Remember me</p>
        </div>

        {error && (
          <>
            <div
              className="mt-5 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative w-full"
              role="alert"
            >
              <strong className="font-bold">Error</strong>
              <span className="block sm:inline">{error}</span>
            </div>
          </>
        )}

        <Button
          type="submit"
          className={'mt-5 bg-primary text-white font-bold'}
        >
          Sign in
        </Button>
      </form>

      <Button className={'mt-5 border border-primary text-primary font-bold'}>
        Sign in with Google
      </Button>

      <p className="mt-5 font-semibold w-full  text-gray-primary text-[12.13px]">
        Not yet have an account?
        <a as="signup" href="signup" className="text-primary hover:underline">
          Register
        </a>
      </p>
    </div>
  );
}
