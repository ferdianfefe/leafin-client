import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '@/components/Button';
import { signup } from '@/components/actions/userActions';
import { useDispatch } from 'react-redux';

export default function Signup() {
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState('');

  const registerHandler = async ({ email, password }) => {
    dispatch(signup(email, password))
      .then(() => {
        router.push('signin');
      })
      .catch((error) => {
        setError(error);
      });
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
        {/* <label htmlFor="name" className="font-semibold w-full">
          Name
          <input
            {...register('name', {
              required: true,
            })}
            placeholder="Name"
            type="text"
            className={`mt-2 px-4 border-primary border w-full py-4 rounded-xl ${
              errors?.email?.type === 'required' && 'border-red-500'
            }`}
          ></input>
        </label> */}

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
          <label
            htmlFor="tnc"
            className="text-[12.13px] text-gray-primary flex items-center"
          >
            <input
              {...register('tnc', {
                required: true,
              })}
              type="checkbox"
              className="mr-3 w-5 h-5 default:ring-1 accent-primary"
            ></input>
            <span>
              I agree to the
              <Link href="/#">
                <a className="text-primary"> Terms & Conditions</a>
              </Link>
              <br /> and
              <Link href="#">
                <a className="text-primary"> Privacy Policy</a>
              </Link>
            </span>
          </label>

          {errors?.tnc?.type === 'required' && (
            <>
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative w-full"
                role="alert"
              >
                <strong className="font-bold w-full">Error</strong>
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
                <strong className="font-bold w-full">Error</strong>
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

      {/* <Button className={'mt-5 border border-primary text-primary font-bold'}>
        Sign up with Google
      </Button> */}

      <p className="mt-5 font-semibold w-full  text-gray-primary text-[12.13px]">
        Already have an account?
        <Link href="/signin">
          <a className="text-primary hover:underline"> Log in</a>
        </Link>
      </p>
    </div>
  );
}
