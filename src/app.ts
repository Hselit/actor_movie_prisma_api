import express from "express";
import path from "path";
import logger from "morgan";

import indexRouter from "./routes/index";
import actorRouter from "./actor/routes/actorRoutes";
import movieRouter from "./movie/routes/movieRoutes";

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/actor", actorRouter);
app.use("/movie", movieRouter);

export default app;
