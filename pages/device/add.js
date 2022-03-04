import Button from "@/components/Button";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useState } from "react";

export default function Add() {
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  return (
    <div className="container mx-auto h-[100vh] w-[100vw] p-5 flex flex-wrap justify-center">
      <div className="flex flex-col justify-between items-center w-full">
        <div className="">
          <div className="flex flex-col justify-center items-center w-full px-5">
            <h1 className="font-bold text-2xl mb-10">Add Device</h1>
            <Link href="/">
              <a className="absolute left-5 mb-10">
                <div className="w-5 h-5 relative items-center justify-self-end">
                  <Image
                    src="/assets/backBtn.svg"
                    objectFit="contain"
                    layout="fill"
                    alt="edit"
                    priority
                  />
                </div>
              </a>
            </Link>
          </div>
          <label htmlFor="device-name" className="font-semibold w-full">
            Device Name
            <input
              {...register("device-name", {
                required: true,
              })}
              placeholder="Hu Tao"
              type="text"
              className={`mt-2 px-4 border-primary border w-full py-4 rounded-xl ${
                errors?.name?.type === "required" && "border-red-500"
              }`}
            ></input>
          </label>

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
        </div>
        <Button className="bg-primary text-white font-bold w-full">Save</Button>
      </div>
    </div>
  );
}
