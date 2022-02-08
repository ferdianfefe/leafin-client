import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import Badge from '../../components/Badge';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default function Profile() {
  const badges = ['Terajin', 'Terbaik', 'Tercepat', 'Terter'];
  const envProfile = [
    { name: 'Humidity', value: '70' },
    { name: 'Temperature', value: '70' },
    { name: 'Kinds', value: '2' },
    { name: 'Jenis Pupuk', value: 'Kaltim' },
    { name: 'Jumlah', value: '3' },
    { name: 'Jumlah', value: '4' },
  ];

  return (
    <div className="container mx-auto p-5 flex flex-wrap justify-center">
      <div className="flex items-center">
        <h1 className="font-bold text-2xl px-10">My Profile</h1>
        <a as="edit profile" href="profile/edit">
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
          {badges.map((badge, i) => {
            return (
              <SwiperSlide key={i}>
                <Badge>{badge}</Badge>
              </SwiperSlide>
            );
          })}
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
              priority
            />
          </div>
          <div className="font-bold w-1/2">
            {envProfile.map(({ name, value }, i) => {
              return (
                <div
                  key={i}
                  className="text-[#CCCCCC] mb-2 w-full text-xs flex justify-between"
                >
                  {name}
                  <p className="text-black">{value}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
