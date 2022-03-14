import Navbar from '../../components/Navbar';
import FilterItem from '../../components/FilterItem';
import FeedItem from '../../components/FeedItem';
import Button from '../../components/Button';
import Link from 'next/link';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ScrollToBottom, { useScrollToBottom } from 'react-scroll-to-bottom';
import useInView from 'react-cool-inview';
import {
  getAllFeeds,
  getServerFeedTags,
  getFeedTags,
} from '@/components/actions/feedActions';
import {
  FEED_GET_TAGS_REQUEST,
  FEED_GET_TAGS_SUCCESS,
} from 'constants/feedConstants';
import { wrapper } from '@/components/store/store';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

Feeds.getInitialProps = wrapper.getInitialPageProps(
  ({ getState, dispatch }) =>
    async ({ req }) => {
      const { feed } = getState();
      if (!feed.tags.length && !process.browser) {
        dispatch({ type: FEED_GET_TAGS_REQUEST });

        const data = await getServerFeedTags(req);
        dispatch({ type: FEED_GET_TAGS_SUCCESS, payload: data });
      } else if (!feed.feeds.length) {
        dispatch(getFeedTags());
      } else {
        console.log('sudah ada data');
      }
    }
);

export default function Feeds() {
  const tags = useSelector((state) => state.feed.tags);
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
          setPage(page + 1);
          scrollToBottom();
        }
        if (!data.hasNextPage) unobserve();
      });
    },
  });

  useEffect(() => {
    /* Get feeds with specified tags */
    setPage(1);
    console.log(selectedFilters);
    dispatch(getAllFeeds(page, limit, selectedFilters)).then((data) => {
      if (data.length > 0) {
        setAccFeeds(data);
        setPage(page + 1);
        scrollToBottom();
      }
    });
  }, [selectedFilters]);

  const selectFilter = (filter) => {
    console.log(filter);
    if (selectedFilters.includes(filter)) {
      setSelectedFilters(
        selectedFilters.filter((item) => item.name !== filter.name)
      );
    } else {
      setSelectedFilters([...selectedFilters, filter]);
    }
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div className="container h-[100vh] mx-auto p-5 flex flex-col justify-center">
      <div className="flex-none flex flex-col justify-center items-center w-full px-5">
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
      <div className="flex-none flex flex-wrap items-center w-full justify-start">
        <Swiper
          slidesPerView={3}
          spaceBetween={5}
          slidesPerGroup={3}
          loopFillGroupWithBlank={true}
          className="mt-2"
        >
          {tags.map((tag, i) => {
            return (
              <SwiperSlide key={i}>
                <Button
                  onClick={() => {
                    selectFilter(tag);
                  }}
                >
                  <FilterItem
                    text={capitalizeFirstLetter(tag.name)}
                    active={selectedFilters.includes(tag)}
                  />
                </Button>
              </SwiperSlide>
            );
          })}
          {/* Akal-akalan supaya bisa muncul kalau pakai data dinamis */}
          <SwiperSlide style={{ width: '0px' }}></SwiperSlide>
        </Swiper>
      </div>
      <ScrollToBottom className="flex-1 overflow-y-auto">
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
        <div ref={observe} className="observer">
          {inView && <h1></h1>}
        </div>
      </ScrollToBottom>
      <Navbar active={'feeds'}></Navbar>
    </div>
  );
}
