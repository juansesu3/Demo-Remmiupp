import FormExpenses from "@/components/FormExpenses";
import Layout from "@/components/Layout";
import Pocket from "@/components/Pocket";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const ExpensesPage = () => {
  const [expenses, setExpenses] = useState([]);
  useEffect(() => {
    axios.get("/api/expenses").then((response) => {
      setExpenses(response.data);
    });
  }, []);

  return (
    <Layout>
      <h1 className="text-primary">Expenses page</h1>
      <div className="flex flex-col gap-4 mt-4">
        <Pocket />
        <Link
          className="btn-primary w-40 flex justify-center items-center"
          href="/expense/new"
        >
          Add Expenses
        </Link>
        <table className="basic">
          <thead>
            <tr>
              <td>amount</td>
              <td>store</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {expenses.length > 0 &&
              expenses.map((exp) => (
                <tr key={exp._id}>
                  <td className="whitespace-nowrap">
                    {exp.amount} <span className="text-red-600">€</span>
                  </td>
                  <td>{exp.storeName}</td>

                  <td>
                    {" "}
                    <Link
                      className="btn-primary"
                      href={"/expense/view/" + exp._id}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default ExpensesPage;
