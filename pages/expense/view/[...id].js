import Layout from "@/components/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const ViewExpensesPage = () => {
  const router = useRouter();
  const [expInfo, setExpInfo] = useState(null);
  const { id } = router.query;
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/api/expenses?id=" + id).then((response) => {
      setExpInfo(response.data);
    });
  }, [id]);
  const goBack = () => {
    router.push("/expenses");
  };
  const deleteProyect = async () => {
    await axios.delete("/api/expenses?id=" + id);
    goBack();
  };
  return (
    <Layout>
      <div className="border flex justify-between">
        <div>
        {expInfo?.amount}
        </div>
        <div>{expInfo?.date}</div>
        <button onClick={deleteProyect} className="btn-primary">
          Delete
        </button>
      </div>
    </Layout>
  );
};

export default ViewExpensesPage;
