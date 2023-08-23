import  { Schema, model, models } from "mongoose";

const ExpensesSchema = new Schema({
 
  storeName: { type: String, required: true },
  imgCheck: { type: String,  },
  amount: { type: Number, required: true },
  expType: { type: String, required: true },
},{
  timestamps: true,
});

export const Expenses = models.Expenses || model("Expenses", ExpensesSchema);
