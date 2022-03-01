import Navbar from '../../components/Navbar';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import Image from 'next/image';
import Link from 'next/link';
import { wrapper } from '@/components/store/store';
import {
  USER_GET_ALL_USERPLANT_LOG_REQUEST,
  USER_GET_ALL_USERPLANT_LOG_SUCCESS,
  USER_GET_PROFILE_REQUEST,
  USER_GET_PROFILE_SUCCESS,
  USER_GET_USERPLANT_REQUEST,
  USER_GET_USERPLANT_SUCCESS,
} from 'constants/userConstants';
import { getProfile, getServerProfile } from '@/components/actions/userActions';
import {
  getServerUserPlant,
  getUserPlant,
} from '@/components/actions/userPlantActions';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import {
  getAllPlantsLogs,
  getServerAllPlantsLogs,
} from '@/components/actions/logActions';

Activities.getInitialProps = wrapper.getInitialPageProps(
  ({ getState, dispatch }) =>
    async ({ req }) => {
      const { userPlant, log, user } = getState();
      /* User Plant */
      if (userPlant.plants == null && !process.browser) {
        dispatch({ type: USER_GET_USERPLANT_REQUEST });

        const data = await getServerUserPlant(req);

        dispatch({ type: USER_GET_USERPLANT_SUCCESS, payload: data });
      } else if (userPlant.plants == null) {
        dispatch(getUserPlant());
      }

      /* Logs */
      if (log.logs == null && !process.browser) {
        console.log('sini1');
        dispatch({ type: USER_GET_ALL_USERPLANT_LOG_REQUEST });

        const data = await getServerAllPlantsLogs(req);

        dispatch({ type: USER_GET_ALL_USERPLANT_LOG_SUCCESS, payload: data });
      } else if (log.logs == null) {
        console.log('sini2');
        dispatch(getAllPlantsLogs());
      }
    }
);

