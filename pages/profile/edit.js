import {
  getProfile,
  updateProfile,
} from "../../components/actions/userActions";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import Navbar from "../../components/Navbar";
import Button from "../../components/Button";

export default function Edit() {
  const dispatch = useDispatch();
  let user = useSelector((state) => state.user);
  const [error, setError] = useState("");
  const [currentFile, setCurrentFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");
  const [imageInfos, setImageInfos] = useState([]);

  const selectFile = (e) => {
    setCurrentFile(e.target.files[0]);
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    dispatch(getProfile()).then(({ data }) => {
      console.log(data);
      setValue("email", data.email);
    });
  }, []);

  const pickImageBtnRef = null;

  const pickPicture = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setCurrentFile(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const editHandler = async ({ name, email, password }) => {
    let formData = new FormData();
    formData.append("file", currentFile);
    dispatch(updateProfile(picture, name, email, password))
      .then((data) => {
        router.push("profile");
      })
      .catch((error) => {
        setError(error);
      });
  };

  return (
    <div className="container mx-auto p-5 flex flex-wrap justify-center">
      <div className="flex flex-col justify-center items-center">
        <h1 className="font-bold text-2xl px-10 mb-10">Edit Profile</h1>
        {/* Picture preview */}
        {previewImage ? (
          <img
            src={previewImage}
            alt="preview"
            className="rounded-full w-24 h-24"
          />
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
              errors?.email?.type === "required" && "border-red-500"
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
            {...register("password", { required: true })}
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
        <Button
          type="submit"
          className={"mt-5 border border-primary text-primary font-bold"}
        >
          Cancel
        </Button>
      </form>

      <Navbar active="profile" />
    </div>
  );
}
