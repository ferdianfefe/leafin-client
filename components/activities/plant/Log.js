import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import io from 'socket.io-client';
import { getPlantLog } from '@/components/actions/logActions';
// import config from '../../../config';

const Log = ({ props }) => {
  const userPlantLog = useSelector((state) => state.log.log);
  const [data, setData] = useState(
    userPlantLog ? userPlantLog : props.data.data
  );
  // const data = userPlantLog ? userPlantLog : props.data.data;
  const plantID = props.data.data.userPlant._id;
  // let socket;

  const [humidity, setHumidity] = useState(80);
  const [temperature, setTemperature] = useState(27);
  const [lightIntensity, setLightIntensity] = useState(1000);

  const dispatch = useDispatch();

  // useEffect(() => socketInitializer(), []);

  // const socketInitializer = async () => {
  //   socket = io(config.socketURL);

  //   socket.on('iot-data-update', async () => {
  //     console.log('socket data update');
  //     dispatch(getPlantLog(plantID));
  //   });
  // };

  useEffect(() => {
    // console.log(userPlantLog);
    setData(userPlantLog || props.data.data);
  }, [setData, userPlantLog]);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(getPlantLog(plantID));
      setLightIntensity((lightIntensity += 25));
      setHumidity(humidity--);
      setTemperature(Math.floor(Math.random() * (28 - 26 + 1)) + 26);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  /* Destroy socket io connection */
  // useEffect(
  //   () => () => {
  //     console.log('Destroying socket io connection');
  //     socket.disconnect();
  //   },
  //   []
  // );

  const plant = {
    data: [
      {
        name: 'sunlight',
        // data: data.lightIntensity || 0 + '%',
        data: lightIntensity || 0 + '%',
        svg: '/assets/sun.svg',
        color: 'FFC061',
        secColor: 'FFF0D9',
        batas: 10000,
      },
      {
        name: 'temperature',
        // data: data.temperature || 0 + '%',
        data: temperature || 0 + '%',
        svg: '/assets/water.svg',
        color: '61B4FF',
        secColor: 'C7E4FF',
        batas: 50,
      },
      {
        name: 'humidity',
        // data: data.humidity || 0 + '%',
        data: humidity || 0 + '%',
        svg: '/assets/humidity.svg',
        color: '0A7BE0',
        secColor: 'C7E4FF',
        batas: 100,
      },
    ],
  };
  return (
    <div className="flex flex-wrap gap-2 justify-center w-full items-center mt-5">
      {plant.data.map(({ name, data, svg, color, secColor, batas }, i) => {
        return (
          <div
            key={i}
            className="flex  justify-center items-center w-full border-2 px-2 h-12 rounded-lg"
          >
            <div className="flex w-[33%] text-sm font-semibold items-center">
              <div className="w-6 h-6 mr-2 relative">
                <Image src={svg} layout="fill" alt="ph" />
              </div>
              {name}
            </div>
            <div className="w-[57%] ml-2">
              <div
                style={{
                  backgroundColor: `#${secColor}`,
                }}
                className={`overflow-hidden h-2 text-xs flex rounded `}
              >
                <div
                  style={{
                    width: (data / batas) * 100 + '%',
                    backgroundColor: `#${color}`,
                  }}
                  className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center`}
                ></div>
              </div>
            </div>
            <p className="w-[10%] flex items-center justify-end text-xs font-semibold">
              {data}
            </p>
          </div>
        );
      })}
    </div>
  );
};
export default Log;
