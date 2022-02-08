import Image from 'next/image';
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import Button from '../components/Button';

import 'swiper/css';
import 'swiper/css/pagination';

export default function Home() {
  return (
    <div className="container py-10 px-4 mx-auto flex flex-wrap justify-center items-center">
      <Swiper pagination={true} modules={[Pagination]}>
        <SwiperSlide className="flex flex-wrap justify-center items-center mb-10">
          <div className="w-[315px] h-[315px] relative">
            <Image
              priority
              src="/homepage.svg"
              alt="homepage Image"
              layout="fill"
              objectFit="contain"
            ></Image>
          </div>
          <div className="pt-10 mb-5 flex justify-center items-center flex-wrap">
            <p className="font-bold text-center w-full text-xl">
              Manage your gardening better
            </p>
            <p className="mt-5 text-gray-primary text-center">
              Having difficulties in managing your gardening?
              <br />
              We are here to assist you
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide className="flex flex-wrap justify-center items-center mb-10">
          <div className="w-[315px] h-[315px] relative">
            <Image
              priority
              src="/homepage.svg"
              alt="homepage Image"
              layout="fill"
              objectFit="contain"
            ></Image>
          </div>
          <div className="pt-10 mb-5 flex justify-center items-center flex-wrap">
            <p className="font-bold text-center w-full text-xl">
              Manage your gardening better
            </p>
            <p className="mt-5 text-gray-primary text-center">
              Having difficulties in managing your gardening?
              <br />
              We are here to assist you
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide className="flex flex-wrap justify-center items-center mb-10">
          <div className="w-[315px] h-[315px] relative">
            <Image
              priority
              src="/homepage.svg"
              alt="homepage Image"
              layout="fill"
              objectFit="contain"
            ></Image>
          </div>
          <div className="pt-10 mb-5 flex justify-center items-center flex-wrap">
            <p className="font-bold text-center w-full text-xl">
              Manage your gardening better
            </p>
            <p className="mt-5 text-gray-primary text-center">
              Having difficulties in managing your gardening?
              <br />
              We are here to assist you
            </p>
          </div>
        </SwiperSlide>
      </Swiper>
      <div className="pt-5 w-full gap-5 flex justify-between items-center">
        <Button className="border bg-primary text-white font-bold">
          <a href="signup">Sign Up</a>
        </Button>
        <Button className="border border-primary font-bold text-primary">
          <a href="signin">Sign In</a>
        </Button>
      </div>
    </div>
  );
}
