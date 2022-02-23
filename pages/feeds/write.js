import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";

import Button from "@/components/Button";

export default function Write() {
  const [error, setError] = useState("");
  const [currentFile, setCurrentFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const pickImage = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setCurrentFile(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const submitHandler = () => {};

  return (
    <div className="container mx-auto w-[100vw] p-5 flex flex-wrap justify-center">
      <div className="flex flex-col justify-between items-center w-full">
        <div className="">
          <div className="flex flex-col justify-center items-center w-full px-5">
            <h1 className="font-bold text-2xl">Write</h1>
            <Link href="/">
              <a className="absolute left-5">
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
        </div>
      </div>
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="mt-5 flex w-full flex-wrap"
      >
        <label htmlFor="title" className="font-semibold w-full">
          Title
          <input
            {...register("title", {
              required: true,
            })}
            type="text"
            className={`mt-2 px-4 border-primary border w-full py-4 rounded-xl ${
              errors?.name?.type === "required" && "border-red-500"
            }`}
          ></input>
        </label>

        {/* Picture preview */}
        <div className="mt-2">
          <label htmlFor="image" className="font-semibold w-full text-primary">
            Add cover image
          </label>
          <input
            type="file"
            name="image"
            id="image"
            onChange={pickImage}
            style={{ display: "none" }}
            className="invisible h-0"
          />

          <div className="w-full mt-2">
            {previewImage ? (
              <div className="rounded-full relative w-24 h-24 overflow-hidden">
                <Image
                  src={previewImage}
                  alt="preview"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
            ) : (
              <div className="rounded-md w-24 h-24 bg-[#C4C4C4]"></div>
            )}
          </div>
        </div>

        <label htmlFor="tags" className="mt-3 font-semibold w-full">
          Tags
          <input
            {...register("tags", {
              required: true,
            })}
            placeholder="Example: Tag1, Tag2, Tag3"
            type="text"
            className={`mt-2 px-4 border-primary border w-full py-4 rounded-xl ${
              errors?.name?.type === "required" && "border-red-500"
            }`}
          ></input>
        </label>
        <label htmlFor="content" className="mt-3 font-semibold w-full">
          Content text
          <textarea
            {...register("content", {
              required: true,
            })}
            type="text"
            className={`mt-2 px-4 border-primary border h-[15rem] w-full py-4 rounded-xl ${
              errors?.name?.type === "required" && "border-red-500"
            }`}
          ></textarea>
        </label>

        <Button
          type="submit"
          className={"mt-5 bg-primary text-white font-bold"}
        >
          Post
        </Button>
      </form>
    </div>
  );
}
