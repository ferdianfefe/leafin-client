import Navbar from '@/components/Navbar';
import Image from 'next/image';
import Link from 'next/link';

export default function Index() {
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

  const plantProgress = [
    {
      name: 'Orchidaceae',
      score: '95%',
      img: '/assets/orchidaceae.png',
      href: 'activities/orchidaceae',
    },
    {
      name: 'Jasminum',
      score: '95%',
      img: '/assets/jasminum.png',
      href: 'activities/jasminum',
    },
  ];
  return (
    <>
      <div className="bg-[#CFFFD9] w-full h-72"></div>
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
            <a className="mt-5 font-semibold bg-white py-3 border w-full rounded-xl flex justify-center items-center">
              <div className="w-6 h-6 relative mr-3">
                <Image
                  src={'/assets/barcode-scanner.svg'}
                  layout="fill"
                  alt="barcode"
                />
              </div>
              Scan Environment
            </a>
          </Link>

          <div className="font-bold mt-10 w-full">
            <label className="text-left">Your Plant Progress</label>
            <div className="flex mt-5 justify-between flex-wrap gap-y-3">
              {plantProgress.map(({ name, score, img, href }, i) => {
                return (
                  <Link key={i} href={href}>
                    <a className="bg-white w-[48%] py-5 rounded-xl flex flex-col items-center justify-center">
                      <div className="rounded-full w-28 h-28 relative overflow-hidden">
                        <Image
                          src={img}
                          objectFit="cover"
                          layout="fill"
                          alt="profile picture"
                          loading="lazy"
                        ></Image>
                      </div>
                      <p className="text-xs font-normal mt-3 text-[#9FCDA8]">
                        Overal Score{' '}
                        <strong className="text-[#1F8734]">{score}</strong>
                      </p>
                      <p className="mt-2">{name}</p>
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
