import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

import Button from '@/components/Button';
import dynamic from 'next/dynamic';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { addProduct } from '@/components/actions/marketplaceActions';
const Editor = dynamic(
  () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
  { ssr: false }
);

export default function Add() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  const [error, setError] = useState('');
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

  const submitHandler = ({ title, price, productId }) => {
    let fd = new FormData();
    fd.append('image', currentFile);
    fd.append('title', title);
    fd.append('price', price);
    fd.append('productId', productId);
    fd.append(
      'description',
      draftToHtml(convertToRaw(editorState.getCurrentContent()))
    );
    dispatch(addProduct(fd))
      .then((data) => {
        router.push('/marketplace');
      })
      .catch((error) => {
        setError(error);
      });
  };

  return (
    <div className="container mx-auto w-[100vw] p-5 flex flex-wrap justify-center">
      <div className="flex flex-col justify-between items-center w-full">
        <div className="">
          <div className="flex flex-col justify-center items-center w-full px-5">
            <h1 className="font-bold text-2xl">Add Product</h1>
            <Link href="/marketplace">
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
            {...register('title', {
              required: true,
            })}
            type="text"
            className={`mt-2 px-4 border-primary border w-full py-4 rounded-xl ${
              errors?.title?.type === 'required' && 'border-red-500'
            }`}
          ></input>
        </label>

        {/* Picture preview */}
        <div className="mt-2">
          <p className="font-semibold w-full">Image</p>
          <label
            htmlFor="image"
            className="mt-2 font-semibold w-full text-primary"
          >
            {previewImage ? 'Change cover image' : 'Add cover image'}
            <input
              type="file"
              name="image"
              id="image"
              required={true}
              onChange={pickImage}
              style={{ display: 'none' }}
              className="invisible h-0"
            />
          </label>
          <div className="w-full">
            {previewImage && (
              <div className="rounded-md relative w-24 h-24 overflow-hidden">
                <Image
                  src={previewImage}
                  alt="preview"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
            )}
          </div>
        </div>
        <label htmlFor="price" className="font-semibold w-full">
          Price
          <input
            {...register('price', {
              required: true,
              valueAsNumber: true,
            })}
            type="number"
            step="any"
            className={`mt-2 px-4 border-primary border w-full py-4 rounded-xl ${
              errors?.title?.type === 'required' && 'border-red-500'
            }`}
          ></input>
        </label>
        <label htmlFor="productId" className="font-semibold w-full">
          SKU
          <input
            {...register('productId', {
              required: true,
            })}
            type="text"
            className={`mt-2 px-4 border-primary border w-full py-4 rounded-xl ${
              errors?.title?.type === 'required' && 'border-red-500'
            }`}
          ></input>
        </label>
        <label htmlFor="description" className="mt-3 w-full">
          <p className="font-semibold">Product Description</p>
          <Editor
            editorState={editorState}
            wrapperClassName="mt-2 border-[1px] min-h-[300px]"
            editorClassName=" border-gray-100 px-3"
            onEditorStateChange={onEditorStateChange}
          />
        </label>

        <Button
          type="submit"
          className={'mt-5 bg-primary text-white font-bold'}
        >
          Add Product
        </Button>
      </form>
    </div>
  );
}
