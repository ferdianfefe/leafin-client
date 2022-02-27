import Link from "next/link";
import Image from "next/image";
import Tag from "../../components/Tag";
import { useSelector } from "react-redux";
import { getServerFeed, getFeed } from "@/components/actions/feedActions";
import { wrapper } from "@/components/store/store";
import { FEED_GET_REQUEST, FEED_GET_SUCCESS } from "constants/feedConstants";

Read.getInitialProps = wrapper.getInitialPageProps(
  ({ getState, dispatch }) =>
    async ({ req, query }) => {
      /* Get feed */
      if(!process.browser){
        dispatch({ type: FEED_GET_REQUEST });
        const feed = await getServerFeed(req, query.slug);
        dispatch({ type: FEED_GET_SUCCESS, payload: feed });
      }else{
        dispatch(getFeed(query.slug));
      }
    }
);

export default function Read() {
  const feed = useSelector((state) => state.feed.feed);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div className="container mx-auto p-5 flex flex-wrap justify-center">
      <div className="flex flex-col justify-center items-center w-full px-5">
        <Link href="/feeds">
          <a className="absolute left-5">
            <div className="w-5 h-5 relative items-center justify-self-end">
              <Image
                src="/assets/ArrowLeft.svg"
                objectFit="contain"
                layout="fill"
                alt="edit"
                priority
              />
            </div>
          </a>
        </Link>
      </div>
      <div className="">
        <p className="mt-5 font-black text-primary text-lg">
          {feed.authorId.name}
        </p>
        <p className="mt-2 font-black text-2xl">{feed.title}</p>
        <div className="flex justify-start mt-5">
          {feed.tags.map((tag, index) => (
            <Tag key={index} text={capitalizeFirstLetter(tag.name)} />
          ))}
        </div>
        <p className="mt-5 text-sm">{feed.content}</p>
      </div>
    </div>
  );
}
