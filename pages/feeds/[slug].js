import Link from "next/link";
import Image from "next/image";
import Tag from "../../components/Tag";

// export async function getServerSideProps({ req, query }) {}

export default function Read() {
  const articleData = {
    title: "Hasil menanam menggunakan alat dari Leafin",
    author: "Budi",
    tags: ["Pupuk", "Shovel"],
    body: `
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Donec euismod, nisi eget consectetur venenatis, erat nunc aliquet nunc, eget tincidunt nisl nunc euismod erat.
        Sed euismod, nisi eget consectetur venenatis, erat nunc aliquet nunc, eget tincidunt nisl nunc euismod erat.
        Sed euismod, nisi eget consectetur venenatis, erat nunc aliquet nunc, eget tincidunt nisl nunc euismod erat. 

        Sed euismod, nisi eget consectetur venenatis, erat nunc aliquet nunc, eget tincidunt nisl nunc euismod erat. 
        Sed euismod, nisi eget consectetur venenatis, erat nunc aliquet nunc, eget tincidunt nisl nunc euismod erat. 
        Sed euismod, nisi eget consectetur venenatis, erat nunc aliquet nunc, eget tincidunt nisl nunc euismod erat. 
    `,
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
        <p className="mt-5 font-black text-primary text-lg">{articleData.author}</p>
        <p className="mt-2 font-black text-2xl">{articleData.title}</p>

        <div className="flex justify-start mt-5">
          {articleData.tags.map((tag, index) => (
            <Tag key={index} text={tag} />
          ))}
        </div>
        <p className="mt-5 text-sm">{articleData.body}</p>
      </div>
    </div>
  );
}
