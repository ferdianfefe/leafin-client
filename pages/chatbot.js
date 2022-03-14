import {
  sendMessage,
  getUserMessages,
} from "@/components/actions/messageActions";
import { useEffect, useState, createRef } from "react";
import useInView from "react-cool-inview";
import { useDispatch } from "react-redux";
import Image from "next/image";
import Moment from "react-moment";
import moment from "moment";
import ScrollToBottom, {
  useScrollToBottom,
  useScrollToTop,
} from "react-scroll-to-bottom";
import Link from "next/link";

export default function Chatbot() {
  const dispatch = useDispatch();
  const [messageInput, setMessageInput] = useState("");
  const [page, setPage] = useState(1);
  const [accMessages, setAccMessages] = useState([]);
  const limit = 7;

  const scrollToBottom = useScrollToBottom();
  const scrollToTop = useScrollToTop();

  const { observe, inView } = useInView({
    onEnter: ({ unobserve }) => {
      // dispatch(getUserMessages(page, limit)).then((data) => {
      //   if (data.docs.length > 0) {
      //     setAccMessages([...data.docs.reverse(), ...accMessages]);
      //     setPage(page + 1);
      //     scrollToTop();
      //   }
      //   if (!data.hasNextPage) unobserve();
      // });
    },
  });

  useEffect(() => {
    dispatch(sendMessage("")).then(({ data }) => {
      setAccMessages([...accMessages, ...data.slice(1)]);
      scrollToBottom();
    });
  }, []);

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
    setMessageInput(e.target.value);
  };

  const hardcodedUserInputs = [
    "",
    "Do you have any tips and trick on how to grow the plant",
    "why my plants fail?",
  ];

  const sendMessageHandler = (e) => {
    e.preventDefault();
    if (messageInput === "") {
      return;
    }
    let sentMessageInput = messageInput;
    const userMessages = accMessages.filter(
      (message) => message.isSenderBot == false
    );
    if (userMessages.length == 0) {
      sentMessageInput = "name " + messageInput;
    } else {
      sentMessageInput = hardcodedUserInputs[userMessages.length];
    }
    dispatch(sendMessage(sentMessageInput)).then(({ data }) => {
      console.log(messageInput);
      console.log(data.slice(1));
      let scriptedMessage = data[0];
      scriptedMessage.message = messageInput;
      setAccMessages([...accMessages, scriptedMessage, ...data.slice(1)]);
      setMessageInput("");
      scrollToBottom();
    });
  };

  return (
    <div className="container flex flex-col h-[100vh]">
      <div className="flex-none px-5 flex justify-start py-3 items-center shadow-md">
        <Link href="/">
          <div className="w-[20px] h-[20px] relative ml-3">
            <Image
              src="/assets/backBtn.svg"
              objectFit="contain"
              layout="fill"
              alt="edit"
              priority
            ></Image>
          </div>
        </Link>
        <div className="rounded-full w-10 h-10 ml-5 relative overflow-hidden">
          <Image
            src="/assets/muka-masseh.png"
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
      <ScrollToBottom className="flex-1 overflow-y-auto px-5">
        <div ref={observe} className="observer">
          {inView && <h1></h1>}
        </div>
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

              {message.isSenderBot ? (
                <div className="flex my-7">
                  <div className="rounded-full w-12 h-12 ml-5 relative overflow-hidden">
                    <Image
                      src="/assets/muka-masseh.png"
                      objectFit="cover"
                      layout="fill"
                      alt="profile picture"
                      loading="lazy"
                    ></Image>
                  </div>
                  <div className="flex-1 py-3 px-7 ml-4 rounded-3xl bg-[#EBEBEB] ">
                    <p className="text-[#7A7A7A] break-all text-sm">
                      {message.message}
                    </p>
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
                  <div className="flex-1 py-3 px-7 ml-4 flex-none rounded-3xl bg-primary ">
                    <p className="text-white text-sm break-all">
                      {message.message}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
      </ScrollToBottom>
      <form
        className="flex-none flex justify-center items-center p-5 shadow-md"
        onSubmit={sendMessageHandler}
      >
        <input
          className="flex-1 bg-[#F5F5F5] placeholder-gray-500 w-full h-[50px] rounded-full px-3 py-3"
          type="text"
          name="message"
          placeholder="Type a message..."
          onChange={handleMessageChange}
          value={messageInput}
        ></input>
        <div className="flex-none items-center w-8 h-8 relative ml-4">
          <Image
            src="/assets/attachIcon.svg"
            alt="get-started Image"
            layout="fill"
            objectFit="contain"
            loading="lazy"
          ></Image>
        </div>
        <button className="flex-none w-8 h-8 relative ml-4" type="submit">
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
