import { Router } from "express";
import { body } from "express-validator";
import { createProduct, getProducts } from "./handlers/product";
import { handleInputErrors } from "./middleware";

const router: Router = Router();

// Routing
router.get("/", getProducts);

router.post(
  "/",
  // Validación
  body("name")
    .notEmpty()
    .withMessage("El campo nombre de Producto es obligatorio"),
  body("price")
    .isNumeric()
    .withMessage("Valor no válido")
    .notEmpty()
    .withMessage("El campo nombre de Producto es obligatorio")
    .custom((value) => value > 0)
    .withMessage("Precio no válido"),
  handleInputErrors,
  createProduct
);

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
