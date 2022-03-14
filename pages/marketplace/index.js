import Navbar from '@/components/Navbar';
import { useEffect, useState } from 'react';

import 'swiper/css';
import Image from 'next/image';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProduct } from '@/components/actions/marketplaceActions';
import { getProfile } from '@/components/actions/userActions';

export default function Marketplace() {
  const marketplaceRedux = useSelector((state) => state.marketplace.products);
  const isAdmin = useSelector((state) => state.user);
  const [products, setProducts] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProduct());
    dispatch(getProfile());
  }, []);

  useEffect(() => {
    setProducts(marketplaceRedux);
  }, [marketplaceRedux]);

  const funcStars = (stars) => {
    let result = [];
    for (let i = 0; i < stars; i++) {
      result.push(
        <div key={i} className="w-[9px] h-[9px] relative">
          <Image src="/assets/stars.svg" alt="stars" layout="fill" />
        </div>
      );
    }
    return result;
  };
  return (
    <>
      <div className="container mx-auto p-5 flex flex-wrap justify-center ">
        <div className="flex-none flex flex-col justify-center w-full">
          <h1 className="font-bold text-[20px] w-2/3 text-left">
            We provide everything you need
          </h1>
          {isAdmin?.user?.data.isAdmin && (
            <Link href="/marketplace/add">
              <a className="absolute right-5">
                <div className="w-5 h-5 relative items-center justify-self-end">
                  <Image
                    src="/assets/plus.svg"
                    objectFit="contain"
                    layout="fill"
                    alt="edit"
                    priority
                  />
                </div>
              </a>
            </Link>
          )}
        </div>
        <div className="flex flex-wrap items-center w-full justify-between mb-20 mt-5">
          {products.map(({ imageFileURL, price, stars, title, slug }, i) => {
            return (
              <Link key={i} href={'marketplace/' + slug}>
                <a className="h-[269px] rounded-xl w-[48%] mb-3">
                  <div className="relative h-[182px] overflow-hidden rounded-t-xl">
                    <Image
                      src={imageFileURL}
                      alt={title}
                      loading="lazy"
                      layout="fill"
                    />
                  </div>
                  <div className="border-x-2 border-b-2 rounded-b-xl flex flex-col px-3">
                    <div className="pt-2 pb-1 flex gap-[2px]">
                      {funcStars(stars)}
                    </div>
                    <div className="font-semibold mb-2">{title}</div>
                    <div className="font-semibold mb-1">{price} $</div>
                  </div>
                </a>
              </Link>
            );
          })}
        </div>
      </div>

      <Navbar active={'marketplace'} />
    </>
  );
}
