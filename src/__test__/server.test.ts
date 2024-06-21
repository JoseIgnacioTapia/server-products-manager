// import request from "supertest";
import server, { connectDB } from "../server";
import db from "../config/db";

// describe("Nuestro primer test", () => {
//   it("Debe revisar que 1 + 1 sean 2", () => {
//     expect(1 + 1).toBe(2);
//   });

//   it("Debe revisar que 1 + 1 sean 3", () => {
//     expect(1 + 1).not.toBe(3);
//   });
// });

// describe("GET /api", () => {
//   it("Should send back a json response", async () => {
//     const res = await request(server).get("/api");

//     expect(res.status).toBe(200);
//     expect(res.headers["content-type"]).toMatch(/json/);
//     expect(res.body.message).toBe("Bienvenido a la API");

//     expect(res.status).not.toBe(404);
//     expect(res.body.msg).not.toBe("desde api");
//   });
// });

jest.mock("../config/db");

describe("connectDB", () => {
  it("should handle database connection error", async () => {
    jest
      .spyOn(db, "authenticate")
      .mockRejectedValueOnce(
        new Error("Hubo un error al conectar a la base de datos.")
      );
    const consoleSpy = jest.spyOn(console, "log");

    await connectDB();

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining("Hubo un error al conectar a la base de datos.")
    );
  });
});
