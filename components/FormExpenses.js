import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";

const FormExpenses = () => {
  const router = useRouter();
  const [date, setDate] = useState("");
  const [storeName, setStoreName] = useState("");
  const [imgCheck, setImgCheck] = useState("");
  const [amount, setAmount] = useState("");
  const [expType, setExpType] = useState("");

  const typeShop = [
    {
      name: "BigShop",
    },
    { name: "FastShop" },
  ];

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const data = { date, storeName, imgCheck, amount, expType };
    await axios.post("/api/expenses", data);
    router.push("/expenses");
  };
  return (
    <div className="rounded-md w-full">
      <form onSubmit={handleSubmit} className="md:w-1/2">
      
        <label>Store</label>
        <input
          value={storeName}
          onChange={(ev) => setStoreName(ev.target.value)}
          type="text"
          placeholder="store name"
        />
        <label>Check</label>
        <input
          value={imgCheck}
          onChange={(ev) => setImgCheck(ev.target.value)}
          type="text"
          placeholder="upload"
        />
        <label>Mount</label>
        <input
          value={amount}
          onChange={(ev) => setAmount(ev.target.value)}
          type="number"
          placeholder="00.00 €"
        />
        <label>type</label>
        <select value={expType} onChange={(ev)=>setExpType(ev.target.value)}>
          {typeShop.length > 0 && typeShop.map((ts)=>(
            <option key={ts.name} value={ts.name}>{ts.name}</option>
          ))}
          
        </select>
        <button className="btn-primary">Save</button>
      </form>
    </div>
  );
};

export default FormExpenses;
