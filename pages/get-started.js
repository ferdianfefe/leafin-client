import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setQuizStatus } from "../components/actions/userActions";
import Image from "next/image";
import Button from "../components/Button";

export default function Question() {
  const dispatch = useDispatch();

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);

  useEffect(async () => {
    if (step === 0) {
      setAnswers([]);
    }
  }, [answers]);

  const submitQuiz = () => {
    dispatch(setQuizStatus());
  };
  const recommendationList = [
    {
      name: "Bougainvillea",
      image: "/assets/bougainvillea.jpg",
    },
    {
      name: "Jasminum",
      image: "/assets/jasminum.jpg",
    },
    {
      name: "Zingiber Officinale",
      image: "/assets/zingiber-officinale.png",
    },
    {
      name: "Orchidaceae",
      image: "/assets/orchidaceae.jpg",
    },
  ];

  const questions = [
    {
      question: "Which one do you like?",
      options: [
        {
          text: "Orchid",
        },
        {
          text: "Rose",
        },
        {
          text: "Celery",
        },
        {
          text: "Tomato",
        },
      ],
    },
    {
      question: "Are you adventorous in choosing the plants?",
      options: [{ text: "Yes" }, { text: "No" }],
    },
  ];

  return (
    <div className="container mx-auto w-[100vw] h-[100vh] p-5 flex flex-col justify-between items-center">
      <div className="top w-full">
        <h1 className="font-bold text-center text-2xl px-10 mb-10">
          {step <= questions.length
            ? "Almost Ready"
            : step === questions.length + 1
            ? "Congratulations"
            : "Recommendation"}
        </h1>
        {step === 0 && (
          <div>
            <div className="w-[315px] h-[315px] relative mx-auto">
              <Image
                loading="lazy"
                src="/assets/getStartedImage.svg"
                alt="get-started Image"
                layout="fill"
                objectFit="contain"
              ></Image>
            </div>
            <p className="text-[#8D8D8D] mt-5 text-center">
              Cari tanaman yang cocok dengan pribadi dan kesibukan kamu
            </p>
          </div>
        )}
        {step >= 1 && step <= questions.length && (
          <div className="w-[100%]">
            <h5 className="text-[#FF8900]">
              <br />
              Question {step}/{questions.length}
            </h5>
            <h5 className="mt-5">{questions[step - 1].question}</h5>
            <div className="answers">
              {questions[step - 1].options.map((option, index) => (
                <Button
                  key={index}
                  className={`mt-5 border ${
                    answers.length && answers[step - 1] == option.text
                      ? " bg-primary text-white"
                      : "border-primary text-primary"
                  } font-bold`}
                  onClick={() => {
                    setAnswers([
                      ...answers.slice(0, step - 1),
                      option.text,
                      ...answers.slice(step),
                    ]);
                  }}
                >
                  {option.text}
                </Button>
              ))}
            </div>
          </div>
        )}
        {step === questions.length + 1 && (
          <div className="w-[100%]">
            <div className="w-[315px] h-[315px] relative mx-auto">
              <Image
                loading="lazy"
                src="/assets/getStartedCompletedImg.svg"
                alt="get-started Image"
                layout="fill"
                objectFit="contain"
              ></Image>
            </div>
            <p className="text-[#8D8D8D] mt-5 text-center">
              Congratulation for your set Big steps require small steps
            </p>
          </div>
        )}
        {step === questions.length + 2 && (
          <div className="w-[100%] flex flex-wrap">
            {recommendationList.map((item, index) => (
              <div
                key={index}
                className="bg-white w-[45%] m-2 shadow-md rounded-xl flex flex-col items-center justify-center"
              >
                <div className="p-2">
                  <div className="w-28 h-28 rounded-full relative overflow-hidden">
                    <Image
                      src={item.image}
                      objectFit="cover"
                      layout="fill"
                      alt="profile picture"
                      loading="lazy"
                    ></Image>
                  </div>
                  <p className="mt-5 text-center font-bold">{item.name}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {step === 0 && (
        <Button
          className={"mt-5 border bg-primary text-white font-bold"}
          onClick={() => setStep(step + 1)}
        >
          Continue
        </Button>
      )}
      {step >= 1 && step <= questions.length && (
        <Button
          disabled={!answers[step - 1]}
          className={"mt-5 border bg-primary text-white font-bold"}
          onClick={() => {
            setStep(step + 1);
            if (step === questions.length) {
              submitQuiz();
            }
          }}
        >
          Next
        </Button>
      )}
      {step === questions.length + 1 && (
        <div>
          <Button
            className={"mt-5 border bg-primary text-white font-bold"}
            onClick={() => setStep(step + 1)}
          >
            View plant recommendation
          </Button>
          <Button
            className={"mt-5 border border-primary text-primary font-bold"}
            href="home"
          >
            Continue
          </Button>
        </div>
      )}
      {step == questions.length + 2 && (
        <div className="w-[100%]">
          <Button
            className={"mt-5 border bg-primary text-white font-bold"}
            href="home"
          >
            Back to menu
          </Button>
        </div>
      )}
    </div>
  );
}
