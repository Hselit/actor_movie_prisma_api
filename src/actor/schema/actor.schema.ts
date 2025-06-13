import { z } from "zod";

const actorSchema = z.object({
  name: z.string().min(3, "Name must be atleast 3 character long"),
  age: z.number().min(10, "Age must be greater than 10"),
  totalMovies: z.number().nonnegative("Total movies must be a non-negative number"),
});

export const createActorSchema = actorSchema;

export const updateActorSchema = z.object({
  name: z.string().min(3).optional(),
  age: z.number().min(10).optional(),
  totalMovies: z.number().nonnegative().optional(),
});

export const actorIdParamSchema = z.object({
  id: z.number().int(),
});
