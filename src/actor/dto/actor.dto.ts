export type Actor = {
  id: number;
  name: string;
  age: number;
  totalMovies: number;
};

export type methodType = "body" | "params" | "query";

export type CreateActorRequest = Omit<Actor, "id">;

export type SingleActorResponse = Required<Actor>;

export type ActorResponse = Partial<Actor>;

export type ActorId = number;

export type GetActorResponse = Actor[];

export type GetSingleActorResponse = Actor | { message: string } | null;

export type UpdateActorRequest = Omit<Partial<Actor>, "id">;
