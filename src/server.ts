import express, { Application } from "express";
import router from "./router";
import db from "./config/db";

// Conectar a base de datos
async function connectDB() {
  try {
    await db.authenticate();
    db.sync();
    console.log("Conexión a la bd exitosa");
  } catch (error) {
    console.log(error);
    console.log("Hubo un error al conectar a la base de datos.");
  }
}
connectDB();

const server: Application = express();

server.use("/api/products", router);

export default server;
