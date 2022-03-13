import Button from '@/components/Button';
import FilterItem from '@/components/FilterItem';
import Navbar from '@/components/Navbar';
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import Image from 'next/image';
import Link from 'next/link';

export default function Marketplace() {
  const [selectedFilters, setSelectedFilters] = useState([]);
  const filters = ['Fertilizer', 'Tools', 'Seeds', 'Leafin'];

  const selectFilter = (filter) => {
    if (selectedFilters.includes(filter)) {
      setSelectedFilters(selectedFilters.filter((item) => item !== filter));
    } else {
      setSelectedFilters([...selectedFilters, filter]);
    }
  };

  const barang = [
    {
      stars: 4,
      name: 'Pupuk Nafos',
      price: '12.69',
      image: '/assets/Pupuk-Nafos.jpg',
    },
    {
      stars: 4,
      name: 'Pupuk ZA',
      price: '12.69',
      image: '/assets/Pupuk-ZA.jpg',
    },
    {
      stars: 4,
      name: 'Pupuk Kaltim',
      price: '12.69',
      image: '/assets/Pupuk-Kaltim.jpg',
    },
    {
      stars: 4,
      name: 'Pupuk Dinosaurus',
      price: '12.69',
      image: '/assets/Pupuk-Dinosaurus.jpg',
    },
    {
      stars: 4,
      name: 'Pupuk Petro',
      price: '12.69',
      image: '/assets/Pupuk-Petro.jpg',
    },
    {
      stars: 3,
      name: 'Pupuk Biotara',
      price: '12.69',
      image: '/assets/Pupuk-Biotara.jpg',
    },
  ];

  const funcStars = (stars) => {
    let result = [];
    for (let i = 0; i < stars; i++) {
      result.push(
        <div className="w-[9px] h-[9px] relative">
          <Image src="/assets/stars.svg" alt="stars" layout="fill" />
        </div>
      );
    }
    return result;
  };
  return (
    <>
      <div className="container mx-auto p-5 flex flex-wrap justify-center">
        <div className="w-full">
          <h1 className="font-bold text-[20px] w-2/3 text-left">
            We provide everything you need
          </h1>
        </div>

        <div className="flex flex-wrap items-center w-full justify-start">
          <Swiper
            slidesPerView={3}
            spaceBetween={5}
            slidesPerGroup={3}
            loopFillGroupWithBlank={true}
            className="mt-2"
          >
            {filters.map((filter, i) => {
              return (
                <SwiperSlide key={i}>
                  <Button
                    onClick={() => {
                      selectFilter(filter);
                    }}
                  >
                    <FilterItem
                      text={filter}
                      active={selectedFilters.includes(filter)}
                    />
                  </Button>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>

        <div className="flex flex-wrap items-center w-full justify-between mb-20">
          {barang.map(({ stars, name, price, image }, i) => {
            return (
              <Link key={i} href={'marketplace/' + name.replace(' ', '-')}>
                <a className="h-[269px] rounded-xl w-[48%] mb-3">
                  <div className="relative h-[182px] overflow-hidden rounded-t-xl">
                    <Image
                      src={image}
                      alt={name}
                      loading="lazy"
                      layout="fill"
                    />
                  </div>
                  <div className="border-x-2 border-b-2 rounded-b-xl flex flex-col px-3">
                    <div className="pt-2 pb-1 flex gap-[2px]">
                      {funcStars(stars)}
                    </div>
                    <div className="font-semibold mb-2">{name}</div>
                    <div className="font-bold mb-1">{price}</div>
                  </div>
                </a>
              </Link>
            );
          })}
        </div>
      </div>

      <Navbar active={'marketplace'} />
    </>
  );
}
