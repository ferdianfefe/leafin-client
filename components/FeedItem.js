import Tag from "./Tag";
import Link from "next/link";
import Image from "next/image";

const FeedItem = ({ slug, imageUrl, author, title, tags }) => {
  return (
    <Link href={"feeds/" + slug}>
      <a className="bg-white py-5 rounded-xl flex flex">
        <div className="rounded-full flex-none w-20 h-fit relative overflow-hidden">
          <Image
            src={imageUrl}
            objectFit="cover"
            layout="fill"
            alt="profile picture"
            loading="lazy"
          ></Image>
        </div>
        <div className="flex-1">
          <p className="mt-5 text-primary">{author}</p>
          <p className="mt-1 font-bold">{title}</p>

          <div className="flex justify-start mt-5">
            {tags.map((tag, index) => (
              <Tag key={index} text={tag} />
            ))}
          </div>
        </div>
      </a>
    </Link>
  );
};

export default FeedItem;
