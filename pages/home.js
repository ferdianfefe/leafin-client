import Image from 'next/image';
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import Button from '@/components/Button';

import 'swiper/css';
import 'swiper/css/pagination';

export default function Home() {
  const sliders = [
    {
      image: '/assets/homepage.svg',
      altImg: 'homepage Image',
      title: 'Manage your gardening better',
      description: 'Having difficulties in managing your gardening?',
      description_bottom: 'We are here to assist you',
    },
    {
      image: '/assets/homepage2.svg',
      altImg: 'homepage Image',
      title: 'Suitable recommendation',
      description: 'Having difficulties in choosing what to plant?',
      description_bottom: 'We will recommend it to you',
    },
    {
      image: '/assets/homepage3.svg',
      altImg: 'homepage Image',
      title: 'The all ready assistance',
      description: 'Having difficulties using our apps?',
      description_bottom: 'We are always ready to help',
    },
  ];

  return (
    <div className="container py-10 px-4 mx-auto flex flex-wrap justify-center items-center">
      <Swiper pagination={true} modules={[Pagination]}>
        {sliders.map(
          (
            { image, altImg, title, description, description_bottom },
            index
          ) => {
            return (
              <SwiperSlide
                key={index}
                className="flex flex-wrap justify-center items-center mb-10"
              >
                <div className="w-[315px] h-[315px] relative">
                  <Image
                    loading="lazy"
                    src={image}
                    alt={altImg}
                    layout="fill"
                    objectFit="contain"
                  ></Image>
                </div>
                <div className="pt-10 mb-5 flex justify-center items-center flex-wrap">
                  <p className="font-bold text-center w-full text-xl">
                    {title}
                  </p>
                  <p className="mt-5 text-gray-primary text-center">
                    {description}
                    <br></br>
                    {description_bottom}
                  </p>
                </div>
              </SwiperSlide>
            );
          }
        )}
      </Swiper>
      <div className="pt-5 w-full gap-5 flex justify-between items-center">
        <Button
          href="signup"
          className="border bg-primary text-white font-bold"
        >
          Sign Up
        </Button>
        <Button
          href="signin"
          className="border border-primary font-bold text-primary"
        >
          Sign In
        </Button>
      </div>
    </div>
  );
}
