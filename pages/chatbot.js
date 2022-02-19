import {
  sendMessage,
  getUserMessages,
} from '@/components/actions/messageActions';
import { useState } from 'react';
import useInView from 'react-cool-inview';
import dynamic from 'next/dynamic';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import Link from 'next/link';

export default function Chatbot() {
  const dispatch = useDispatch();
  const [messageInput, setMessageInput] = useState('');
  const [page, setPage] = useState(1);

  const { observe, inView } = useInView({
    onEnter: ({ unobserve }) => {
      dispatch(getUserMessages(page, 1)).then((data) => {
        if (data.length > 0) {
          setPage(page + 1);
        }
      });
      unobserve();
    },
  });

  const messages = [
    {
      message: 'Hello, I am your personal chatbot. How can I help you?',
      user: 'bot',
      createdAt: 'Yesterday',
    },
    {
      message: "I need to know my plant's water level.",
      user: 'user',
      createdAt: 'Yesterday',
    },
    {
      message: "Your plant's water level is at 50%.",
      user: 'bot',
      createdAt: 'Yesterday',
    },
    {
      message: 'Thank you for your feedback.',
      user: 'user',
      createdAt: 'Yesterday',
    },
    {
      message: 'Hello, I am your personal chatbot. How can I help you?',
      user: 'bot',
      createdAt: 'Today',
    },
    {
      message: "I need to know my plant's PH level",
      user: 'user',
      createdAt: 'Today',
    },
    {
      message: "Your plant's PH level is 7.5",
      user: 'bot',
      createdAt: 'Today',
    },
  ];

  const handleMessageChange = (e) => {
    setMessageInput(e.target.value.trim());
  };

  const sendMessage = (e) => {
    // console.log(e);
    // e.preventDefault();
    if (messageInput === '') {
      return;
    }
    dispatch(sendMessage(messageInput)).then((data) => {
      console.log(data);
    });
    setMessageInput('');
  };

  return (
    <div className="container px-5 flex flex-col h-[100vh]">
      <div className="flex-none flex justify-start py-3 items-center">
        <Link href="/activities">
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
        <div className="rounded-full w-10 h-10 ml-10 relative overflow-hidden">
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
        {messages.map((message, index) => (
          <div key={index} className="">
            {index == 0 ||
            message.createdAt !== messages[index - 1].createdAt ? (
              <div className="flex justify-center my-4">
                <p className="text-[#7B7B7B] text-base">{message.createdAt}</p>
              </div>
            ) : null}
            <div ref={observe} className="observer"></div>
            <div className="flex my-4">
              {message.user == 'bot' && (
                <>
                  <div className="rounded-full w-12 h-12 relative overflow-hidden">
                    <Image
                      src={'/icon-512x512.png'}
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
                    <p className="text-sm text-[#ABABAB]">19:00</p>
                  </div>
                </>
              )}
              {message.user != 'bot' && (
                <>
                  <div className="flex-none w-auto ml-4 flex items-center">
                    <p className="text-sm text-[#ABABAB]">19:00</p>
                  </div>
                  <div className="flex-1 py-3 px-7 ml-4 rounded-full bg-[#1F8734] ">
                    <p className="text-white text-sm">{message.message}</p>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </main>
      <form className="flex-none flex py-5">
        <input
          className="flex-1 placeholder-gray-500 w-full h-[50px] rounded-full px-3 py-3"
          type="text"
          name="message"
          placeholder="Type a message..."
          onChange={handleMessageChange}
        ></input>
        <div className="flex-none w-20px h-auto relative ml-5">
          <Image
            src="/assets/attachIcon.svg"
            alt="get-started Image"
            layout="fill"
            objectFit="contain"
            loading="lazy"
          ></Image>
        </div>
        <button
          onClick={sendMessage}
          className="flex-none w-20px h-auto relative ml-5"
          type="submit"
        >
          <Image
            src="/assets/sendIcon.svg"
            alt="get-started Image"
            layout="fill"
            objectFit="contain"
            loading="lazy"
          ></Image>
        </button>
      </form>
    </div>
  );
}
