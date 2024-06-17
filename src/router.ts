import { Router } from "express";
import { body, param } from "express-validator";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  updateAvailability,
} from "./handlers/product";
import { handleInputErrors } from "./middleware";

const router: Router = Router();

// Routing
router.get("/", getProducts);

router.get(
  "/:id",
  param("id").isInt().withMessage("ID no válido"),
  handleInputErrors,
  getProductById
);

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

router.patch(
  "/:id",
  param("id").isInt().withMessage("ID no válido"),
  handleInputErrors,
  updateAvailability
);

router.put(
  "/:id",
  param("id").isInt().withMessage("ID no válido"),
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
  body("availability")
    .isBoolean()
    .withMessage("Valor para disponbilidad no válido"),
  handleInputErrors,
  updateProduct
);

router.delete(
  "/:id",
  param("id").isInt().withMessage("ID no válido"),
  handleInputErrors,
  updateProduct
);

export default router;
