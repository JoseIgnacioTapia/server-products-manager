import express, { Application } from "express";
import colors from "colors";
import router from "./router";
import db from "./config/db";

// Conectar a base de datos
async function connectDB() {
  try {
    await db.authenticate();
    db.sync();
    console.log(colors.bgGreen.magenta.bold("Conexión a la bd exitosa"));
  } catch (error) {
    console.log(error);
    console.log(
      colors.bgRed.white("Hubo un error al conectar a la base de datos.")
    );
  }
}
connectDB();

const server: Application = express();

server.use("/api/products", router);

export default server;