export default function Activities() {
  let reduxPlant = useSelector((state) => state.userPlant);
  let reduxLogs = useSelector((state) => state.log);
  const [logs, setLogs] = useState([
    {
      name: 'Water Level',
      data: [],
    },
    {
      name: 'Humidity',
      data: [],
    },
    {
      name: 'Light Intensity',
      data: [],
    },
  ]);
  // const [plant, setPlant] = useState([]);

  // useEffect(() => {
  //   console.log(reduxPlant?.plants?.data?.plants);
  //   setPlant(reduxPlant?.plants?.data?.plants || []);
  // }, [setPlant, reduxPlant?.plants?.data?.plants]);

  useEffect(() => {
    reduxLogs.logs?.data.map((data) => {
      if (data != null) {
        const { waterLevel, humidity, lightIntensity, userPlant } = data;
        logs[0].data.push({
          name: userPlant.plantType.name,
          percentage: waterLevel,
        });
        logs[1].data.push({
          name: userPlant.plantType.name,
          percentage: humidity,
        });
        logs[2].data.push({
          name: userPlant.plantType.name,
          percentage: lightIntensity,
        });
        setLogs((prevState) => [...prevState]);
      }
    });
  }, [reduxLogs.logs?.data]);

  // const test = [
  //   {
  //     name: 'Water Level',
  //     data: [
  //       {
  //         name: 'Orchidaceae',
  //         percentage: 54,
  //       },
  //       {
  //         name: 'Zingiberofficinale',
  //         percentage: 29,
  //       },
  //       {
  //         name: 'Jasminum',
  //         percentage: 63,
  //       },
  //       {
  //         name: 'Bougainville',
  //         percentage: 48,
  //       },
  //       {
  //         name: 'Oryzasativa',
  //         percentage: 16,
  //       },
  //     ],
  //   },
  //   {
  //     name: 'Daym Level',
  //     data: [
  //       {
  //         name: 'Orchidaceae',
  //         percentage: 54,
  //       },
  //       {
  //         name: 'Zingiberofficinale',
  //         percentage: 29,
  //       },
  //       {
  //         name: 'Jasminum',
  //         percentage: 63,
  //       },
  //       {
  //         name: 'Bougainville',
  //         percentage: 48,
  //       },
  //       {
  //         name: 'Oryzasativa',
  //         percentage: 16,
  //       },
  //       {
  //         name: 'Rosa',
  //         percentage: 59,
  //       },
  //     ],
  //   },
  // ];

  const [plant, setPlant] = useState([
    {
      _id: 1,
      name: 'Plant 1',
      plantType: {
        pictureFileId: '/assets/leafinLogo.svg',
      },
    },
    {
      _id: 2,
      name: 'Plant 2',
      plantType: {
        pictureFileId: '/assets/leafinLogo.svg',
      },
    },
    {
      _id: 3,
      name: 'Plant 3',
      plantType: {
        pictureFileId: '/assets/leafinLogo.svg',
      },
    },
    {
      _id: 4,
      name: 'Plant 4',
      plantType: {
        pictureFileId: '/assets/leafinLogo.svg',
      },
    },
  ]);

  const todolist = [
    { svg: '/assets/water.svg', todo: 'Watering Orchidaceae' },
    { svg: '/assets/water.svg', todo: 'Watering Orchidaceae' },

    { svg: '/assets/water.svg', todo: 'Watering Rosa' },
  ];

  return (
    <>
      <div className="container mx-auto p-5 flex flex-wrap justify-center">
        {/* <div className="flex flex-col w-full justify-center items-center"> */}
        <h1 className="font-bold text-2xl text-center px-10 w-full mb-5">
          Activities
        </h1>
        <Swiper className="w-full">
          {logs.map(({ name, data }, i) => {
            const length = data.length < 5 ? data.length : 5;
            const width = (1 / length) * 100;
            return (
              <SwiperSlide
                key={i}

                // className="flex flex-wrap justify-center items-center mb-10"
              >
                <div className="flex justify-center w-full items-center rounded-2xl border-2 mb-10 flex-wrap">
                  <p className="my-3 ml-5 font-semibold text-start w-full text-md mb-5">
                    {name}
                  </p>
                  <div className={`flex items-end w-full mx-3`}>
                    {data.map(({ name, percentage }, i) => {
                      const height = percentage * 2 + 'px';
                      const color = percentage > 30 ? '#24A3FF' : '#F2575D';
                      const textColor = percentage > 30 ? '#000000' : '#F2575D';
                      if (i < length) {
                        return (
                          <div
                            style={{ width: width + '%' }}
                            className={`flex flex-col justify-center items-center`}
                          >
                            <p style={{ color: textColor }} className="text-sm">
                              {percentage}%
                            </p>
                            <div
                              style={{
                                height,
                                backgroundColor: color,
                              }}
                              className={`w-[40px] rounded-t-md`}
                            ></div>
                            <p
                              style={{
                                wordWrap: 'break-word',
                              }}
                              className={`text-xs text-center  w-[50px] bottom-1 absolute items-start`}
                            >
                              {name}
                            </p>
                          </div>
                        );
                      }
                    })}
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>

        {/* </div> */}

        <div className="font-bold mt-10 w-full">
          <label className="text-left">All Plants</label>
          <div className="flex mt-3 justify-between flex-wrap gap-y-3">
            <Swiper
              slidesPerView={3}
              spaceBetween={5}
              slidesPerGroup={3}
              loopFillGroupWithBlank={true}
            >
              {plant.map(({ name, _id, plantType }, i) => {
                return (
                  <SwiperSlide key={i}>
                    <Link href={'activities/' + _id}>
                      <a className="bg-[#DCFFE3] pt-2 pb-9 px-3 rounded-full flex flex-col items-center justify-center">
                        <div className="w-20 h-20 rounded-full relative overflow-hidden">
                          <Image
                            src={plantType.pictureFileId}
                            objectFit="cover"
                            layout="fill"
                            alt="profile picture"
                            loading="lazy"
                          ></Image>
                        </div>
                        <p className="mt-5">{name}</p>
                      </a>
                    </Link>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>

        <div className="font-bold mt-10 w-full mb-14">
          <label className="text-left">Todo List</label>
          <div className="flex flex-wrap gap-2 justify-center w-full items-center mt-5">
            {todolist.map(({ svg, todo }, i) => {
              return (
                <div
                  key={i}
                  className="flex items-center w-full border-2 px-2 h-12 rounded-lg"
                >
                  <div className="w-6 h-6 mr-2 relative">
                    <Image src={svg} layout="fill" alt="ph" />
                  </div>
                  <span className="ml-1 font-semibold">{todo}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Navbar active={'activities'}></Navbar>
    </>
  );
}
