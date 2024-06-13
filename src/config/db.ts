import { Sequelize } from "sequelize";

const db = new Sequelize(
  "postgres://rest_api_node_typescript_k0xx_user:s0gr0gLvb2jic71uOD1WbhVduleadJg0@dpg-cpl3d2a1hbls73b2jcr0-a.oregon-postgres.render.com/rest_api_node_typescript_k0xx?ssl=true"
);

export default db;
