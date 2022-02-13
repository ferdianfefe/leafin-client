import Navbar from '@/components/Navbar';
import Image from 'next/image';
import Link from 'next/link';

export default function Index() {
  const date = ['s', 'm', 't', 'w', 't', 'f', 's'];
  return (
    <>
      <div className="bg-[#CFFFD9] w-full h-72"></div>
      <div className=" bg-[#E5E5E5]/30 min-h-screen  ">
        <div className="container  mx-auto px-5 flex flex-col">
          <div className="bg-white pb-3 -mt-10 border w-full h-full rounded-xl">
            <div id="tabs" className="flex justify-between items-center">
              {date.map((item, i) => {
                let className = `w-full hover:text-[#9F9E9E] justify-center text-center pt-2 pb-1 text-[#B5B5B5]`;

                return (
                  <div key={i} className={className}>
                    <span className="font-semibold text-xs uppercase">
                      {item}
                    </span>
                    <br />
                    <span className="mt-1 text-lg text-black">{16 + i}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <Link href="/ar">
            <a className="mt-5 font-semibold bg-white py-3 border w-full rounded-xl flex justify-center items-center">
              Scan Environment
            </a>
          </Link>

          <div className="font-bold mt-10 w-full">
            <label className="text-left">Your Plant Progress</label>
            <div className="flex mt-5 justify-between flex-wrap gap-y-3">
              <div
                id="card"
                className="bg-white w-[48%] py-5 rounded-xl flex flex-col items-center justify-center"
              >
                <div className="rounded-full w-28 h-28 relative overflow-hidden">
                  <Image
                    src="/assets/profileimage.png"
                    objectFit="cover"
                    layout="fill"
                    alt="profile picture"
                    loading="lazy"
                  ></Image>
                </div>
                <p className="text-xs font-normal mt-3 text-[#9FCDA8]">
                  Overal Score <strong className="text-[#1F8734]">95%</strong>
                </p>
                <p className="mt-2">Orchidaceae</p>
              </div>
              <div
                id="card"
                className="bg-white w-[48%] h-full py-5 rounded-xl flex flex-col items-center justify-center"
              >
                <div className="rounded-full w-28 h-28 relative overflow-hidden">
                  <Image
                    src="/assets/profileimage.png"
                    objectFit="cover"
                    layout="fill"
                    alt="profile picture"
                    loading="lazy"
                  ></Image>
                </div>
                <p className="text-xs font-normal mt-3 text-[#9FCDA8]">
                  Overal Score <strong className="text-[#1F8734]">95%</strong>
                </p>
                <p className="mt-2">Orchidaceae</p>
              </div>
              <div
                id="card"
                className="bg-white w-[48%] h-full py-5 rounded-xl flex flex-col items-center justify-center"
              >
                <div className="rounded-full w-28 h-28 relative overflow-hidden">
                  <Image
                    src="/assets/profileimage.png"
                    objectFit="cover"
                    layout="fill"
                    alt="profile picture"
                    loading="lazy"
                  ></Image>
                </div>
                <p className="text-xs font-normal mt-3 text-[#9FCDA8]">
                  Overal Score <strong className="text-[#1F8734]">95%</strong>
                </p>
                <p className="mt-2">Orchidaceae</p>
              </div>
              <div
                id="card"
                className="bg-white w-[48%] h-full py-5 rounded-xl flex flex-col items-center justify-center"
              >
                <div className="rounded-full w-28 h-28 relative overflow-hidden">
                  <Image
                    src="/assets/profileimage.png"
                    objectFit="cover"
                    layout="fill"
                    alt="profile picture"
                    loading="lazy"
                  ></Image>
                </div>
                <p className="text-xs font-normal mt-3 text-[#9FCDA8]">
                  Overal Score <strong className="text-[#1F8734]">95%</strong>
                </p>
                <p className="mt-2">Orchidaceae</p>
              </div>
            </div>
          </div>
          <Navbar active="home" />
        </div>
      </div>
    </>
  );
}
