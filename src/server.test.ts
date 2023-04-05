import supertest from "supertest";

import { prismaMock } from "./lib/prisma/client.mock";

import app from "./app";

const request = supertest(app);

describe("GET /planets", () => {
  test("Valid request", async () => {
    const planets = [
      {
        id: 1,
        name: "Mercury",
        description: null,
        diameter: 1234,
        moons: 12,
        createdAt: "2023-03-20T16:34:17.663Z",
        updatedAt: "2023-03-20T16:33:56.512Z",
      },
      {
        id: 2,
        name: "Venus",
        description: null,
        diameter: 21354,
        moons: 2,
        createdAt: "2023-03-20T16:35:06.970Z",
        updatedAt: "2023-03-20T16:34:59.198Z",
      },
    ];

    //@ts-ignore
    prismaMock.planet.findMany.mockResolvedValue(planets);

    const response = await request
      .get("/planets")
      .expect(200)
      .expect("Content-type", /application\/json/);

    expect(response.body).toEqual(planets);
  });
});

describe("POST /planets", () => {
  test("Valid request", async () => {
    const planet = {
      id: 3,
      name: "Mercury",
      description: null,
      diameter: 1234,
      moons: 12,
      createdAt: "2023-04-05T21:27:04.082Z",
      updatedAt: "2023-04-05T21:27:04.082Z",
    };

    //@ts-ignore
    prismaMock.planet.create.mockResolvedValue(planet);

    const response = await request
      .post("/planets")
      .send(planet)
      .expect(422)
      .expect("Content-type", /application\/json/);

    expect(response.body).toEqual(planet);
  });

  test("Invalid request", async () => {
    const planet = [
      {
        diameter: 1234,
        moons: 12,
      },
    ];

    const response = await request
      .post("/planets")
      .send(planet)
      .expect(422)
      .expect("Content-type", /application\/json/);

    expect(response.body).toEqual({
      errors: {
        body: expect.any(Array),
      },
    });
  });
});
