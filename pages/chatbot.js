import {
  sendMessage,
  getUserMessages,
} from "@/components/actions/messageActions";
import { useEffect, useState } from "react";
import useInView from "react-cool-inview";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import Moment from "react-moment";
import moment from "moment";

export default function Chatbot() {
  const dispatch = useDispatch();
  const [messageInput, setMessageInput] = useState("");
  const [page, setPage] = useState(1);
  const [accMessages, setAccMessages] = useState([]);
  const limit = 5;

  useEffect(() => {
    /* Initiate bot response */
    // dispatch(sendMessage("")).then(() => {
    dispatch(getUserMessages(page, limit)).then((data) => {
      console.log(data);
      if (data.docs.length > 0) {
        setAccMessages([...accMessages, ...data.docs]);
        setPage(page + 1);
      }
    });
    // });
  }, []);

  const { observe, inView } = useInView({
    onEnter: ({ unobserve }) => {
      dispatch(getUserMessages(page, limit)).then((data) => {
        if (data.docs.length > 0) {
          setAccMessages([...accMessages, ...data.docs]);
          setPage(page + 1);
        }
        if (!data.hasNextPage) unobserve();
      });
    },
  });

  const getRelativeTime = (date) =>
    moment(date).calendar(null, {
      sameDay: "[Today]",
      nextDay: "[Tomorrow]",
      nextWeek: "dddd",
      lastDay: "[Yesterday]",
      lastWeek: "[Last] dddd",
      sameElse: "DD/MM/YYYY",
    });

  const handleMessageChange = (e) => {
    setMessageInput(e.target.value.trim());
  };

  const sendMessageHandler = (e) => {
    e.preventDefault();
    if (messageInput === "") {
      return;
    }
    dispatch(sendMessage(messageInput)).then((data) => {
      dispatch(getUserMessages(page, 5)).then((data) => {
        if (data.docs.length > 0) {
          setAccMessages([...accMessages, ...data.docs]);
          setPage(page + 1);
        }
        setMessageInput("");
      });
    });
  };

  return (
    <div className="container flex flex-col h-[100vh]">
      <div className="flex-none px-5 flex justify-start py-3 items-center shadow-md">
        <div className="w-auto h-[20px] relative ml-5">
          <Image
            src="/assets/backBtn.svg"
            objectFit="contain"
            layout="fill"
            alt="edit"
            priority
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
          <h3 className="font-bold text-md ">Afi</h3>
          <p className="font-semibold w-full text-center text-sm text-[#B8B8B8]">
            Last seen recently
          </p>
        </div>
      </div>
      <main className="flex-1 overflow-y-auto px-5">
        {accMessages &&
          accMessages.map((message, index) => (
            <div key={index} className="">
              {index == 0 ||
              getRelativeTime(message.createdAt) !==
                getRelativeTime(accMessages[index - 1].createdAt) ? (
                <div className="flex justify-center my-4">
                  <p className="text-[#7B7B7B] text-base">
                    {getRelativeTime(message.createdAt)}
                  </p>
                </div>
              ) : null}
              <div ref={observe} className="observer">
                {inView && <h1></h1>}
              </div>
              {message.isSenderBot ? (
                <div className="flex my-7">
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
                    <p className="text-sm text-[#ABABAB]">
                      <Moment format="hh:mm">{message.createdAt}</Moment>
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex my-4">
                  <div className="flex-none w-auto ml-2 flex items-center">
                    <p className="text-sm text-[#ABABAB]">
                      <Moment format="hh:mm">{message.createdAt}</Moment>
                    </p>
                  </div>
                  <div className="flex-1 py-3 px-7 ml-4 rounded-full bg-primary ">
                    <p className="text-white text-sm">{message.message}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
      </main>
      <form
        className="flex-none flex p-5 shadow-lg"
        onSubmit={sendMessageHandler}
      >
        <input
          className="flex-1 placeholder-gray-500 w-full h-[50px] rounded-full px-3 py-3"
          type="text"
          name="message"
          placeholder="Type a message..."
          onChange={handleMessageChange}
          value={messageInput}
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
        <button className="flex-none w-20px h-auto relative ml-5" type="submit">
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
