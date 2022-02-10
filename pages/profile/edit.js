import Image from 'next/image';
import Link from 'next/link';

export default function Edit() {
  return (
    <div className="container mx-auto p-5 flex flex-wrap justify-center items-center">
      <div className="flex items-center  justify-center w-full">
        <h1 className="font-bold text-2xl">Edit Profile</h1>
        <Link href="/profile">
          <a className="fixed left-5  pt-1">
            <div className="w-5 h-5 relative items-center justify-self-end">
              <Image
                src="/assets/backBtn.svg"
                objectFit="contain"
                layout="fill"
                alt="edit"
              ></Image>
            </div>
          </a>
        </Link>
      </div>
    </div>
  );
}
