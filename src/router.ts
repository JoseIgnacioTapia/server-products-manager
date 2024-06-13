import { Router } from "express";
import { createProduct } from "./handlers/product";

const router: Router = Router();

// Routing
router.get("/", (req, res) => {
  res.json("Desde GET");
});

router.post("/", createProduct);

router.patch("/", (req, res) => {
  res.json("Desde PATCH");
});

router.put("/", (req, res) => {
  res.json("Desde PUT");
});

router.delete("/", (req, res) => {
  res.json("Desde DELETE");
});

export default router;
