import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

function Watering() {
  const [time, setTime] = useState(10);
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((time) => time - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (time === 0) {
      router.back();
    }
  });

  const back = () => {
    router.back();
  };

  return (
    <div className="container mx-auto p-5 flex flex-wrap justify-center">
      <div className="flex flex-col justify-center items-center w-full ">
        <h1 className="font-bold text-2xl text-center px-10 w-full">
          Watering Your Plant
        </h1>
        <a className="absolute left-5" onClick={back}>
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
      </div>

      <div className="mt-20 text-3xl font-bold w-full flex justify-center items-center">
        {time}
      </div>
    </div>
  );
}

export default Watering;
