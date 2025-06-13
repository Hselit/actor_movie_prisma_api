import express from "express";
import {
  AddActor,
  deleteActor,
  getActorList,
  getSingleActor,
  updateActor,
} from "../controllers/actorController";
import { validate } from "../middlewares/actorValidation";
import { actorIdParamSchema, createActorSchema } from "../schema/actor.schema";
const router = express.Router();

router.get("/get", getActorList);
router.get("/get/:id", validate(actorIdParamSchema, "params"), getSingleActor);
router.put("/update/:id", validate(actorIdParamSchema, "params"), updateActor);
router.post("/add", validate(createActorSchema, "body"), AddActor);
router.delete("/delete/:id", validate(actorIdParamSchema, "params"), deleteActor);

export default router;
