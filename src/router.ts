import { Router } from "express";
import { body, param } from "express-validator";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  updateAvailability,
  deleteProduct,
} from "./handlers/product";
import { handleInputErrors } from "./middleware";

const router: Router = Router();
/**
 * @swagger
 * components:
 *      schemas:
 *          Product:
 *              type: object
 *              properties:
 *                  id:
 *                      type: integer
 *                      description: The Product ID
 *                      example: 1
 *                  name:
 *                      type: string
 *                      description: The name of the Product
 *                      example: Monitor Curvo de 49 Pulgadas
 *                  price:
 *                      type: number
 *                      description: The price of the Product
 *                      example: 1200
 *                  availability:
 *                      type: boolean
 *                      description: The availability of the Product
 *                      example: true
 */

/**
 * @swagger
 * /api/products:
 *      get:
 *          summary: Get all products
 *          tags:
 *              - Products
 *          description: Return a List of products
 *          responses:
 *              200:
 *                  description: Successful response
 *                  content:
 *                          application/json:
 *                                schema:
 *                                  type: array
 *                                  items:
 *                                      $ref: '#/components/schemas/Product'
 */

// Routing
router.get("/", getProducts);

/**
 * @swagger
 * /api/products/{id}:
 *  get:
 *      summary: Get a product by ID
 *      tags:
 *          - Products
 *      description: Return a product based on its unique ID
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The ID of the product to retrieve
 *          required: true
 *          schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: Successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          404:
 *              description: Product not found
 *          400:
 *              description: Bad Request - Invalid ID
 */
router.get(
  "/:id",
  param("id").isInt().withMessage("ID no válido"),
  handleInputErrors,
  getProductById
);

/**
 * @swagger
 * /api/products:
 *  post:
 *      summary: Create a new product
 *      tags:
 *          - Products
 *      description: Create a new product. Returns a new record in the database
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              example: "Monitor Curvo 49 Pulgadas"
 *                          price:
 *                              type: number
 *                              example: 399
 *                          availability:
 *                              type: boolean
 *                              example: true
 *      responses:
 *          201:
 *              description: Successful response. Product created successfully
 *          400:
 *              description: Bad Request - Invalid input data
 *
 */
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

/**
 * @swagger
 * /api/products/{id}:
 *  put:
 *      summary: Update a product with user input
 *      tags:
 *          - Products
 *      description: Returns the updated product
 *      parameters:
 *          - in: path
 *            name: id
 *            description: The ID of the product to update
 *            required: true
 *            schema:
 *                type: integer
 *      requestBody:
 *            required: true
 *            content:
 *                application/json:
 *                    schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              example: "Monitor Curvo 49 Pulgadas"
 *                          price:
 *                              type: number
 *                              example: 399
 *                          availability:
 *                              type: boolean
 *                              example: true
 *        responses:
 *          200:
 *              description: Succesful response
 *              content:
 *                  aplication/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          400:
 *              description: Bad request - Invalid ID or Invalid input data
 *          404:
 *              description: Product Not found
 */
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
  deleteProduct
);

export default router;
