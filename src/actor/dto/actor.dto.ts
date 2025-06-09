export type Actor = {
  id?: number;
  name: string;
  age: number;
  totalMovies: number;
};

export type SingleActorResponse = Required<Actor>;

export type ActorResponse = Partial<Actor>;

export type ActorId = number;

export type GetActorResponse = Actor[] | { message: string };

export type GetSingleActorResponse = Actor | { message: string } | null;

export type UpdateActorRequest = Omit<Partial<Actor>, "id">;
