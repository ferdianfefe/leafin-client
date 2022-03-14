import Link from 'next/link';
import Image from 'next/image';
import Tag from '../../components/Tag';
import Error from 'next/error';
import axios from 'axios';
import config from '../../config';

export async function getServerSideProps({ req, query }) {
  const res = await axios.get(`${config.apiURL}/feed/${query.slug}`, {
    headers: {
      cookie: `refreshToken=${req?.cookies?.refreshToken}; accessToken=${req?.cookies?.accessToken};`,
    },
  });
  return {
    props: {
      feed: res.data.data,
      errorCode: res.status === 200 ? null : res.status,
    },
  };
}

export default function Read(props) {
  if (props.errorCode) {
    return <Error statusCode={props.errorCode} />;
  }

  const { feed } = props;

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
                src="/assets/backBtn.svg"
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
