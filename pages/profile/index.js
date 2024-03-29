import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import Badge from '@/components/Badge';
import Navbar from '@/components/Navbar';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { getProfile, getServerProfile } from '@/components/actions/userActions';
import {
  USER_GET_PROFILE_REQUEST,
  USER_GET_PROFILE_SUCCESS,
  USER_GET_USERPLANT_REQUEST,
  USER_GET_USERPLANT_SUCCESS,
} from 'constants/userConstants';
import { wrapper } from '@/components/store/store';
import { useEffect, useState } from 'react';
import {
  getServerUserPlant,
  getUserPlant,
} from '@/components/actions/userPlantActions';
import { useRouter } from 'next/router';
import Button from '@/components/Button';

Profile.getInitialProps = wrapper.getInitialPageProps(
  ({ getState, dispatch }) =>
    async ({ req }) => {
      const { user, userPlant } = getState();
      if (user.user?.data == null && !process.browser) {
        dispatch({ type: USER_GET_PROFILE_REQUEST });

        const data = await getServerProfile(req);

        dispatch({ type: USER_GET_PROFILE_SUCCESS, payload: data });
      } else if (user.user?.data == null) {
        dispatch(getProfile());
      }

      /* User Plant */
      if (userPlant.plants == null && !process.browser) {
        dispatch({ type: USER_GET_USERPLANT_REQUEST });

        const data = await getServerUserPlant(req);

        dispatch({ type: USER_GET_USERPLANT_SUCCESS, payload: data });
      } else if (userPlant.plants == null) {
        dispatch(getUserPlant());
      }
    }
);

export default function Profile(props) {
  let user = useSelector((state) => state.user);
  let reduxPlant = useSelector((state) => state.userPlant);
  const [plant, setPlant] = useState([]);
  const router = useRouter();

  useEffect(() => {
    setPlant(reduxPlant?.plants?.data?.plants || []);
  }, [setPlant, reduxPlant?.plants?.data?.plants]);

  const envProfile = [
    { name: 'Humidity', value: '70' },
    { name: 'Temperature', value: '70' },
    { name: 'Kinds', value: '2' },
    { name: 'Jenis Pupuk', value: 'Kaltim' },
    { name: 'Jumlah', value: '3' },
    { name: 'Jumlah', value: '4' },
  ];

  const logout = async () => {
    const res = await fetch(`/api/logout`, {
      method: 'GET',
    });

    router.push('/home');
  };

  return (
    <div className="container mx-auto p-5 flex flex-wrap justify-center">
      <div className="flex items-center  justify-center w-full">
        <h1 className="font-bold text-2xl text-center">My Profile</h1>
        <Link href="/profile/edit">
          <a className="absolute ml-64">
            <div className="w-5 h-5 relative items-center justify-self-end">
              <Image
                src="/assets/edit.svg"
                objectFit="contain"
                layout="fill"
                alt="edit"
                priority
              ></Image>
            </div>
          </a>
        </Link>
      </div>

      <div className="pt-10 flex w-full items-center">
        {props?.user?.data?.pictureFileURL ||
        user?.user?.data?.pictureFileURL ? (
          <div className="rounded-full w-20 h-20 relative overflow-hidden">
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
          <div className="rounded-full w-20 h-20 bg-[#C4C4C4]"></div>
        )}
        <div className="w-2/3 ml-5 flex flex-wrap gap-1">
          <h1 className="font-bold w-full text-lg">
            {props?.user?.data?.name ||
              user?.user?.data?.name ||
              props?.user?.data?.email ||
              user?.user?.data?.email}
          </h1>
          {(props?.user?.data?.description ||
            user?.user?.data?.description) && (
            <p className="text-xs text-gray-light">
              {props?.user?.data?.description || user?.user?.data?.description}
            </p>
          )}
        </div>
      </div>

      <div className="mt-10 flex flex-wrap items-center w-full justify-start">
        <h1 className="font-bold text-lg w-full mb-2">Badges</h1>
        <Badge>Level 1</Badge>
      </div>
      {plant.length != 0 && (
        <div className="font-bold mt-10 w-full">
          <label className="text-left">Devices</label>
          <div className="flex mt-5 justify-between flex-wrap gap-y-3">
            {plant.map(({ name, _id, plantType }, i) => {
              if (i < 2)
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
      )}

      <div className="mt-8 mb-20 w-full h-full">
        <Button
          className="border border-primary font-bold text-primary"
          onClick={logout}
        >
          Switch to other account
        </Button>
        <div className="mt-5 flex w-full justify-center">
          <button className="text-[#A7A7A7] font-bold" onClick={logout}>
            Log Out
          </button>
        </div>
      </div>

      <Navbar active="profile" />
    </div>
  );
}
