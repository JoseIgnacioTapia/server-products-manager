import express, { Application } from "express";
import colors from "colors";
import swaggerUI from "swagger-ui-express";
import swaggerSpec, { swaggerUiOptions } from "./config/swagger";
import router from "./router";
import db from "./config/db";

// Conectar a base de datos
export async function connectDB() {
  try {
    await db.authenticate();
    db.sync();
    // console.log(colors.bgGreen.magenta.bold("Conexión a la bd exitosa"));
  } catch (error) {
    // console.log(error);
    console.log(
      colors.bgRed.white("Hubo un error al conectar a la base de datos.")
    );
  }
}
connectDB();

// Instancia de express
const server: Application = express();

// Leer datos de formularios
server.use(express.json());

server.use("/api/products", router);

// server.get("/api", (req, res) => {
//   res.json({
//     message: "Bienvenido a la API",
//   });
// });

// Docs
server.use(
  "/docs",
  swaggerUI.serve,
  swaggerUI.setup(swaggerSpec, swaggerUiOptions)
);

export default server;
