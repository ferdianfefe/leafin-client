import Image from "next/image";

export default function Profile () {

    return (
        <div className="container mx-auto p-5 flex flex-wrap justify-center">
            <div className="flex items-center">
                <h1 className="font-bold text-2xl px-10">My Profile</h1>
                <div className="relative w-5 h-5">
                    <a href="profile/edit">
                    <Image src="/edit.svg" objectFit="contain" layout="fill" alt="edit"></Image>
                    </a>
                </div>
            </div>

           <div className="pt-10 flex w-full items-center ">
                <div className="rounded-full w-20 h-20 relative overflow-hidden">
                    <Image src="/profileimage.png" objectFit="cover" layout="fill" alt="profile picture"></Image>
                </div>
                <div className="ml-5 flex flex-wrap gap-1">
                    <h1 className="font-bold text-lg w-full">John</h1>
                    <p className="text-xs text-[#B8B8B8]">John is me</p>
                </div>
            </div> 
        </div>
    )
}