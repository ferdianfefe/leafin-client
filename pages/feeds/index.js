import Navbar from "../../components/Navbar";
import FilterItem from "../../components/FilterItem";
import FeedItem from "../../components/FeedItem";
import Button from "../../components/Button";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ScrollToBottom, { useScrollToBottom } from "react-scroll-to-bottom";
import useInView from "react-cool-inview";
import { getAllFeeds } from "@/components/actions/feedActions";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function Feeds() {
  const dispatch = useDispatch();
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [page, setPage] = useState(1);
  const [accFeeds, setAccFeeds] = useState([]);
  const limit = 5;

  const scrollToBottom = useScrollToBottom();

  const { observe, inView } = useInView({
    onEnter: ({ unobserve }) => {
      dispatch(getAllFeeds(page, limit, selectedFilters)).then((data) => {
        if (data.length > 0) {
          setAccFeeds([...accFeeds, ...data]);
          console.log(data)
          setPage(page + 1);
          scrollToBottom();
        }
        if (!data.hasNextPage) unobserve();
      });
    },
  });

  // useEffect(() => {
  //   setPage(1);
  //   dispatch(getAllFeeds(page, limit, selectedFilters)).then((data) => {
  //     if (data.length > 0) {
  //       setAccFeeds([...data]);
  //       setPage(page + 1);
  //     }
  //   });
  // }, [selectedFilters]);

  const filters = ["Pupuk", "Shovel", "Seeds", "Growx Kit"];

  // const feeds = [
  //   {
  //     imageUrl: "/assets/leafinLogo.svg",
  //     author: "Budi",
  //     title: "Hasil menanam menggunakan alat dari Leafin",
  //     slug: "menanam-dengan-alat-dari-leafin",
  //     tags: ["Pupuk", "Shovel"],
  //   },
  //   {
  //     imageUrl: "/assets/leafinLogo.svg",
  //     author: "Sarah",
  //     title: "Tips pemula dalam menggunakan pupuk kompos",
  //     slug: "tips-pemula-dalam-menggunakan-pupuk-kompos",
  //     tags: ["Shovel"],
  //   },
  //   {
  //     imageUrl: "/assets/leafinLogo.svg",
  //     author: "Budi",
  //     title: "Setelah menggunakan Growx Kit, apa yang harus dilakukan?",
  //     slug: "setelah-menggunakan-growx-kit-apa-yang-harus-dilakukan",
  //     tags: ["Growx Kit", "Seeds"],
  //   },
  // ];

  const selectFilter = (filter) => {
    if (selectedFilters.includes(filter)) {
      setSelectedFilters(selectedFilters.filter((item) => item !== filter));
    } else {
      setSelectedFilters([...selectedFilters, filter]);
    }
  };

  return (
    <div className="container mx-auto p-5 flex flex-wrap justify-center">
      <div className="flex flex-col justify-center items-center w-full px-5">
        <h1 className="font-bold text-2xl">Feeds</h1>
        <Link href="/">
          <a className="absolute left-5">
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
        <Link href="/feeds/write">
          <a className="absolute right-5">
            <div className="w-5 h-5 relative items-center justify-self-end">
              <Image
                src="/assets/paperPenIcon.svg"
                objectFit="contain"
                layout="fill"
                alt="edit"
                priority
              />
            </div>
          </a>
        </Link>
      </div>
      <div className=" flex flex-wrap items-center w-full justify-start">
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
      <scrollToBottom className="mb-20">
        {accFeeds.map((feed) => (
          <FeedItem
            key={feed._id}
            imageUrl={feed.imageFileURL}
            author={feed.authorId.name}
            title={feed.title}
            slug={feed.slug}
            tags={feed.tags}
          />
        ))}
      </scrollToBottom>
      <div ref={observe} className="observer">
        {inView && <h1></h1>}
      </div>
      <Navbar active={"feeds"}></Navbar>
    </div>
  );
}
