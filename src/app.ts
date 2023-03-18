import express from "express";
import "express-async-errors";

const app = express();

function getPlanets() {
  const planets = [{ name: "Mercury" }, { name: "Venus" }];

  return planets;
}

app.get("/planets", (request, response) => {
  const planets = getPlanets();

  response.json(planets);
});

export default app;
