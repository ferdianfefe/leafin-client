import {
  getProduct,
  deleteProduct,
} from '@/components/actions/marketplaceActions';
import Button from '@/components/Button';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import parse from 'html-react-parser';
import { getProfile } from '@/components/actions/userActions';

export default function Idmarketplace() {
  const router = useRouter();
  const { id } = router.query;
  const isAdmin = useSelector((state) => state.user);
  const [showModal, setShowModal] = useState(false);

  const productRedux = useSelector((state) => state.marketplace.product);
  const [product, setProduct] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProduct(id));
  }, [id]);

  useEffect(() => {
    dispatch(getProfile());
    console.log(isAdmin?.user?.data.isAdmin);
  }, []);

  useEffect(() => {
    setProduct(productRedux);
  }, [productRedux]);

  const delProd = () => {
    dispatch(deleteProduct(id))
      .then((data) => {
        router.push('/marketplace');
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <Link href="/marketplace">
        <a className="absolute left-5 mt-5">
          <img
            src="/assets/backBtn.svg"
            alt="edit"
            style={{
              filter:
                'invert(99%) sepia(11%) saturate(0%) hue-rotate(231deg) brightness(106%) contrast(100%)',
            }}
            className="w-5 h-5 relative items-center justify-self-end"
          />
        </a>
      </Link>
      <div className="relative w-full h-[400px] -z-10">
        {/* <Image src={`/assets/${id}.jpg`} layout="fill" alt={id} /> */}
        <Image
          src={product?.imageFileURL || '/logo.png'}
          layout="fill"
          alt={id}
        />
      </div>
      <div className="fixed bottom-0 container mx-auto px-5 rounded-t-2xl bg-white">
        <div className="flex justify-between font-bold items-center pt-3">
          <h1 className="text-[26px] text flex flex-col">
            {/* {id}
            <span className="text-[15.15px]">LSPr - 004 - IDN</span> */}
            {product?.title}
            <span className="text-[15.15px]">{product?.productId}</span>
          </h1>
          {/* <p className="text-lg">12.69 $</p> */}
          <p className="text-lg">{product?.price} $</p>
        </div>
        <div className="mt-4 mb-4">
          <h1 className="font-bold text-[15.15px]">Description</h1>
          <span className="prose text-xs w-full">
            {parse(product?.description || '')}
          </span>
          {/* <span className="text-xs w-full">
            Pupuk Kandang Kambing Organik halus <br />
            • Steril <br />
            • Siap Pakai <br />
            • Tidak <br />
            Berbau Terbuat dari kotoran kambing yang diproses secara alami.
            Cocok ditambahkan pada media tanam untuk buah-buahan.
          </span> */}
        </div>

        <Button className="bg-primary text-white font-bold w-full mb-5 flex justify-center gap-2">
          <div className="w-5 h-5 relative">
            <Image src="/assets/shop-cart.svg" layout="fill" alt="shop cart" />
          </div>
          Buy Now
        </Button>
        {isAdmin?.user?.data.isAdmin && (
          <Button
            onClick={() => {
              setShowModal(true);
            }}
            className="bg-red-500 text-white font-bold w-full mb-5 flex justify-center gap-2"
          >
            Delete Product
          </Button>
        )}

        {showModal ? (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                    <h3 className="text-3xl font-semibold">Delete Product</h3>
                    <button
                      className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => setShowModal(false)}
                    >
                      <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                        ×
                      </span>
                    </button>
                  </div>
                  {/*body*/}
                  <div className="relative p-6 flex-auto">
                    <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                      Are you sure you want to delete this product?
                    </p>
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                    <button
                      className="text-emerald-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Close
                    </button>
                    <button
                      className="bg-red-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={delProd}
                    >
                      Yes
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}
      </div>
    </>
  );
}
