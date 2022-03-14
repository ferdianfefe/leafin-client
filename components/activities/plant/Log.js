import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import io from 'socket.io-client';
import { getPlantLog } from '@/components/actions/logActions';
// import config from '../../../config';

const Log = ({ props }) => {
  const userPlantLog = useSelector((state) => state.log.log);
  const [data, setData] = useState([]);
  const plantID = props.data.data.userPlant._id;

  const dispatch = useDispatch();

  useEffect(() => {
    setData(userPlantLog || props.data.data);
  }, [userPlantLog, props.data.data]);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(getPlantLog(plantID));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const plant = {
    data: [
      {
        name: 'sunlight',
        data: data?.lightIntensity || 0 + '%',
        svg: '/assets/sun.svg',
        color: 'FFC061',
        secColor: 'FFF0D9',
        batas: 10000,
      },
      {
        name: 'temperature',
        data: data?.temperature || 0 + '%',
        svg: '/assets/thermometer.svg',
        color: 'DE4362',
        secColor: 'F9AEBD',
        batas: 50,
      },
      {
        name: 'humidity',
        data: data?.humidity || 0 + '%',
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
