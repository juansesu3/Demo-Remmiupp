import { mongooseConnect } from "@/lib/mongoose";
import { Expenses } from "@/models/expenses";
import { isAdminRequest } from "./auth/[...nextauth]";

const handle = async (req, res) => {
  
  await mongooseConnect();
  await isAdminRequest(req, res);
  
  const { method } = req;

  if (method === "GET") {
    if (req.query?.id) {
      res.json(await Expenses.findOne({ _id: req.query.id }));
    } else {
      const expenses = await Expenses.find().sort({ createdAt: -1 });

      // Ordenar los gastos por fecha en orden ascendente
      
      res.json(expenses);
    }
  }

  if (method === "POST") {
    const { date, storeName, imgCheck, amount, expType } = req.body;
    const expDoc = await Expenses.create({
      date,
      storeName,
      imgCheck,
      amount,
      expType,
    });
    res.json(expDoc);
  }
  if (method === "DELETE") {
    if (req.query?.id) {
      await Expenses.deleteOne({ _id: req.query.id });
      res.json(true);
    }
  }
};
export default handle;
