import { useState } from "react";
import Image from "next/image";
import Button from "../components/Button";

export default function question() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([""]);
  const answersArray = [];

  const questions = [
    {
      question: "Lorem ipsum dolor sit amet?",
      options: [
        {
          text: "Mawar",
        },
        {
          text: "Melati",
        },
        {
          text: "Kobis",
        },
        {
          text: "Bawang",
        },
      ],
    },
    {
      question: "Are you adventorous in choosing the plants?",
      options: [
        {
          text: "Hu Tao",
        },
        {
          text: "Ganyu",
        },
        {
          text: "Tatang",
        },
        {
          text: "Budi",
        },
      ],
    },
  ];

  return (
    <div className="container mx-auto h-[100vh] w-[100vw] p-5 flex flex-wrap justify-center">
      <div className="flex flex-col justify-between items-center">
        <div className="top">
          <h1 className="font-bold text-center text-2xl px-10 mb-10">
            Almost Ready
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
                      console.log(answers);
                    }}
                  >
                    {option.text}
                  </Button>
                ))}
              </div>
            </div>
          )}
          {step === questions.length + 1 && (
            <div>
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
                Cari tanaman yang cocok dengan pribadi dan kesibukan kamu
              </p>
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
            className={"mt-5 border bg-primary text-white font-bold"}
            onClick={() => {
              setStep(step + 1);
              console.log(answers);
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
      </div>
    </div>
  );
}
