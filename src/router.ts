import { Router } from "express";

const router: Router = Router();

// Routing
router.get("/", (req, res) => {
  res.json("Desde GET");
});

router.post("/", (req, res) => {
  res.json("Desde POST");
});

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
