import { ActorId } from "../../actor/dto/actor.dto";
import prisma from "../../utils/prisma";
import {
  ActorMovieResponse,
  Movie,
  MovieActorRequest,
  MovieId,
  MovieResquest,
  SingleMovieResponse,
} from "../dto/movie.dto";

export default class MovieService {
  //Delete Movie and link of the Actor with Movie(Actor alone present)
  static async deleteMovieActor(movieid: MovieId) {
    try {
      return await prisma.movie.delete({
        where: { id: movieid },
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  // Create New Movie
  static async createMovie(moviedata: MovieResquest) {
    try {
      return await prisma.movie.create({ data: moviedata });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  // Update Movie
  static async updateMovie(moviedata: MovieResquest, movieid: MovieId) {
    try {
      const movieData: SingleMovieResponse = await prisma.movie.findUnique({
        where: { id: movieid },
      });
      if (!movieData) {
        return null;
      } else {
        return await prisma.movie.update({ data: moviedata, where: { id: movieid } });
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  // Get Movie List
  static async getMovieList() {
    try {
      const movieList: Movie[] = await prisma.movie.findMany();
      return movieList;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  // Get Movie By Id
  static async getMovieById(movieid: MovieId) {
    try {
      const movieData: SingleMovieResponse = await prisma.movie.findUnique({
        where: { id: movieid },
      });
      return movieData;
    } catch (error) {
      throw error;
    }
  }

  //association

  // Add New Movie and New Actor
  static async addMovieActor(data: MovieActorRequest) {
    try {
      const { movie, actor } = data;
      return await prisma.movie.create({
        data: {
          movieName: movie.movieName,
          dateOfRelease: movie.dateOfRelease,
          rating: movie.rating,
          actors: {
            create: [
              {
                actor: {
                  create: {
                    name: actor.name,
                    age: actor.age,
                    totalMovies: actor.totalMovies,
                  },
                },
              },
            ],
          },
        },
        include: {
          actors: {
            include: {
              actor: true,
            },
          },
        },
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  // Get All Movies along with Actors
  static async getActorMovieList() {
    try {
      const malist: ActorMovieResponse[] = await prisma.movie.findMany({
        include: {
          actors: {
            include: {
              actor: true,
            },
          },
        },
      });
      return malist;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  // Update Movie and the Linked Actor
  static async updateMovieActor(
    movieactordata: MovieActorRequest,
    movieid: MovieId,
    actorid: ActorId
  ) {
    try {
      const { actor, movie } = movieactordata;
      const linkedActor = await prisma.movieActor.findFirst({
        where: { movieId: movieid, actorId: actorid },
      });
      if (!linkedActor) {
        throw new Error("Actor Not Linked to Movie");
      }
      return await prisma.$transaction([
        prisma.movie.update({ data: movie, where: { id: movieid } }),
        prisma.actor.update({ data: actor, where: { id: actorid } }),
      ]);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async linkActorToMovie(actorid: ActorId, movieid: MovieId) {
    try {
      const [movie, actor] = await Promise.all([
        prisma.movie.findUnique({ where: { id: movieid } }),
        prisma.actor.findUnique({ where: { id: actorid } }),
      ]);
      console.log(movie, actor);
      if (!movie) {
        throw new Error("No Movie Exist with the Id");
      }
      if (!actor) {
        throw new Error("No Actor Exist with the Id");
      }
      const checklinked = await prisma.movieActor.findFirst({
        where: { movieId: movieid, actorId: actorid },
      });
      if (checklinked) {
        throw new Error("Actor and Movie are already Linked");
      }

      // this can also be used to create a connection
      // await prisma.movieActor.create({
      //   data: {
      //     movie: { connect: { id: movieid } },
      //     actor: { connect: { id: actorid } },
      //   },
      // });

      return await prisma.movie.update({
        where: { id: movieid },
        data: {
          actors: {
            create: [
              {
                actor: {
                  connect: {
                    id: actorid,
                  },
                },
              },
            ],
          },
        },
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
