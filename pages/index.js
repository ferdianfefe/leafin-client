import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";

import {
  getUserPlant,
  getServerUserPlant,
} from "@/components/actions/userPlantActions";
import { getProfile, getServerProfile } from "@/components/actions/userActions";
import {
  USER_GET_USERPLANT_REQUEST,
  USER_GET_USERPLANT_SUCCESS,
} from "constants/userConstants";
import {
  USER_GET_PROFILE_REQUEST,
  USER_GET_PROFILE_SUCCESS,
} from "constants/userConstants";
import { wrapper } from "@/components/store/store";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

Index.getInitialProps = wrapper.getInitialPageProps(
  ({ getState, dispatch }) =>
    async ({ req }) => {
      const { userPlant } = getState();
      if (userPlant.plants == null && !process.browser) {
        dispatch({ type: USER_GET_USERPLANT_REQUEST });

        const data = await getServerUserPlant(req);

        dispatch({ type: USER_GET_USERPLANT_SUCCESS, payload: data });
      } else if (userPlant.plants == null) {
        dispatch(getUserPlant());
      } else {
        console.log("sudah ada data");
      }

      /* Get profile */
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

/* 
Profile.getInitialProps = wrapper.getInitialPageProps(
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
        console.log('sudah ada data');
      }
    }
);

*/

export default function Index(props) {
  let reduxPlant = useSelector((state) => state.userPlant);
  let user = useSelector((state) => state.user);
  const [plant, setPlant] = useState([
    {
      _id: 1,
      name: "Plant 1",
      plantType: {
        pictureFileURL: "/assets/leafinLogo.svg",
      },
    },
    {
      _id: 2,
      name: "Plant 2",
      plantType: {
        pictureFileURL: "/assets/leafinLogo.svg",
      },
    },
  ]);

  const [feeds, setFeeds] = useState([
    {
      _id: 1,
      author: "Budi",
      title: "Hasil Tanam Menggunakan Alat Otomatis dari Leafin",
      pictureFileURL: "/assets/leafinLogo.svg",
      likes: 100,
      views: 200,
    },
    {
      _id: 2,
      author: "Sarah",
      title: "Tips Pemula Dalam Menggunakan Pupuk Kompos",
      pictureFileURL: "/assets/leafinLogo.svg",
      likes: 100,
      views: 200,
    },
  ]);

  const [items, setItems] = useState([
    {
      _id: 1,
      name: "Pupuk Navos",
      price: 12.59,
      pictureFileURL: "/assets/leafinLogo.svg",
    },
    {
      _id: 2,
      name: "Pupuk ZA",
      price: 14.0,
      pictureFileURL: "/assets/leafinLogo.svg",
    },
  ]);

  // useEffect(() => {
  //   setPlant(reduxPlant?.plants?.data?.plants || []);
  // }, [setPlant, reduxPlant?.plants?.data?.plants]);

  function getWeekDays(locale) {
    let baseDate = new Date();
    let weekDays = [];
    for (let i = 0; i < 7; i++) {
      const today = i == 0 ? true : false;
      weekDays.push({
        name: baseDate.toLocaleDateString(locale, { weekday: "narrow" }),
        date: baseDate.getDate(),
        today,
      });
      baseDate.setDate(baseDate.getDate() + 1);
    }
    return weekDays;
  }

  const date = getWeekDays("id-ID");

  // const plantProgress = [
  //   {
  //     name: 'Orchidaceae',
  //     score: '95%',
  //     img: '/assets/orchidaceae.png',
  //     href: 'activities/orchidaceae',
  //   },
  //   {
  //     name: 'Jasminum',
  //     score: '95%',
  //     img: '/assets/jasminum.png',
  //     href: 'activities/jasminum',
  //   },
  // ];
  return (
    <>
      <div className="bg-[#CFFFD9] w-full h-72">
        <nav className="flex flex-between">
          <div className="mt-10 px-5 flex flex-1 items-center">
            <div className="w-8 h-8 relative mr-3">
              <Image
                src={"/assets/leafinLogo.svg"}
                layout="fill"
                alt="leafin"
              />
            </div>
            <h1 className="text-2xl font-extrabold text-primary">Leafin</h1>
          </div>
          <div className="mt-10 px-5 flex flex-1 flex-row-reverse items-center">
            {props?.user?.data?.pictureFileURL ||
            user?.user?.data?.pictureFileURL ? (
              <div className="rounded-lg w-8 h-8 relative overflow-hidden">
                <Image
                  src={
                    props?.user?.data?.pictureFileURL ||
                    user?.user?.data?.pictureFileURL
                  }
                  objectFit="cover"
                  layout="fill"
                  alt="profile picture"
                  loading="lazy"
                ></Image>
              </div>
            ) : (
              <div className="rounded-lg w-20 h-20 bg-[#C4C4C4]"></div>
            )}
            <div className="w-6 h-6 relative mr-3">
              <Image src={"/assets/gearIcon.svg"} layout="fill" alt="gear" />
            </div>
            <div className="w-6 h-6 relative mr-3">
              <Image src={"/assets/bellIcon.svg"} layout="fill" alt="bell" />
            </div>
          </div>
        </nav>
      </div>
      <div className=" bg-[#E5E5E5]/30 min-h-screen">
        <div className="container mx-auto px-5 flex flex-col">
          <div className="bg-white z-10 pb-3 -mt-12 border w-full h-full rounded-xl">
            <div className="flex justify-between items-center px-1">
              {date.map(({ name, date, today }, i) => {
                return (
                  <div
                    key={i}
                    className={`w-full font-prompt flex-wrap flex justify-center text-center pt-2 pb-1 ${
                      today ? "text-[#1A9F35]" : "text-[#D2E7D6]"
                    }`}
                  >
                    <span className="text-xs w-full font-semibold uppercase">
                      {name}
                    </span>
                    <span
                      className={`mt-2 text-lg flex justify-center items-center w-9 h-9 ${
                        today
                          ? `bg-gradient-to-tl shadow-lg shadow-[#D2E7D6] from-[#199E34] to-[#31C14F] rounded-lg text-white`
                          : `text-black`
                      }  `}
                    >
                      {date}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
          <Link href="/ar">
            <a className="mt-3 font-semibold bg-white py-3 border w-full rounded-xl flex justify-center items-center">
              <div className="w-6 h-6 relative mr-3">
                <Image
                  src={"/assets/barcode-scanner.svg"}
                  layout="fill"
                  alt="barcode"
                />
              </div>
              Scan Environment
            </a>
          </Link>
          <Link href="/device/add">
            <a className="mt-3 font-semibold bg-white py-3 border w-full rounded-xl flex justify-center items-center">
              <div className="w-6 h-6 relative mr-3">
                <Image
                  src={"/assets/plusIcon.svg"}
                  layout="fill"
                  alt="barcode"
                />
              </div>
              Add Device
            </a>
          </Link>

          <div className="font-bold mt-10 w-full">
            <label className="text-left">Your Devices</label>
            <div className="flex mt-5 justify-between flex-wrap gap-y-3">
              {plant.map(({ name, _id, plantType }, i) => {
                return (
                  <Link key={i} href={"activities/" + _id}>
                    <a className="bg-white w-[48%] py-5 rounded-xl flex flex-col items-center justify-center">
                      <div className="w-28 h-28 relative overflow-hidden">
                        <Image
                          src={plantType.pictureFileURL}
                          objectFit="cover"
                          layout="fill"
                          alt="profile picture"
                          loading="lazy"
                        ></Image>
                      </div>
                      {/* <p className="text-xs font-normal mt-3 text-[#9FCDA8]">
                        Overal Score{' '}
                        <strong className="text-[#1F8734]">{score}</strong>
                      </p> */}
                      <p className="mt-5">{name}</p>
                    </a>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="font-bold mt-10 w-full">
            <label className="text-left">Popular</label>
            <div className="flex flex-col mt-5 justify-between flex-wrap gap-y-3">
              {feeds.map(
                ({ author, title, _id, pictureFileURL, likes, views }, i) => {
                  return (
                    <Link key={i} href={"activities/" + _id}>
                      <a className="bg-white py-5 rounded-xl flex flex">
                        <div className="rounded-full flex-none w-20 h-fit relative overflow-hidden">
                          <Image
                            src={pictureFileURL}
                            objectFit="cover"
                            layout="fill"
                            alt="profile picture"
                            loading="lazy"
                          ></Image>
                        </div>
                        <div className="flex-1">
                          <p className="mt-5 text-primary">{author}</p>
                          <p className="mt-1 font-bold">{title}</p>

                          <div className="flex justify-start mt-5">
                            <div className="flex-1 flex items-center">
                              <div className="w-6 h-6 relative mr-3">
                                <Image
                                  src={"/assets/borderHeartIcon.svg"}
                                  layout="fill"
                                  alt="heart"
                                />
                              </div>
                              <p className="text-[#E1E1E1]">{likes}</p>
                            </div>
                            <div className="flex-1 flex items-center">
                              <div className="w-6 h-6 relative mr-3">
                                <Image
                                  src={"/assets/borderEyeIcon.svg"}
                                  layout="fill"
                                  alt="eye"
                                />
                              </div>
                              <p className="text-[#E1E1E1]">{views}</p>
                            </div>
                          </div>
                        </div>
                      </a>
                    </Link>
                  );
                }
              )}
            </div>
          </div>

          <div className="font-bold mt-10 mb-20 w-full">
            <label className="text-left">Popular Items</label>
            <div className="flex mt-5 justify-between flex-wrap gap-y-3">
              {items.map(({ name, _id, price, pictureFileURL }, i) => {
                return (
                  <Link key={i} href={"activities/" + _id}>
                    <a className="bg-white w-[48%] rounded-xl flex flex-col">
                      <div className="w-full flex justify-center py-3">
                        <div className="w-28 h-28 relative overflow-hidden">
                          <Image
                            src={pictureFileURL}
                            objectFit="cover"
                            layout="fill"
                            alt="profile picture"
                            loading="lazy"
                          ></Image>
                        </div>
                      </div>
                      {/* <p className="text-xs font-normal mt-3 text-[#9FCDA8]">
                        Overal Score{' '}
                        <strong className="text-[#1F8734]">{score}</strong>
                      </p> */}
                      <div className="p-4">
                        <p className="">{name}</p>
                        <p className="mt-2">{price} $</p>
                      </div>
                    </a>
                  </Link>
                );
              })}
            </div>
          </div>
          <Navbar active="home" />
        </div>
      </div>
    </>
  );
}
