import Button from "@/components/Button";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addUserPlant } from "@/components/actions/userPlantActions";
import { useRouter } from "next/router";

export default function Add() {
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setValue("token", "cgTlKPTGS89Tb0RaSm-xDJb3emLQLq1J");
  });

  const submitHandler = (formData) => {
    dispatch(addUserPlant(formData))
      .then((data) => {
        router.push("/");
      })
      .catch((error) => {
        console.log(error);
        setError(error);
      });
  };

  return (
    <div className="container mx-auto h-[100vh] w-[100vw] p-5 flex flex-wrap justify-center">
      <form
        className="flex flex-col justify-between items-center w-full"
        onSubmit={handleSubmit(submitHandler)}
      >
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
          <label htmlFor="token" className="font-semibold w-full">
            Device ID(Token)
            <input
              {...register("token", {
                required: true,
              })}
              placeholder="Hu Tao"
              type="text"
              disabled
              className={`mt-2 px-4 border-primary border w-full py-4 rounded-xl ${
                errors?.token?.type === "required" && "border-red-500"
              }`}
            ></input>
          </label>
          <label htmlFor="plantName" className="font-semibold w-full mt-4">
            Plant Name
            <input
              {...register("plantName", {
                required: true,
              })}
              placeholder="Ex: My Lovely Celery"
              type="text"
              className={`mt-2 px-4 border-primary border w-full py-4 rounded-xl ${
                errors?.plantName?.type === "required" && "border-red-500"
              }`}
            ></input>
          </label>
          <label htmlFor="plantType" className="font-semibold w-full mt-4">
            Plant Type
            <input
              {...register("plantType", {
                required: true,
              })}
              placeholder="Ex: Celery"
              type="text"
              className={`mt-2 px-4 border-primary border w-full py-4 rounded-xl ${
                errors?.plantType?.type === "required" && "border-red-500"
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
        <Button
          type={"submit"}
          className="bg-primary text-white font-bold w-full"
        >
          Save
        </Button>
      </form>
    </div>
  );
}
