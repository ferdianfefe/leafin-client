import Navbar from '@/components/Navbar';
import Image from 'next/image';
import Link from 'next/link';

import {
  getUserPlant,
  getServerUserPlant,
} from '@/components/actions/userPlantActions';
import { getProfile, getServerProfile } from '@/components/actions/userActions';
import {
  USER_GET_USERPLANT_REQUEST,
  USER_GET_USERPLANT_SUCCESS,
} from 'constants/userConstants';
import {} from 'constants/feedConstants';
import {
  USER_GET_PROFILE_REQUEST,
  USER_GET_PROFILE_SUCCESS,
} from 'constants/userConstants';

import {
  FEED_GET_ALL_REQUEST,
  FEED_GET_ALL_SUCCESS,
} from 'constants/feedConstants';
import {
  getAllFeeds,
  getServerAllFeeds,
} from '@/components/actions/feedActions';

import {
  MARKETPLACE_GET_ALL_REQUEST,
  MARKETPLACE_GET_ALL_SUCCESS,
} from 'constants/marketplaceConstants';

import {
  getServerAllProduct,
  getAllProduct,
} from '@/components/actions/marketplaceActions';

import { wrapper } from '@/components/store/store';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

Index.getInitialProps = wrapper.getInitialPageProps(
  ({ getState, dispatch }) =>
    async ({ req }) => {
      const { userPlant, user, feed, marketplace } = getState();
      if (userPlant.plants == null && !process.browser) {
        dispatch({ type: USER_GET_USERPLANT_REQUEST });

        const data = await getServerUserPlant(req);

        dispatch({ type: USER_GET_USERPLANT_SUCCESS, payload: data });
      } else {
        dispatch(getUserPlant());
      }

      /* Get profile */
      if (user.user?.data == null && !process.browser) {
        dispatch({ type: USER_GET_PROFILE_REQUEST });

        const data = await getServerProfile(req);

        dispatch({ type: USER_GET_PROFILE_SUCCESS, payload: data });
      } else if (user.user?.data == null) {
        dispatch(getProfile());
      }

      if (feed.feeds.length == 0 && !process.browser) {
        dispatch({ type: FEED_GET_ALL_REQUEST });

        const data = await getServerAllFeeds(req, 1, 2);

        dispatch({ type: FEED_GET_ALL_SUCCESS, payload: data });
      } else if (feed.feeds.length == 0) {
        dispatch(getAllFeeds(1, 2));
      }

      if (marketplace.products.length == 0 && !process.browser) {
        dispatch({ type: MARKETPLACE_GET_ALL_REQUEST });

        const data = await getServerAllProduct(req);

        dispatch({ type: MARKETPLACE_GET_ALL_SUCCESS, payload: data });
      } else if (marketplace.products.length == 0) {
        dispatch(getAllProduct());
      }
    }
);

