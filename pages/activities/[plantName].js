import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Detail() {
  const router = useRouter();
  const { plantName } = router.query;

  const plant = {
    name: plantName,
    data: [
      {
        name: 'ph level',
        data: '8',
        svg: '/assets/ph.svg',
        color: 'FFC061',
        secColor: 'FFF0D9',
      },
      {
        name: 'water level',
        data: '60%',
        svg: '/assets/water.svg',
        color: '61B4FF',
        secColor: 'C7E4FF',
      },
      {
        name: 'fertilizer',
        data: '52%',
        svg: '/assets/fertilizer.svg',
        color: '49AD4D',
        secColor: 'C6EEC8',
      },
      {
        name: 'soil',
        data: '37%',
        svg: '/assets/soil.svg',
        color: '884D00',
        secColor: 'FFEDD4',
      },
    ],
    image: '/assets/bougainvillea.png',
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
        <p className="mt-2 font-bold mb-2">{plant.name}</p>
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
        {plant.data.map(({ name, data, svg, color, secColor }, i) => {
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
                      width: data.includes('%')
                        ? data
                        : (data / 14) * 100 + '%',
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
    </div>
  );
}
