import express from "express";
import {
  addMovie,
  addMovieActor,
  deleteMovie,
  getAllMovieActor,
  getMovie,
  getMovies,
  linkActorMovie,
  updateMovie,
  updateMovieActor,
} from "../controllers/movieController";
const router = express.Router();

router.post("/addmovie", addMovie);
router.get("/getmovies", getMovies);
router.post("/addmovieactor", addMovieActor);
router.get("/getmovieactor", getAllMovieActor);
router.delete("/deletemovie/:id", deleteMovie);
router.get("/getmovie/:id", getMovie);
router.put("/updatemovie/:id", updateMovie);
router.put("/linkactormovie/:movieid/:actorid", linkActorMovie);
router.put("/updatemovieactor/:movieid/:actorid", updateMovieActor);

export default router;
