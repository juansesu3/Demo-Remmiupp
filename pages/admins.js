import Layout from "@/components/Layout";
import Spinner from "@/components/Spinner";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { withSwal } from "react-sweetalert2";
import { useSession } from "next-auth/react";

const AdminsPage = ({ swal }) => {
  const dateFormat = "MM-dd-yyyy HH:mm:ss";
  const [email, setEmail] = useState("");
  const [emails, setEmails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();
  const addAdmin = async (ev) => {
    ev.preventDefault();
    if (session) {
      axios
        .post("/api/admins", { email })
        .then((res) => {
          console.log(res.data);
          swal.fire({
            title: "Admin created!",
            icon: "success",
          });
          setEmail("");
          loadsAdmins();
        })
        .catch((error) => {
          console.log(error);
          swal.fire({
            title: "Error!",
            text: error.response.data.message,
            icon: "error",
          });
        });
    }
  };
  const loadsAdmins = () => {
    setIsLoading(true);
    axios.get("/api/admins").then((response) => {
      setEmails(response.data);
      setIsLoading(false);
    });
  };

  const delteAdmin = (_id, email) => {
    swal
      .fire({
        title: "Are you sure?",
        text: `Do you want to fire admin ${email}`,
        showCancelButton: true,
        cancelButtonText: "Cancel",
        confirmButtonText: "Yes, Fire!",
        confirmButtonColor: "#009aff",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          axios.delete("/api/admins?_id=" + _id).then(() => {
            swal.fire({
              title: "Admin fired!",
              icon: "success",
            });
            loadsAdmins();
          });
        }
      });
  };

  useEffect(() => {
    loadsAdmins();
  }, []);

  return (
    <Layout>
      <h1 className="text-primary">Existing admins</h1>

      <table className="basic mt-2">
        <thead>
          <tr>
            <td>Admin mail</td>

            <td></td>
          </tr>
        </thead>
        <tbody>
          {isLoading && (
            <tr>
              <td colSpan={2}>
                <div className="py-4 flex items-center justify-center">
                  <Spinner fullWidth={true} />
                </div>
              </td>
            </tr>
          )}
          {emails.length > 0 &&
            emails.map((email) => (
              <tr key={email._id}>
                <td className="text-start text-white p-4">{email.email}</td>
                {/*<td>{format(new Date(email.createdAt), dateFormat)}</td>*/}
                <td>
                  <button
                    onClick={() => delteAdmin(email._id, email.email)}
                    className="btn-red"
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
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <h2 className="mt-4  text-primary">Add new admin</h2>
      <form onSubmit={addAdmin} className="mt-2">
        <div className="flex flex-row md:flex-col gap-2">
          <input
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
            className="mb-0"
            placeholder="google email"
          />
          <button className="btn-primary md:w-32 whitespace-nowrap">
            Add admin
          </button>
        </div>
      </form>
    </Layout>
  );
};

export default withSwal(({ swal }) => <AdminsPage swal={swal} />);
