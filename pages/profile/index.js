import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useEffect } from "react";
import { getProfile } from "../../components/actions/userActions";
import Badge from "../../components/Badge";
import Navbar from "../../components/Navbar";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function Profile({ user }) {
  const dispatch = useDispatch();
  useEffect(async () => {
    await dispatch(getProfile());
  }, []);
  user = useSelector((state) => state.user);
  console.log(user);
  const { email } = user;
  const badges = ["Terajin", "Terbaik", "Tercepat", "Terjadi"];
  const envProfile = [
    { name: "Humidity", value: "70" },
    { name: "Temperature", value: "70" },
    { name: "Kinds", value: "2" },
    { name: "Jenis Pupuk", value: "Kaltim" },
    { name: "Jumlah", value: "3" },
    { name: "Jumlah", value: "4" },
  ];

  return (
    <div className="container mx-auto p-5 flex flex-wrap justify-center">
      <div className="flex items-center">
        <h1 className="font-bold text-2xl px-10">My Profile</h1>
        <Link href="profile/edit">
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
        </Link>
      </div>

      <div className="pt-10 flex w-full items-center ">
        <div className="rounded-full w-20 h-20 relative overflow-hidden">
          <Image
            src="/profileimage.png"
            objectFit="cover"
            layout="fill"
            alt="profile picture"
            loading="lazy"
          ></Image>
        </div>
        <div className="ml-5 flex flex-wrap gap-1">
          <h1 className="font-bold text-lg w-full">{email}</h1>
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
//   const dispatch = useDispatch();
//   const { data } = await dispatch(getProfile());
//   console.log(data);
//   // const data = await fetch('http://localhost:5000/api/user/', {
//   //   method: 'GET',
//   //   credentials: true,
//   //   headers: {
//   //     cookie: `refreshToken=${req.cookies.refreshToken}; accessToken=${req.cookies.accessToken};`,
//   //     content: 'application/json',
//   //   },
//   // });
//   // const result = (await data.json()).data;
//   return {
//     props: {
//       user: data,
//     },
//   };
// }
