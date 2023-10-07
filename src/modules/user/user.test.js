const supertest = require("supertest");
const app = require("../../app");
const server = require("../../server");

// crear una isntancia de supertest usando app

const api = supertest(app);

// que código de estado esperamos?
// que formato de respuesta esperamos
// cual es el contenido de la respuesta

describe("Pruebas para el registro de un usuario", () => {
  test("Deberia responder un 201", async () => {
    const body = {
      firstname: "shalala",
      lastname: "shalalal",
      email: "shalalala@gmail.com",
      password: "Shalala123@",
    };

    await api.post("/api/v1/users").send(body).expect(201);
  });

  test("Deberia responder un 400 si falta alguna propiedad en el body", async () => {
    const body = {
      firstname: "shalala",
      email: "shalalala@gmail.com",
      password: "Shalala123@",
    };

    await api.post("/api/v1/users").send(body).expect(400);
  });

  test("Deberia recibir un objeto con los errores si la informacion es invalida", async () => {
    const data = {
      firstname: "shalala",
      lastname: "shalalal",
      email: "shalalala",
      password: "Shalala123@",
    };

    const { body } = await api.post("/api/v1/users").send(data);

    expect(body).toBeInstanceOf(Object);
  });

  test("Deberia recibir un objeto con la propiedad error = Invalid data si la información es invalida", async () => {
    const data = {
      firstname: "shalala",
      lastname: "",
      email: "shalalala@gmail.com",
      password: "Shalala123@",
    };

    const { body } = await api.post("/api/v1/users").send(data);

    expect(body).toHaveProperty("error", "Invalid data");
  });
});

afterAll(() => server.close());
