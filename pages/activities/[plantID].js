import Image from 'next/image';
import Link from 'next/link';
import config from '../../config';
import Log from '@/components/activities/plant/Log';
import Error from 'next/error';
import Button from '@/components/Button';
import { useState } from 'react';
import {
  getUserPlant,
  deleteUserPlant,
} from '@/components/actions/userPlantActions';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { getAllPlantsLogs } from '@/components/actions/logActions';

export async function getServerSideProps({ req, query }) {
  const res = await fetch(`${config.apiURL}/log/one/` + query.plantID, {
    method: 'GET',
    headers: {
      cookie: `refreshToken=${req?.cookies?.refreshToken}; accessToken=${req?.cookies?.accessToken};`,
    },
  });

  const errorCode = res.ok ? false : res.status;
  const data = await res.json();

  return {
    props: {
      data,
      errorCode,
    },
  };
}

export default function Detail(props) {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  if (props.errorCode) {
    return <Error statusCode={props.errorCode} />;
  }

  const { plantID } = router.query;

  const data = props.data.data.userPlant;

  const plant = {
    name: data.plantType.name,
    userPlantName: data.name,
    image: data.plantType.pictureFileURL || data.plantType.pictureFileId,
  };

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

  const delPlant = () => {
    dispatch(deleteUserPlant(plantID))
      .then((data) => {
        dispatch(getUserPlant());
        dispatch(getAllPlantsLogs());
        router.push('/activities');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container mx-auto p-5 flex flex-wrap justify-center">
      <div className="flex flex-col justify-center items-center w-full ">
        <h1 className="font-bold text-2xl mb-10">{plant.name}</h1>
        <Link href="/activities">
          <a className="absolute left-5 mb-10">
            <div className="w-5 h-5 relative items-center justify-self-end">
              <Image
                src="/assets/backBtn.svg"
                objectFit="contain"
                layout="fill"
                alt="edit"
                priority
              />
            </div>
          </a>
        </Link>
        <a
          className="absolute right-5 mb-10"
          onClick={() => {
            setShowModal(true);
          }}
        >
          <div className="w-5 h-5 relative items-center justify-self-end">
            <Image
              src="https://img.icons8.com/ios/50/000000/trash--v1.png"
              objectFit="contain"
              layout="fill"
              alt="edit"
              priority
            />
          </div>
        </a>
      </div>
      <div className="h-52 w-64 relative rounded-xl overflow-hidden">
        <Image src={plant.image} layout="fill" alt={plant.name + ' image'} />
      </div>
      <div className="bg-white mt-10 flex flex-wrap justify-center pb-3 border w-full h-full rounded-xl">
        <p className="mt-2 font-bold w-full flex justify-center mb-2">
          {plant.userPlantName}
        </p>
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
      <div className="flex flex-wrap gap-2 justify-center w-full items-center mt-5">
        <Log props={props} />
      </div>
      <div className="mt-20 mb-10 w-full">
        <Button
          href={'/activities/watering'}
          className={'mb-5 text-white font-semibold bg-primary'}
        >
          Water Your Plant
        </Button>
        <h1 className="font-bold mb-2">Need Help?</h1>
        <Link href="/chatbot">
          <a className="w-full bg-[#1F8734] gap-2 rounded-xl py-3 px-2 flex justify-center items-center">
            <div className="w-6 h-6 relative">
              <Image
                src="/assets/chat.svg"
                layout="fill"
                objectFit="contain"
                alt="chat logo"
              />
            </div>
            <p className="text-white font-semibold">Chat Admin</p>
          </a>
        </Link>
      </div>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Delete Plant</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                    Are you sure you want to delete this plant?
                  </p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-emerald-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-red-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={delPlant}
                  >
                    Yes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>
  );
}
