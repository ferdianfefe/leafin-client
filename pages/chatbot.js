import Image from "next/image";

export default function chatbot() {
  const messagesPerDate = [
    {
      date: "Yesterday",
      messages: [
        {
          message: "Hello, I am your personal chatbot. How can I help you?",
          user: "bot",
          createdAt: new Date().getHours() + ":" + new Date().getMinutes(),
        },
        {
          message: "I need to know my plant's water level.",
          user: "user",
          createdAt: new Date().getHours() + ":" + new Date().getMinutes(),
        },
        {
          message: "Your plant's water level is at 50%.",
          user: "bot",
          createdAt: new Date().getHours() + ":" + new Date().getMinutes(),
        },
        {
          message: "Thank you for your feedback.",
          user: "user",
          createdAt: new Date().getHours() + ":" + new Date().getMinutes(),
        },
      ],
    },
    {
      date: "Today",
      messages: [
        {
          message: "Hello, I am your personal chatbot. How can I help you?",
          user: "bot",
          createdAt: new Date().getHours() + ":" + new Date().getMinutes(),
        },
        {
          message: "I need to know my plant's PH level",
          user: "user",
          createdAt: new Date().getHours() + ":" + new Date().getMinutes(),
        },
        {
          message: "Your plant's PH level is 7.5",
          user: "bot",
          createdAt: new Date().getHours() + ":" + new Date().getMinutes(),
        },
      ],
    },
  ];

  return (
    <div className="container px-5 flex flex-col h-[100vh]">
      <div className="flex-none flex justify-start py-3 items-center">
        <div className="w-auto h-[20px] relative ml-5">
          <Image
            src="/assets/backBtn.svg"
            alt="get-started Image"
            layout="fill"
            objectFit="contain"
            loading="lazy"
          ></Image>
        </div>
        <div className="rounded-full w-10 h-10 ml-5 relative overflow-hidden">
          <Image
            src="/icon-512x512.png"
            objectFit="cover"
            layout="fill"
            alt="profile picture"
            loading="lazy"
          ></Image>
        </div>
        <div className="ml-5">
          <h3 className="font-bold text-md ">Leafin Bot</h3>
          <p className="font-semibold w-full text-center text-sm text-[#B8B8B8]">
            Last seen recently
          </p>
        </div>
      </div>
      <main className="flex-1 overflow-y-auto">
        {messagesPerDate.map((messagePerDate, index) => (
          <div key={index} className="flex flex-col">
            <div className="flex justify-center my-4">
              <p className="text-[#7B7B7B] text-base">{messagePerDate.date}</p>
            </div>
            {messagePerDate.messages.map((message, messageIdx) => (
              <div key={messageIdx} className="flex my-4">
                <div className="rounded-full w-12 h-12 relative">
                  <Image
                    src="/icon-512x512.png"
                    objectFit="cover"
                    layout="fill"
                    alt="profile picture"
                    loading="lazy"
                  ></Image>
                </div>
                <div className="flex-1 py-3 px-7 ml-4 rounded-full bg-[#EBEBEB] ">
                  <p className="text-[#7A7A7A] text-sm">{message.message}</p>
                </div>
                <div className="flex-none w-auto ml-2 flex items-center">
                  <p className="text-sm text-[#ABABAB]">{message.createdAt}</p>
                </div>
              </div>
            ))}
          </div>
        ))}
      </main>
      <div className="flex-none flex py-5">
        <textarea
          className="flex-1 placeholder-gray-500 w-full h-[50px] rounded-full px-3 py-3"
          name=""
          id=""
          cols="30"
          rows="10"
          placeholder="Type a message..."
        ></textarea>
        <div className="flex-none w-20px h-auto relative ml-5">
          <Image
            src="/assets/attachIcon.svg"
            alt="get-started Image"
            layout="fill"
            objectFit="contain"
            loading="lazy"
          ></Image>
        </div>
        <div className="flex-none w-20px h-auto relative ml-5">
          <Image
            src="/assets/sendIcon.svg"
            alt="get-started Image"
            layout="fill"
            objectFit="contain"
            loading="lazy"
          ></Image>
        </div>
      </div>
    </div>
  );
}
