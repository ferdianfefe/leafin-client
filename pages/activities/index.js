import Navbar from '../../components/Navbar';
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

export default function Activities() {
  const test = [
    {
      text1: 'P',
      text2: 'HALO',
    },
    {
      text1: 'P',
      text2: 'HALO',
    },
  ];
  return (
    <div className="container mx-auto p-5 flex flex-wrap justify-center">
      <div className="flex flex-col justify-center items-center">
        <h1 className="font-bold text-2xl px-10 mb-10">Activities</h1>
        <Swiper
          observer={true}
          observeParents={true}
          pagination={true}
          modules={[Pagination]}
        >
          {test.map((item, index) => {
            return (
              <SwiperSlide
                key={index}
                className="flex flex-wrap justify-center items-center mb-10"
              >
                <div className="pt-10 mb-5 flex justify-center items-center flex-wrap">
                  <p className="font-bold text-center w-full text-xl">
                    {item.text1}
                  </p>
                  <p className="mt-5 text-gray-primary text-center">
                    {item.text2}
                  </p>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
      <Navbar active={'activities'}></Navbar>
    </div>
  );
}
