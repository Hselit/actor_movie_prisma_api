import {
  ActorMovieResponse,
  Movie,
  MovieActorRequest,
  MovieId,
  MovieResquest,
  SingleMovieResponse,
} from "../dto/movie.dto";
import { Response, Request } from "express";
import MovieService from "../services/movieService";
import { ActorId } from "../../actor/dto/actor.dto";

//Create New Movie
export const addMovie = async (req: Request, res: Response) => {
  try {
    const movieRequest: MovieResquest = req.body;
    const movieResponse: Movie = await MovieService.createMovie(movieRequest);
    res.status(200).json(movieResponse);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//get Movie with Movie Id
export const getMovie = async (req: Request, res: Response) => {
  try {
    const movieid: MovieId = parseInt(req.params.id);
    if (isNaN(movieid)) {
      res.status(400).json({ message: "Invalid Id" });
      return;
    }
    const movieResponse: SingleMovieResponse = await MovieService.getMovieById(movieid);
    if (!movieResponse) {
      res.status(404).json({ message: "No Movie Found" });
      return;
    }
    res.status(200).json(movieResponse);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//get All Movies
export const getMovies = async (req: Request, res: Response) => {
  try {
    const movielist: Movie[] = await MovieService.getMovieList();
    if (!movielist) {
      res.status(400).json({ message: "No Movies Found" });
      return;
    }
    res.status(200).json(movielist);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//update Single Movie
export const updateMovie = async (req: Request, res: Response) => {
  try {
    const movieid: MovieId = parseInt(req.params.id);
    const movieRequest: MovieResquest = req.body;
    const movieResponse: SingleMovieResponse = await MovieService.updateMovie(
      movieRequest,
      movieid
    );
    if (!movieResponse) {
      res.status(400).json({ message: "No Movie Found with this Id" });
      return;
    }
    res.status(200).json(movieResponse);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//Delete Movie by Id
export const deleteMovie = async (req: Request, res: Response) => {
  try {
    const movieid: MovieId = parseInt(req.params.id);
    const movieResponse: SingleMovieResponse = await MovieService.deleteMovieActor(movieid);
    if (!movieResponse) {
      res.status(404).json({ message: "No Movie Found" });
      return;
    }
    res.status(200).json(movieResponse);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//Create New Movie along with New Actor
export const addMovieActor = async (req: Request, res: Response) => {
  try {
    const movieactordata: MovieActorRequest = req.body;
    const createdData = await MovieService.addMovieActor(movieactordata);
    res.status(200).json({ message: "Created", data: createdData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//get Movie with Actor
export const getAllMovieActor = async (req: Request, res: Response) => {
  try {
    const movieactordata: ActorMovieResponse[] = await MovieService.getActorMovieList();
    res.status(200).json(movieactordata);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//update Movie and Actor
export const updateMovieActor = async (req: Request, res: Response) => {
  try {
    const movieid: MovieId = parseInt(req.params.movieid);
    const actorid: ActorId = parseInt(req.params.actorid);
    const movieactorRequest: MovieActorRequest = req.body;
    const updateddata = await MovieService.updateMovieActor(movieactorRequest, movieid, actorid);
    res.status(200).json(updateddata);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// update(link) movie and Actor
export const linkActorMovie = async (req: Request, res: Response) => {
  try {
    const paramsMovieId: MovieId = parseInt(req.params.movieid);
    const paramsActorId: MovieId = parseInt(req.params.actorid);
    const linkResponse: Movie = await MovieService.linkActorToMovie(paramsActorId, paramsMovieId);
    console.log("in controller", linkResponse);
    if (!linkResponse) {
      console.log("nor");
    }
    res.status(200).json(linkResponse);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
