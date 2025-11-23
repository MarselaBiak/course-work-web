import express from "express";
const router = express.Router();

router.post("/add", (req, res) => {
  console.log("CART ADD BODY:", req.body);
  res.json({ message: "OK" });
});

export default router;
