import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import Badge from '@/components/Badge';
import Navbar from '@/components/Navbar';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { useEffect } from 'react';
import { getProfile } from '@/components/actions/userActions';
import { USER_GET_PROFILE_SUCCESS } from 'constants/userConstants';

export default function Profile(props) {
  const dispatch = useDispatch();
  let user = useSelector((state) => state.user);

  const badges = ['Terajin', 'Terbaik', 'Tercepat', 'Terjadi'];
  const envProfile = [
    { name: 'Humidity', value: '70' },
    { name: 'Temperature', value: '70' },
    { name: 'Kinds', value: '2' },
    { name: 'Jenis Pupuk', value: 'Kaltim' },
    { name: 'Jumlah', value: '3' },
    { name: 'Jumlah', value: '4' },
  ];

  // Ambil payload pakai SSR
  // if (user?.user?.data?.email == null) {
  //   dispatch({ type: USER_GET_PROFILE_SUCCESS, payload: props.user });
  // }

  // Ambil dari client side
  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);
  return (
    <div className="container mx-auto p-5 flex flex-wrap justify-center">
      <div className="flex items-center  justify-center w-full">
        <h1 className="font-bold text-2xl text-center">My Profile</h1>
        <Link href="/profile/edit">
          <a className="fixed ml-64 pt-1">
            <div className="w-5 h-5 relative items-center justify-self-end">
              <Image
                src="/assets/edit.svg"
                objectFit="contain"
                layout="fill"
                alt="edit"
              ></Image>
            </div>
          </a>
        </Link>
      </div>

      <div className="pt-10 flex w-full items-center">
        <div className="rounded-full w-20 h-20 relative overflow-hidden">
          <Image
            src="/assets/profileimage.png"
            objectFit="cover"
            layout="fill"
            alt="profile picture"
            loading="lazy"
          ></Image>
        </div>
        <div className="w-2/3 ml-5 flex flex-wrap gap-1">
          <h1 className="font-bold w-full text-lg">
            {props?.user?.data?.email || user?.user?.data?.email}
          </h1>
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
              src="/assets/weather.svg"
              objectFit="contain"
              layout="fill"
              alt="weather"
              loading="lazy"
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

      <Navbar active="profile" />
    </div>
  );
}

// export async function getServerSideProps({ req }) {
//   const res = await fetch('http://localhost:5000/api/user/', {
//     method: 'GET',
//     credentials: true,
//     headers: {
//       cookie: `refreshToken=${req.cookies.refreshToken}; accessToken=${req.cookies.accessToken};`,
//       content: 'application/json',
//     },
//   });
//   const data = (await res.json()).data;
//   return {
//     props: {
//       user: { data },
//     },
//   };
// }
