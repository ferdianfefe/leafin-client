import Image from 'next/image';
import Link from 'next/link';
import config from '../../config';
import Log from '@/components/activities/plant/Log';
import Error from 'next/error';

export async function getServerSideProps({ req, query }) {
  const res = await fetch(`${config.apiURL}/log/` + query.plantName, {
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
  if (props.errorCode) {
    return <Error statusCode={props.errorCode} />;
  }
  const data = props.data.data.userPlant;
  console.log(data);
  const plant = {
    name: data.plantType.name,
    userPlantName: data.name,
    image: data.plantType.pictureFileId,
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

  return (
    <div className="container mx-auto p-5 flex flex-wrap justify-center">
      <div className="flex flex-col justify-center items-center w-full ">
        <h1 className="font-bold text-2xl mb-10">{plant.name}</h1>
        <Link href="/">
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
      </div>
      <div className="h-52 w-64 relative rounded-xl overflow-hidden">
        <Image src={plant.image} layout="fill" alt={plant.name + ' image'} />
      </div>
      <div className="bg-white mt-10 flex flex-wrap justify-center pb-3 border w-full h-full rounded-xl">
        <p className="mt-2 font-bold mb-2">{plant.userPlantName}</p>
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
    </div>
  );
}
