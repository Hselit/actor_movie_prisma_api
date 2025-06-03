import express from "express";
import {
  AddActor,
  deleteActor,
  getActorList,
  getSingleActor,
  updateActor,
} from "../controllers/actorController";
const router = express.Router();

router.get("/get", getActorList);
router.get("/get/:id", getSingleActor);
router.put("/update/:id", updateActor);
router.post("/add", AddActor);
router.delete("/delete/:id", deleteActor);

export default router;
