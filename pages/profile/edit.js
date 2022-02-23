import {
  getProfile,
  getServerProfile,
  updateProfile,
} from "@/components/actions/userActions";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import Button from "@/components/Button";
import Link from "next/link";
import Image from "next/image";
import { wrapper } from "@/components/store/store";
import {
  USER_GET_PROFILE_REQUEST,
  USER_GET_PROFILE_SUCCESS,
} from "constants/userConstants";

Edit.getInitialProps = wrapper.getInitialPageProps(
  ({ getState, dispatch }) =>
    async ({ req }) => {
      const { user } = getState();
      if (user.user?.data == null && !process.browser) {
        dispatch({ type: USER_GET_PROFILE_REQUEST });

        const data = await getServerProfile(req);

        dispatch({ type: USER_GET_PROFILE_SUCCESS, payload: data });
      } else if (user.user?.data == null) {
        dispatch(getProfile());
      } else {
        console.log("sudah ada data");
      }
    }
);

export default function Edit() {
  const router = useRouter();
  const dispatch = useDispatch();

  let user = useSelector((state) => state.user);
  const [error, setError] = useState("");
  const [currentFile, setCurrentFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  // const selectFile = (e) => {
  //   setCurrentFile(e.target.files[0]);
  //   setPreviewImage(URL.createObjectURL(e.target.files[0]));
  // };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setValue("email", user.user?.data?.email);
    setValue("name", user.user?.data?.name);
  }, [setValue, user.user?.data?.email, user.user?.data?.name]);

  const pickPicture = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setCurrentFile(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const editHandler = async ({ name, email, password }) => {
    console.log("a");
    let fd = new FormData();
    if (currentFile) {
      fd.append("picture", currentFile);
    }
    if (name) {
      fd.append("name", name);
    }
    if (email) {
      fd.append("email", email);
    }
    if (password) {
      fd.append("password", password);
    }
    dispatch(updateProfile(fd))
      .then((data) => {
        router.push("../profile");
      })
      .catch((error) => {
        setError(error);
      });
  };

  return (
    <div className="container mx-auto p-5 flex flex-wrap justify-center">
      <div className="flex flex-col justify-center items-center w-full ">
        <h1 className="font-bold text-2xl mb-10">Edit Profile</h1>
        <Link href="/profile">
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
      {/* Picture preview */}
      <div className="flex flex-col justify-center items-center">
        {previewImage || user?.user?.data?.pictureFileURL ? (
          <div className="rounded-full relative w-24 h-24 overflow-hidden">
            <Image
              src={previewImage || user?.user?.data?.pictureFileURL}
              alt="preview"
              layout="fill"
              objectFit="contain"
            />
          </div>
        ) : (
          <div className="rounded-full w-24 h-24 bg-[#C4C4C4]"></div>
        )}
        <input
          type="file"
          name="picture"
          id="picture"
          onChange={pickPicture}
          className="invisible h-0"
        />
        <label
          htmlFor="picture"
          className="mt-3 font-semibold w-full text-center text-[#B8B8B8]"
        >
          Change profile picture
        </label>
      </div>
      <form
        onSubmit={handleSubmit(editHandler)}
        className="mt-5 flex w-full flex-wrap"
      >
        <label htmlFor="name" className="font-semibold w-full">
          Name
          <input
            {...register("name", {
              required: true,
            })}
            placeholder="Name"
            type="text"
            className={`mt-2 px-4 border-primary border w-full py-4 rounded-xl ${
              errors?.name?.type === "required" && "border-red-500"
            }`}
          ></input>
        </label>

        <label htmlFor="email" className="mt-5 font-semibold w-full">
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
            autoComplete="off"
            {...register("password", { required: false })}
            placeholder="Password"
            className={`mt-2 px-4 py-4 rounded-xl border border-primary w-full ${
              errors?.password?.type === "required" && "border-red-500"
            }`}
            type="password"
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

        <Button
          type="submit"
          className={"mt-5 bg-primary text-white font-bold"}
        >
          Save
        </Button>
      </form>
      <Button
        href={`/profile`}
        className={"mt-5 mb-20 border border-primary text-primary font-bold"}
      >
        Cancel
      </Button>
    </div>
  );
}
