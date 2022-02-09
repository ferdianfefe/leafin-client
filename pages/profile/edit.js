import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';

export default function Edit() {
  const getProfile = async () => {
    // const data = await fetch('http://localhost:5000/api/user/', {
    //   method: 'GET',
    //   credentials: 'include',
    // });

    const { data } = await axios.get('http://localhost:5000/api/user/', {
      withCredentials: true,
    });
    console.log(data);
  };

  console.log(getProfile());

  return (
    <div className="container mx-auto p-5 flex flex-wrap justify-center items-center">
      <div className="flex items-center">
        <Link href="../profile">
          <a className="w-5 h-5 ml-10 relative">
            <Image
              src="/assets/backBtn.svg"
              objectFit="contain"
              layout="fill"
              alt="edit"
            ></Image>
          </a>
        </Link>
        <h1 className=" font-bold text-2xl px-5">My Profile</h1>
      </div>
    </div>
  );
}
