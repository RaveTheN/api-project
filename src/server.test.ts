import supertest from "supertest";

import { prismaMock } from "./lib/prisma/client.mock";

import app from "./app";

const request = supertest(app);

test("Get /planets", async () => {
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
