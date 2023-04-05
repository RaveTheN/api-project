import express from "express";
import "express-async-errors";
import prisma from "./lib/prisma/client";

import {
  validate,
  planetSchema,
  PlanetData,
  validationErrorMiddleware,
} from "./lib/validation";

const app = express();

app.use(express.json()); //questo è necessario quando il server riceve una richiesta application/json, così capisce di parsare la stringa di json e farlo diventare un oggetto

app.get("/planets", async (request, response) => {
  const planets = await prisma.planet.findMany();

  response.json(planets);
});

app.post(
  "/planets",
  validate({ body: planetSchema }),
  async (request, response) => {
    const PlanetData: PlanetData = request.body;

    const planet = await prisma.planet.create({
      data: PlanetData,
    });

    response.status(201).json(planet);
  }
);

app.use(validationErrorMiddleware);

export default app;
