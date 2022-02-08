import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Pagination, Navigation } from 'swiper';

export default function Profile() {
  return (
    <div className="container mx-auto p-5 flex flex-wrap justify-center">
      <div className="flex items-center">
        <h1 className="font-bold text-2xl px-10">My Profile</h1>
        <a href="profile/edit">
          <div className="w-5 h-5 relative">
            <Image
              src="/edit.svg"
              objectFit="contain"
              layout="fill"
              alt="edit"
            ></Image>
          </div>
        </a>
      </div>

      <div className="pt-10 flex w-full items-center ">
        <div className="rounded-full w-20 h-20 relative overflow-hidden">
          <Image
            priority
            src="/profileimage.png"
            objectFit="cover"
            layout="fill"
            alt="profile picture"
          ></Image>
        </div>
        <div className="ml-5 flex flex-wrap gap-1">
          <h1 className="font-bold text-lg w-full">John</h1>
          <p className="text-xs text-gray-light">John is me</p>
        </div>
      </div>

      <div className="mt-10 flex flex-wrap items-center w-full justify-start">
        <h1 className="font-bold text-lg w-full">Badges</h1>
        <Swiper
          slidesPerView={3}
          spaceBetween={5}
          slidesPerGroup={3}
          loopFillGroupWithBlank={true}
          className="mt-5"
        >
          <SwiperSlide>
            <div className="flex shrink-0 overflow-hidden items-center justify-center rounded-full h-10 w-28 bg-primary text-white text-sm font-bold gap-2">
              <div className="relative w-4 h-4">
                <Image
                  src="/crown.svg"
                  alt="crown"
                  objectFit="contain"
                  layout="fill"
                />
              </div>
              Terajin
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex shrink-0 overflow-hidden items-center justify-center rounded-full h-10 w-28 bg-primary text-white text-sm font-bold gap-2">
              <div className="relative w-4 h-4">
                <Image
                  src="/crown.svg"
                  alt="crown"
                  objectFit="contain"
                  layout="fill"
                />
              </div>
              Terbaik
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex shrink-0 overflow-hidden items-center justify-center rounded-full h-10 w-28 bg-primary text-white text-sm font-bold gap-2">
              <div className="relative w-4 h-4">
                <Image
                  src="/crown.svg"
                  alt="crown"
                  objectFit="contain"
                  layout="fill"
                />
              </div>
              Tercepat
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex shrink-0 overflow-hidden items-center justify-center rounded-full h-10 w-28 bg-primary text-white text-sm font-bold gap-2">
              <div className="relative w-4 h-4">
                <Image
                  src="/crown.svg"
                  alt="crown"
                  objectFit="contain"
                  layout="fill"
                />
              </div>
              Terter
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      <div className="mt-10 flex flex-wrap w-full">
        <h1 className="font-bold text-lg w-full">Env Profile</h1>
        <div className="mt-5 border flex items-center gap-5 w-full rounded-xl p-5 border-gray-400">
          <div className="relative h-24 w-32">
            <Image
              src="/weather.svg"
              objectFit="contain"
              layout="fill"
              alt="weather"
            />
          </div>
          <div className="font-bold w-1/2">
            <div className="text-[#CCCCCC] mb-2 w-full text-xs flex justify-between">
              Humidity
              <p className="text-black">70</p>
            </div>
            <div className="text-[#CCCCCC] mb-2 w-full text-xs flex justify-between">
              Temperature
              <p className="text-black">70</p>
            </div>
            <div className="text-[#CCCCCC] mb-2 w-full text-xs flex justify-between">
              Kinds
              <p className="text-black">2</p>
            </div>
            <div className="text-[#CCCCCC] mb-2 w-full text-xs flex justify-between">
              Jenis pupuk
              <p className="text-black">Kaltim</p>
            </div>
            <div className="text-[#CCCCCC] mb-2 w-full text-xs flex justify-between">
              Jumlah
              <p className="text-black">3</p>
            </div>
            <div className="text-[#CCCCCC] mb-2 w-full text-xs flex justify-between">
              Jumlah
              <p className="text-black">4</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
