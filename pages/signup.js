import Router from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../components/Button';

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState('');

  const registerHandler = async ({ email, password }) => {
    const data = await fetch('http://localhost:5000/api/user/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const result = data.status;
    if (result === 201) {
      return Router.push('profile');
    } else {
      return setError(await data.json().then((res) => res.message));
    }
  };

  return (
    <div className="container py-10 px-4 mx-auto flex flex-wrap justify-center items-center">
      <p className="w-full text-left font-bold text-4xl">
        Create <br /> Account
      </p>
      <form
        onSubmit={handleSubmit(registerHandler)}
        className="mt-5 flex w-full flex-wrap"
        autoComplete="false"
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

        <div className="flex items-center flex-wrap justify-start gap-5 mt-5">
          <input
            {...register('rememberme', {
              required: true,
            })}
            type="checkbox"
            className="ml-1 w-5 h-5 default:ring-1 accent-primary"
          ></input>
          <p className="text-[12.13px] text-gray-primary">
            I agree to the
            <a as="tnc" href="#" className="text-primary">
              Terms & Conditions
            </a>
            <br /> and
            <a as="privacy policy" href="#" className="text-primary">
              Privacy Policy
            </a>
          </p>

          {errors?.rememberme?.type === 'required' && (
            <>
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative w-full"
                role="alert"
              >
                <strong className="font-bold">Error</strong>
                <span className="block sm:inline">
                  You need to accept term & conditions
                </span>
              </div>
            </>
          )}

          {error && (
            <>
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative w-full"
                role="alert"
              >
                <strong className="font-bold">Error</strong>
                <span className="block sm:inline">{error}</span>
              </div>
            </>
          )}
        </div>

        <Button
          type={'submit'}
          className={'mt-5 bg-primary text-white font-bold'}
        >
          Create account
        </Button>
      </form>

      <Button className={'mt-5 border border-primary text-primary font-bold'}>
        Sign up with Google
      </Button>

      <p className="mt-5 font-semibold w-full  text-gray-primary text-[12.13px]">
        Already have an account?
        <a as="signin" href="signin" className="text-primary hover:underline">
          Log in
        </a>
      </p>
    </div>
  );
}