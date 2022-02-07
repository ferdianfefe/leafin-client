import Image from "next/image";
import Button from "../components/Button";

export default function Home() {
  return (
    <div className='container py-10 px-4 mx-auto flex flex-wrap justify-center items-center'>
      <div className="w-[315px] h-[315px] relative">
        <Image src='/homepage.svg' alt="homepage Image" layout="fill" objectFit="contain"></Image>
      </div>
      <div className="py-10 flex justify-center items-center flex-wrap">
        <p className="font-bold text-xl">Manage your gardening better</p>
        <p className="mt-5 text-[#8D8D8D] text-center">
          Having difficulties in managing your gardening?
          <br/>
          We are here to assist you
        </p>
      </div>
      <div className="pt-5 w-full gap-5 flex justify-between items-center">
          <Button className="border bg-[#1F8734] text-white font-bold"><a href="signup">Sign Up</a></Button>
          <Button className="border border-[#1F8734] font-bold text-[#1F8734]">
            <a href="signin">Sign In</a>
          </Button>
      </div>
    </div>
  )
}
