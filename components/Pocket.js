import axios from "axios";
import React, { useEffect, useState } from "react";
import Info from "./Info";

const Pocket = () => {
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

  return (
    <div className=" relative bg-tableBg w-full h-44 z-[1]  md:w-60 rounded-md shadow-lg p-4 flex flex-col items-center justify-between">
      <Info />
      <h2 className="text-center text-gray-300">Pocket</h2>
      <h3 className="text-primary  text-4xl">
        {pocket && pocket?.toFixed(2)} <span className="text-green-600">€</span>
      </h3>
      <span className="text-gray-400 flex gap-2 items-center mt-2">
        <p className=""></p>
        {pocket < 50 && (
          <div className="flex  w-24 justify-between">
            <div className="text-white font-medium">Empty</div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 text-emptyRefill"
            >
              <path
                fillRule="evenodd"
                d="M10.5 3.798v5.02a3 3 0 01-.879 2.121l-2.377 2.377a9.845 9.845 0 015.091 1.013 8.315 8.315 0 005.713.636l.285-.071-3.954-3.955a3 3 0 01-.879-2.121v-5.02a23.614 23.614 0 00-3 0zm4.5.138a.75.75 0 00.093-1.495A24.837 24.837 0 0012 2.25a25.048 25.048 0 00-3.093.191A.75.75 0 009 3.936v4.882a1.5 1.5 0 01-.44 1.06l-6.293 6.294c-1.62 1.621-.903 4.475 1.471 4.88 2.686.46 5.447.698 8.262.698 2.816 0 5.576-.239 8.262-.697 2.373-.406 3.092-3.26 1.47-4.881L15.44 9.879A1.5 1.5 0 0115 8.818V3.936z"
                clipRule="evenodd"
              />
            </svg>
           
          </div>
        )}
        {pocket > 50 && pocket < 100 && (
          <div className="flex  w-24 justify-between">
            <div className="text-white font-medium">Middle</div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 text-middleRefill"
            >
              <path
                fillRule="evenodd"
                d="M10.5 3.798v5.02a3 3 0 01-.879 2.121l-2.377 2.377a9.845 9.845 0 015.091 1.013 8.315 8.315 0 005.713.636l.285-.071-3.954-3.955a3 3 0 01-.879-2.121v-5.02a23.614 23.614 0 00-3 0zm4.5.138a.75.75 0 00.093-1.495A24.837 24.837 0 0012 2.25a25.048 25.048 0 00-3.093.191A.75.75 0 009 3.936v4.882a1.5 1.5 0 01-.44 1.06l-6.293 6.294c-1.62 1.621-.903 4.475 1.471 4.88 2.686.46 5.447.698 8.262.698 2.816 0 5.576-.239 8.262-.697 2.373-.406 3.092-3.26 1.47-4.881L15.44 9.879A1.5 1.5 0 0115 8.818V3.936z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )}
        {pocket >= 100 && (
          <div className="flex  w-24 justify-between">
            <div className="text-white font-medium">Full</div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 text-fullRefill"
            >
              <path
                fillRule="evenodd"
                d="M10.5 3.798v5.02a3 3 0 01-.879 2.121l-2.377 2.377a9.845 9.845 0 015.091 1.013 8.315 8.315 0 005.713.636l.285-.071-3.954-3.955a3 3 0 01-.879-2.121v-5.02a23.614 23.614 0 00-3 0zm4.5.138a.75.75 0 00.093-1.495A24.837 24.837 0 0012 2.25a25.048 25.048 0 00-3.093.191A.75.75 0 009 3.936v4.882a1.5 1.5 0 01-.44 1.06l-6.293 6.294c-1.62 1.621-.903 4.475 1.471 4.88 2.686.46 5.447.698 8.262.698 2.816 0 5.576-.239 8.262-.697 2.373-.406 3.092-3.26 1.47-4.881L15.44 9.879A1.5 1.5 0 0115 8.818V3.936z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )}
      </span>
    </div>
  );
};

export default Pocket;
