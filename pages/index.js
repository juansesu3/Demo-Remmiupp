import Layout from "@/components/Layout";
import Pocket from "@/components/Pocket";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";

const Home = () => {
 
  const { data: session } = useSession();
  const [expenses, setExpenses] = useState([]);
  const conte =
    "w-full md:w-1/3 p-1 bg-inputColor flex flex-col items-center justify-between rounded-md shadow-lg";

  useEffect(() => {
    if (session) {
      axios.get("/api/expenses").then((response) => {
        setExpenses(response.data);
      });
      totalLesss(expenses);
    }
  }, [session]);

  const totalLesss = (lesses) => {
    const totalAmount = lesses.reduce(
      (accumulator, currentValue) => accumulator + currentValue.amount,
      0
    );
    return totalAmount;
  };

  return (
    <Layout>
      <div className="text-primary flex justify-between mb-2">
        <h2>
          {" "}
          <span className="text-white">Hi!</span>
          <br /> <b>{session?.user?.name}</b>
        </h2>
        <div className="flex gap-1 text-white rounded-lg overflow-hidden">
          <Image
            width={100}
            height={100}
            src={session?.user?.image}
            alt="image-boss"
            className="w-12 h-12 rounded-md"
          />
        </div>
      </div>

      <Pocket />
      <h2 className="text-center text-white font-medium text-xl mt-4">
        This wek
      </h2>
      <div className="flex gap-4 flex-wrap justify-center mt-4">
        <div className="flex w-full justify-between gap-2 flex-col md:flex-row">
          <div className={conte}>
            <h3 className="text-gray-400 font-medium">Shoppings</h3>
            <p className="text-primary text-4xl">
              {expenses && expenses.slice(0, 7).length}
            </p>
            <p className="text-gray-500 text-center">Shoppings this week</p>
          </div>
          <div className={conte}>
            <h3 className="text-gray-400 font-medium">Store</h3>
            <p className="text-primary text-4xl text-center">
              {expenses.slice(0, 7)[0]?.storeName}
            </p>
            <p className="text-gray-500 text-center">
              the last store you visit this week
            </p>
          </div>
          <div className={conte}>
            <h3 className="text-gray-400 font-medium">Expenses</h3>
            <p className="text-primary text-4xl">
              {totalLesss(expenses.slice(0, 7)).toFixed(2)} €
            </p>
            <p className="text-gray-500 text-center">
              the mount expenses this week{" "}
            </p>
          </div>
        </div>
      </div>
      <h2 className="text-center text-white font-medium text-xl mt-4">
        Last wek
      </h2>
      <div className="flex gap-4 flex-wrap justify-center mt-4">
        <div className="flex w-full justify-between gap-2 flex-col md:flex-row">
          <div className={conte}>
            <h3 className="text-gray-400 font-medium">Shoppings</h3>
            <p className="text-primary text-4xl">
              {" "}
              {expenses && expenses.slice(8, 15).length}
            </p>
            <p className="text-gray-500 text-center">shoppings last week</p>
          </div>
          <div className={conte}>
            <h3 className="text-gray-400 font-medium">Store</h3>
            <p className="text-primary text-4xl">
              {expenses.slice(8, 15)[0] > 0
                ? expenses.slice(8, 15)[0].storeName
                : "..."}
            </p>
            <p className="text-gray-500 text-center">
              the last store you visit last week
            </p>
          </div>
          <div className={conte}>
            <h3 className="text-gray-400 font-medium">Expenses</h3>
            <p className="text-primary text-4xl">
              {totalLesss(expenses.slice(8, 15))}
            </p>
            <p className="text-gray-500 text-center">
              the mount expenses this week{" "}
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default Home;
