import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import MyThreeComponent from "./MyThreeComponent";
require("dotenv").config();

const Suggestion = () => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [chatLog, setChatLog] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pocket, setPocket] = useState(Number);
  const [add, setAdd] = useState([]);
  const [lesses, setLessses] = useState([]);

  useEffect(() => {
    axios.get("api/refill").then((response) => {
      setAdd(response.data);
    });
    axios.get("/api/expenses").then((response) => {
      setLessses(response.data);
    });
  }, []);

  useEffect(() => {
    const totalAddAmount = totalAdd(add);
    const totalLessesAmount = totalLesss(lesses);
    const pocketBalance = totalAddAmount - totalLessesAmount;
    setPocket(pocketBalance);
  }, [add, lesses]);

  const totalAdd = (add) => {
    const totalAmount = add.reduce(
      (accumulator, currentValue) => accumulator + currentValue.amount,
      0
    );
    return totalAmount;
  };
  const totalLesss = (lesses) => {
    const totalAmount = lesses.reduce(
      (accumulator, currentValue) => accumulator + currentValue.amount,
      0
    );
    return totalAmount;
  };

  const handleSubmit = (e) => {
    const OutPrompt = {
      message: `${inputValue} `,
    };

    e.preventDefault();
    setChatLog((prevChatLog) => [
      ...prevChatLog,
      { type: "user", message: OutPrompt.message },
    ]);
    sendMessage(inputValue);
    setInputValue("");
  };
  const sendMessage = (message) => {
    const url = "https://api.openai.com/v1/chat/completions";
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
    };
    const data = {
      /*model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],*/

      model: "gpt-3.5-turbo",
      temperature: 0.8,
      n: 1,
      stream: false,
      messages: [
        {
          role: "system",
          content: `Respond the user as Mr. ${session?.user?.name
            .split(" ")
            .shift()} and say  "I'm here to help you!" 
            Your behavior will be a responsible, 
            attentive, nice  assistent and accountant woman.
            Always you help the user to improve their finacial skills.
            Limit the response to 200 caracters `,
        },
        {
          role: "user",
          content: `Hi there, provide of the following data:
          This is refills:{${JSON.stringify(add)}},
          This is expenses:{${JSON.stringify(lesses)}}, 
          this available money after (expenses-refills): {${JSON.stringify(
            pocket
          )}},
         
          ${inputValue}`,
        },
      ],
    };
    setIsLoading(true);
    axios
      .post(url, data, { headers: headers })
      .then((response) => {
        console.log(response);
        setChatLog((prevChatLog) => [
          ...prevChatLog,
          { type: "bot", message: response.data.choices[0].message.content },
        ]);
        console.log(chatLog);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  };
  const containerWidth = 80; // Define el ancho del contenedor según tus necesidades
  const containerHeight = 80; // Define la altura del contenedor según tus necesidades

  return (
    <div className="relative ">
      <div
        className={`fixed bottom-0 right-6 w-64 shadow-md flex flex-col gap-2 p-4 rounded-md bg-[#1d1d1f] mb-20 ${
          isOpen ? "open transition-all duration-300" : "hidden"
        }`}
      >
        <div className="max-h-80 overflow-y-auto ">
          {chatLog.map((message, index) => (
            <>
              <div
                className={` text-white pt-2 pb-0  ${
                  message.type === "user" ? "text-end" : "text-start"
                }`}
              >
                {message.type.replace("bot", "Geniuss: ").replace("user", `me`)}
              </div>

              <div
                key={index}
                className={`${
                  message.type === "user"
                    ? "text-white text-end  shadow-md py-1 pr-4 mt-2 rounded-lg bg-[#4d61fc]  "
                    : "text-[#4d61fc] text-start  shadow-md py-2  mt-2  px-1 rounded-lg bg-white "
                }`}
              >
                {message.message}
              </div>
            </>
          ))}
        </div>
        <form>
          <div className=" full flex flex-col gap-2 rounded-md  bg-transparent ">
            <div>
              <span className="relative animate-pulse  flex flex-col h-14 w-6 mx-auto my-2 ">
                <div className={`flex items-start justify-center`}>
                  <MyThreeComponent containerWidth={60} containerHeight={60} isLoading={isLoading} />
                </div>
              </span>
            </div>
            <div className="flex gap-1 ">
              <input
                className="m-0 px-2 py-1 shadow-md"
                type="text"
                placeholder="How can I help you?"
                value={inputValue}
                onChange={(ev) => setInputValue(ev.target.value)}
              />
              <button
                onClick={handleSubmit}
                type="button"
                className="shadow-md btn-primary"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                  />
                </svg>
              </button>
            </div>
          </div>
        </form>
      </div>
      <button
        className={`fixed bottom-8 right-10 w-10 h-10 flex items-center justify-center shadow-md rounded-full bg-sky-500 ${
          isOpen ? "open rotate-90 duration-300" : ""
        }`}
        onClick={() => setIsOpen((prevIsOpen) => !prevIsOpen)}
      >
        {isOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4 "
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <MyThreeComponent
            containerWidth={containerWidth}
            containerHeight={containerHeight}
          />
        )}
      </button>
    </div>
  );
};

export default Suggestion;