export default function Index(props) {
  let reduxPlant = useSelector((state) => state.userPlant);
  let user = useSelector((state) => state.user);
  const [plant, setPlant] = useState([]);
  const feeds = useSelector((state) => state.feed.feeds);
  const products = useSelector((state) => state.marketplace.products);

  const [items, setItems] = useState([
    {
      name: 'Pupuk Nafos',
      price: 12.69,
      image: '/assets/Pupuk-Nafos.jpg',
      stars: 4,
    },
    {
      name: 'Pupuk ZA',
      price: 12.69,
      image: '/assets/Pupuk-ZA.jpg',
      stars: 4,
    },
  ]);

  useEffect(() => {
    setPlant(reduxPlant?.plants?.data?.plants || []);
  }, [setPlant, reduxPlant?.plants?.data?.plants]);

  function getWeekDays(locale) {
    let baseDate = new Date();
    let weekDays = [];
    for (let i = 0; i < 7; i++) {
      const today = i == 0 ? true : false;
      weekDays.push({
        name: baseDate.toLocaleDateString(locale, { weekday: 'narrow' }),
        date: baseDate.getDate(),
        today,
      });
      baseDate.setDate(baseDate.getDate() + 1);
    }
    return weekDays;
  }

  const date = getWeekDays('id-ID');

  const funcStars = (stars) => {
    let result = [];
    for (let i = 0; i < stars; i++) {
      result.push(
        <div key={i} className="w-[9px] h-[9px] relative">
          <Image
            src="/assets/stars.svg"
            alt="stars"
            layout="fill"
            loading="lazy"
          />
        </div>
      );
    }
    return result;
  };
  return (
    <>
      <div className="bg-[#CFFFD9] w-full h-[325px] relative overflow-hidden">
        <nav className="flex flex-between">
          <div className="mt-10 px-5 flex flex-1 items-center">
            <div className="w-7 h-7 relative mr-3">
              <Image
                src="/assets/leafinLogo.svg"
                layout="fill"
                alt="leafin"
                loading="lazy"
              />
            </div>
            <h1 className="text-xl font-extrabold bg-clip-text bg-gradient-to-r from-[#34C551] to-primary text-transparent">
              Leafin
            </h1>
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
              <div className="rounded-lg w-8 h-8 bg-[#C4C4C4]"></div>
            )}
            <div className="w-6 h-6 relative mr-3">
              <Image
                src={'/assets/gearIcon.svg'}
                layout="fill"
                alt="gear"
                loading="lazy"
              />
            </div>
            <div className="w-6 h-6 relative mr-3">
              <Image
                src={'/assets/bellIcon.svg'}
                layout="fill"
                alt="bell"
                loading="lazy"
              />
            </div>
          </div>
        </nav>
        <div className="absolute w-[319px] h-[296px] left-0 right-0 mx-auto top-[110px]">
          <Image src="/assets/white.svg" layout="fill" alt="white" priority />
        </div>
        <div className="absolute w-auto h-full left-2 right-0 mx-auto top-[82px]">
          <Image
            src="/assets/full.svg"
            layout="fill"
            alt="home"
            loading="lazy"
          />
        </div>
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
                      today ? 'text-[#1A9F35]' : 'text-[#D2E7D6]'
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
                  src={'/assets/barcode-scanner.svg'}
                  layout="fill"
                  alt="barcode icon"
                  loading="lazy"
                />
              </div>
              Scan Environment
            </a>
          </Link>
          <Link href="/device/add">
            <a className="mt-3 font-semibold bg-white py-3 border w-full rounded-xl flex justify-center items-center">
              <div className="w-6 h-6 relative mr-3">
                <Image
                  src={'/assets/plusIcon.svg'}
                  layout="fill"
                  alt="add icon"
                  loading="lazy"
                />
              </div>
              Add Device
            </a>
          </Link>

          <div className="font-bold mt-10 w-full">
            <label className="text-left">Your Devices</label>
            <div className="flex mt-5 justify-between flex-wrap gap-y-3">
              {plant.length == 0 && (
                <small className="text-[#B8B8B8] text-thin">
                  {"You don't have a device"}
                </small>
              )}
              {plant.map(({ name, _id, plantType }, i) => {
                return (
                  <Link key={i} href={'activities/' + _id}>
                    <a className="bg-white w-[48%] py-5 rounded-xl flex flex-col items-center justify-center">
                      <div className="w-28 h-28 rounded-full relative overflow-hidden">
                        <Image
                          src={
                            plantType.pictureFileURL || plantType.pictureFileId
                          }
                          objectFit="cover"
                          layout="fill"
                          alt="profile picture"
                          loading="lazy"
                        ></Image>
                      </div>
                      <p className="mt-5">{name}</p>
                    </a>
                  </Link>
                );
              })}
            </div>
          </div>

          {feeds.length > 0 && (
            <div className="font-bold mt-10 w-full">
              <label className="text-left">Popular</label>
              <div className="flex flex-col mt-5 justify-between flex-wrap gap-y-3">
                {feeds?.map(
                  ({ authorId, title, _id, imageFileURL, likes }, i) => {
                    if (i < 2) {
                      return (
                        <Link key={i} href={'activities/' + _id}>
                          <a className="bg-white py-5 rounded-xl flex items-center">
                            <div className="rounded-xl flex-none w-20 h-[100px] mx-3 relative overflow-hidden">
                              <Image
                                src={imageFileURL}
                                objectFit="cover"
                                layout="fill"
                                alt="profile picture"
                                loading="lazy"
                              ></Image>
                            </div>
                            <div className="flex-1">
                              <p className="text-primary font-semibold">
                                {authorId.name}
                              </p>
                              <p className="mt-1 font-bold pr-2">{title}</p>

                              <div className="flex justify-start mt-3">
                                <div className="flex-1 flex items-center">
                                  <div className="w-4 h-4 relative mr-1">
                                    <Image
                                      src={'/assets/borderHeartIcon.svg'}
                                      layout="fill"
                                      alt="heart"
                                      loading="lazy"
                                    />
                                  </div>
                                  <p className="text-[#E1E1E1] text-xs font-normal">
                                    {likes} likes
                                  </p>
                                </div>
                              </div>
                            </div>
                          </a>
                        </Link>
                      );
                    }
                  }
                )}
              </div>
            </div>
          )}
          {products.length > 0 && (
            <div className="font-bold mt-10 mb-20 w-full">
              <label className="text-left">Popular Items</label>
              <div className="flex mt-5 justify-between flex-wrap gap-y-3">
                {products.map(
                  ({ stars, title, price, imageFileURL, slug }, i) => {
                    if (i < 2) {
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
                              <div className="font-bold mb-1">{price} $</div>
                            </div>
                          </a>
                        </Link>
                      );
                    }
                  }
                )}
              </div>
            </div>
          )}
          <Navbar active="home" />
        </div>
      </div>
    </>
  );
}
