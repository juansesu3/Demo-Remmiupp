import Nav from "@/components/Nav";
import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import Suggestion from "./Suggestion";

import axios from "axios";
import { useRouter } from "next/navigation";
import dashboard from "@/pages/dashboard";

const Layout = ({ children }) => {
  const [showNav, setShowNav] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(false);
  const router = useRouter();
  const [session, setSession] = useState(false);

  useEffect(() => {
    axios.get("api/register").then((response) => {
      setUsers(response.data);
    });
  }, []);

  const handleSignInCredentials = async (e) => {
    e.preventDefault();
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result.error) {
        setError(true);
        console.log(error);
        return;
      }
      router.replace("/");
      setSession(true);
    } catch (error) {
      console.log(error);
    }
  };

  if (!session) {
    return (
      <div className="bg-[#1d1d1f] w-screen h-screen flex items-center">
        <div className="text-center w-full ">
          <div className="flex flex-col items-center justify-center">
            <p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-10 h-10 text-green-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
                />
              </svg>
            </p>
            <h1
              className="text-highlight font-bold text-4xl
          mb-4 "
            >
              RemiUpp Demo
            </h1>
          </div>
          <div className="flex flex-col  w-52 m-auto">
            <p className="text-gray-500 text-sm m-2">If you want to try it</p>

            <p className="m-0 text-gray-600 text-start">
              email: <span className="text-gray-200">jhondoe@test.com</span>
            </p>
            <p className="m-0 text-gray-600 text-start">
              password: <span className="text-gray-200">123456 </span>
            </p>
            <form className="flex flex-col gap-2 mt-2">
              <input
                type="email"
                placeholder="Demo email"
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
              />
              <input
                type="password"
                placeholder="Demo password"
                value={password}
                onChange={(ev) => setPassword(ev.target.value)}
              />
              <button
                type="button"
                onClick={handleSignInCredentials}
                href={"https://e-commerce-admin-kappa.vercel.app/"}
                className="bg-gray-700 p-2 px-4 rounded-lg text-primary font-medium shadow-md"
              >
                Login with demo
              </button>

              {error && (
                <p className="px-2 bg-red-500 text-white rounded-md">
                  Invalid Credentials{" "}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-bgGray min-h-screen relative">
      <div className=" md:hidden flex items-center p-1">
        <button onClick={() => setShowNav(true)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6 text-white"
          >
            <path
              fillRule="evenodd"
              d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <div className="flex grow justify-center mr-6"></div>
      </div>

      <div className="flex">
        <Nav show={showNav} />
        <div className="flex-grow py-4 px-2">{children}</div>

        <div className="fixed bottom-4 right-4">
          <Suggestion />
        </div>
      </div>
    </div>
  );
};

export default Layout;
