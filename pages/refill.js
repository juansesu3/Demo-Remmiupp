import FormRecharges from "@/components/FormRefills";
import Layout from "@/components/Layout";
import Pocket from "@/components/Pocket";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { format } from "date-fns";
const RechargePage = () => {
  const dateFormat = "MM/dd/yyyy HH:mm:ss";
  const [refilss, setRefills] = useState([]);
  useEffect(() => {
    axios.get("api/refill").then((response) => {
      setRefills(response.data);
    });
  }, []);
  
  return (
    <Layout>
      <h1 className="text-primary ">Refill page</h1>
      <div className="flex flex-col gap-2 mt-4">
        <div className="w-full flex flex-col-reverse gap-2 justify-center items-center md:justify-start md:flex-row">
          <FormRecharges />
          <Pocket />
        </div>
        <table className="basic">
          <thead>
            <tr>
              <td>mount</td>
              <td>date</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {refilss &&
              refilss.map((reff) => (
                <tr key={reff._id}>
                  <td className="whitespace-nowrap">
                    {reff.amount}
                    <spna className="text-green-600 "> €</spna>{" "}
                  </td>
                  <td>{format(new Date(reff.createdAt), dateFormat)}</td>

                  <td>
                    <Link className="btn-primary" href={"/"}>
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

export default RechargePage;
