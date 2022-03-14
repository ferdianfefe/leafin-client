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
  USER_GET_USERPLANT_REQUEST,
  USER_GET_USERPLANT_SUCCESS,
} from 'constants/userConstants';
import {
  getServerUserPlant,
  getUserPlant,
} from '@/components/actions/userPlantActions';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import {
  getAllPlantsLogs,
  getServerAllPlantsLogs,
} from '@/components/actions/logActions';

Activities.getInitialProps = wrapper.getInitialPageProps(
  ({ getState, dispatch }) =>
    async ({ req }) => {
      const { userPlant, log } = getState();
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
        dispatch({ type: USER_GET_ALL_USERPLANT_LOG_REQUEST });

        const data = await getServerAllPlantsLogs(req);

        dispatch({ type: USER_GET_ALL_USERPLANT_LOG_SUCCESS, payload: data });
      } else {
        dispatch(getAllPlantsLogs());
      }
    }
);

export default function Activities() {
  let reduxPlant = useSelector((state) => state.userPlant);
  let reduxLogs = useSelector((state) => state.log);
  const [todo, setTodo] = useState([]);

  const dispatch = useDispatch();

  const [logs, setLogs] = useState([
    {
      name: 'Temperature',
      data: [],
    },
    {
      name: 'Humidity',
      data: [],
    },
    {
      name: 'Sunlight',
      data: [],
    },
  ]);
  const [plant, setPlant] = useState([]);

  useEffect(() => {
    setPlant(reduxPlant?.plants?.data?.plants || []);
  }, [setPlant, reduxPlant?.plants?.data?.plants]);

  useEffect(() => {
    reduxLogs.logs?.data.map((data, i) => {
      if (data != null) {
        const { temperature, humidity, lightIntensity, userPlant } = data;

        logs[0].data[i] = {
          name: userPlant.plantType.name,
          percentage: temperature,
          batasAman: 28,
        };

        logs[1].data[i] = {
          name: userPlant.plantType.name,
          percentage: humidity,
          batasAman: 70,
        };

        if (humidity < 70) {
          removeTodo(`Water your ${userPlant.plantType.name}`);
          const data = `Your ${userPlant.plantType.name} automatically watered`;
          const x = todo.filter((x) => x.todo == data);
          if (x.length == 0) addTodo('/assets/water.svg', data);
        } else if (humidity < 75) {
          removeTodo(`Your ${userPlant.plantType.name} automatically watered`);
          const data = `Water your ${userPlant.plantType.name}`;
          const x = todo.filter((x) => x.todo == data);
          if (x.length == 0) addTodo('/assets/water.svg', data);
        } else {
          removeTodo(`Your ${userPlant.plantType.name} automatically watered`);
          removeTodo(`Water your ${userPlant.plantType.name}`);
        }

        logs[2].data[i] = {
          name: userPlant.plantType.name,
          percentage: Math.ceil((lightIntensity / 10000) * 100),
          batasAman: 50,
        };
        if (lightIntensity > 5000) {
          removeTodo(`Move ${userPlant.plantType.name} to brighter area`);
          const data = `Move ${userPlant.plantType.name} to darker area`;
          const x = todo.filter((x) => x.todo == data);
          if (x.length == 0) addTodo('/assets/sun.svg', data);
        } else if (lightIntensity < 1000) {
          removeTodo(`Move ${userPlant.plantType.name} to darker area`);
          const data = `Move ${userPlant.plantType.name} to brighter area`;
          const x = todo.filter((x) => x.todo == data);
          if (x.length == 0) addTodo('/assets/sun.svg', data);
        } else {
          removeTodo(`Move ${userPlant.plantType.name} to darker area`);
          removeTodo(`Move ${userPlant.plantType.name} to brighter area`);
        }
        setTallest([0, 0, 0]);
        setLogs((prevState) => [...prevState]);
      }
    });
  }, [reduxLogs]);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(getAllPlantsLogs());
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const addTodo = (svg, todo) => {
    setTodo((prevState) => [...prevState, { svg, todo }]);
  };

  const removeTodo = (todo) => {
    setTodo((prevState) => prevState.filter((index) => index.todo !== todo));
  };

  const [tallest, setTallest] = useState([0, 0, 0]);

  return (
    <>
      <div className="container mx-auto p-5 flex flex-wrap justify-center">
        <h1 className="font-bold text-2xl text-center px-10 w-full mb-5">
          Activities
        </h1>
        <Swiper className="w-full h-full">
          {logs.map(({ name, data }, x) => {
            const length = data.length < 5 ? data.length : 5;
            const width = (1 / length) * 100;
            return (
              <SwiperSlide key={x}>
                <div className="flex justify-center w-full items-center rounded-2xl border-2 mb-10 flex-wrap">
                  <p className="my-3 ml-5 font-semibold text-start w-full text-md mb-5">
                    {name}
                  </p>
                  <div className={`flex items-end w-full mx-3`}>
                    {data.map(({ name, percentage, batasAman }, i) => {
                      const height = percentage * 2 + 'px';

                      if (tallest[x] < parseInt(height)) {
                        tallest[x] = parseInt(height);
                        setTallest((prevState) => [...prevState]);
                      }
                      let color;
                      if (x == 2) {
                        if (percentage < 50 && percentage >= 10) {
                          color = '#24A3FF';
                        } else {
                          color = '#F2575D';
                        }
                      } else if (x == 0) {
                        if (percentage <= batasAman) {
                          color = '#24A3FF';
                        } else {
                          color = '#F2575D';
                        }
                      } else {
                        if (percentage >= batasAman) {
                          color = '#24A3FF';
                        } else {
                          color = '#F2575D';
                        }
                      }
                      let textColor;
                      if (x == 2) {
                        if (percentage < 50 && percentage >= 10) {
                          textColor = '#000000';
                        } else {
                          textColor = '#F2575D';
                        }
                      } else if (x == 0) {
                        if (percentage <= batasAman) {
                          textColor = '#000000';
                        } else {
                          textColor = '#F2575D';
                        }
                      } else {
                        if (percentage >= batasAman) {
                          textColor = '#000000';
                        } else {
                          textColor = '#F2575D';
                        }
                      }
                      if (i < length) {
                        return (
                          <div
                            key={i}
                            style={{ width: width + '%' }}
                            className={`flex flex-col justify-center items-center`}
                          >
                            <p style={{ color: textColor }} className="text-sm">
                              {x == 0 ? percentage : percentage + '%'}
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
                                top: tallest[x] + 85,
                              }}
                              className={`text-xs text-center  w-[50px] absolute items-start`}
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

        <div className="font-bold mt-10 w-full">
          <label className="text-left">All Plants</label>
          <div className="flex mt-3 justify-between flex-wrap gap-y-3">
            <Swiper
              slidesPerView={plant.length < 3 ? plant.length : 3}
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
                            src={
                              plantType.pictureFileURL ||
                              plantType.pictureFileId
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
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>

        <div className="font-bold mt-10 w-full mb-14">
          <label className="text-left">To do List</label>
          <div className="flex flex-wrap gap-2 justify-center w-full items-center mt-5">
            {todo.map(({ svg, todo }, i) => {
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
