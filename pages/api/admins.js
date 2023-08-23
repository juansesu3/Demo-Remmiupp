import { mongooseConnect } from "@/lib/mongoose";
import { isAdminRequest } from "./auth/[...nextauth]";
import { Admin } from "@/models/admin";

const handle = async (req, res) => {
  await mongooseConnect();
  await isAdminRequest(req, res);

  const { method } = req;

  if (method === "GET") {
    if (req.query?.id) {
      res.json(await Admin.findOne({ _id: req.query.id }));
    } else {
      const AdminDoc = await Admin.find().sort({ createdAt: -1 });

      res.json(AdminDoc);
    }
  }

  if (method === "POST") {
    const { email } = req.body;
    if (await Admin.findOne({ email })) {
      res.status(400).json({ message: "This admin already exist!" });
    } else {
      res.json(await Admin.create({ email }));
    }
  }

  if (method === "DELETE") {
    const { _id } = req.query;

    await Admin.findByIdAndDelete(_id);
    res.json(true);
  }
};
export default handle;
