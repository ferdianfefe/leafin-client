import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

import Button from "@/components/Button";
import { useDispatch } from "react-redux";
import { signin } from "@/components/actions/userActions";
import Link from "next/link";

export default function Signin() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const loginHandler = async ({ email, password }) => {
    dispatch(signin(email, password))
      .then(() => {
        router.push("profile");
      })
      .catch((error) => {
        setError(error);
      });
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
            {...register("email", {
              required: true,
              pattern:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            })}
            placeholder="Email"
            type="text"
            className={`mt-2 px-4 border-primary border w-full py-4 rounded-xl ${
              errors?.email?.type === "required" && "border-red-500"
            } ${errors?.email?.type === "pattern" && "border-red-500"}`}
          ></input>
        </label>

        <label htmlFor="password" className="mt-5 font-semibold w-full">
          Password
          <input
            {...register("password", { required: true })}
            placeholder="Password"
            className={`mt-2 px-4 py-4 rounded-xl border border-primary w-full ${
              errors?.password?.type === "required" && "border-red-500"
            }`}
            type="password"
          ></input>
        </label>

        <div className="flex items-center justify-center gap-5 mt-5">
          <label
            htmlFor="rememberme"
            className="text-[12.13px] text-gray-primary flex items-center"
          >
            <input
              {...register("rememberMe")}
              type="checkbox"
              className="mr-3 w-5 h-5 accent-primary rounded"
            ></input>
            Remember me
          </label>
        </div>

        {error && (
          <>
            <div
              className="mt-5 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative w-full"
              role="alert"
            >
              <strong className="font-bold w-full">Error</strong>
              <span className="block sm:inline">{error}</span>
            </div>
          </>
        )}

        <Button
          type="submit"
          className={"mt-5 bg-primary text-white font-bold"}
        >
          Sign in
        </Button>
      </form>

      {/* <Button className={'mt-5 border border-primary text-primary font-bold'}>
        Sign in with Google
      </Button> */}

      <p className="mt-5 font-semibold w-full text-gray-primary text-[12.13px]">
        Not yet have an account?
        <Link href="/signup">
          <a className="text-primary hover:underline"> Register</a>
        </Link>
      </p>
    </div>
  );
}
