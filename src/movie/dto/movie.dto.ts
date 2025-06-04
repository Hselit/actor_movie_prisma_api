import { Actor, ActorResponse } from "../../actor/dto/actor.dto";

export type Movie = {
  id: number;
  movieName: string;
  dateOfRelease: Date;
  rating: number;
};

export type MovieActorRequest = {
  actor: Actor;
  movie: Omit<Movie, "id">;
};

export type MovieResquest = Omit<Movie, "id">;

export type SingleMovieResponse = Movie | null;

export type MovieActorResponse = {
  movie: Movie;
  actor?: Actor;
};

export type ActorMovieResponse = {
  id: number;
  movieName: string;
  dateOfRelease: Date;
  rating: number;
  actors: {
    movieId: number;
    actorId: number;
    actor: ActorResponse;
  }[];
};

export type MovieId = number;
