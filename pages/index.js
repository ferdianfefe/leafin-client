import Image from 'next/image';
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import Button from '../components/Button';

import 'swiper/css';
import 'swiper/css/pagination';

export default function Home(props) {
  const sliders = [
    {
      image: '/homepage.svg',
      altImg: 'homepage Image',
      title: 'Manage your gardening better',
      description:
        'Having difficulties in managing your gardening? We are here to assist you',
    },
    {
      image: '/homepage.svg',
      altImg: 'homepage Image',
      title: 'Manage your gardening better',
      description:
        'Having difficulties in managing your gardening? We are here to assist you',
    },
    {
      image: '/homepage.svg',
      altImg: 'homepage Image',
      title: 'Manage your gardening better',
      description:
        'Having difficulties in managing your gardening? We are here to assist you',
    },
  ];

  if (props.login) {
    return (
      <div className="container mx-auto p-5 flex flex-wrap justify-center">
        INI SUDAH LOGIN
      </div>
    );
  } else {
    return (
      <div className="container py-10 px-4 mx-auto flex flex-wrap justify-center items-center">
        <Swiper pagination={true} modules={[Pagination]}>
          {sliders.map(({ image, altImg, title, description }, index) => {
            return (
              <SwiperSlide
                key={index}
                className="flex flex-wrap justify-center items-center mb-10"
              >
                <div className="w-[315px] h-[315px] relative">
                  <Image
                    priority
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
                  </p>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
        <div className="pt-5 w-full gap-5 flex justify-between items-center">
          <Button className="border bg-primary text-white font-bold">
            <a as="signup" href="signup">
              Sign Up
            </a>
          </Button>
          <Button className="border border-primary font-bold text-primary">
            <a as="signin" href="signin">
              Sign In
            </a>
          </Button>
        </div>
      </div>
    );
  }
}

export async function getServerSideProps({ req, res }) {
  let login = false;
  const data = await fetch('http://localhost:5000/api/user/private', {
    method: 'GET',
    credentials: true,
    headers: {
      cookie: `refreshToken=${req.cookies.refreshToken}; accessToken=${req.cookies.accessToken};`,
      content: 'application/json',
    },
  });

  if (data.status == 200) {
    login = true;
  }
  return {
    props: {
      login,
    },
  };
}
