import { ZodSchema } from "zod";
import { methodType } from "../dto/actor.dto";
import { NextFunction, Request, Response } from "express";

export const validate = (schema: ZodSchema, type: methodType): any => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req[type]);
    if (!result.success) {
      return res.status(400).json({ message: "Validation Error", result });
    }
    req[type] = result.data;
    next();
  };
};
