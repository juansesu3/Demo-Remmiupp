import  { Schema, model, models } from "mongoose";

const RefillSchema = new Schema(
  {
   amount:{type:Number, required:true},
   currency:{type:String, }
  },
  {
    timestamps: true,
  }
);

export const Refill = models.Refill || model("Refill", RefillSchema);