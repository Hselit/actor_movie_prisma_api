import {
  Actor,
  ActorId,
  GetActorResponse,
  GetSingleActorResponse,
  UpdateActorRequest,
} from "../dto/actor.dto";
import { Request, Response } from "express";
import ActorService from "../services/actorService";

export const getActorList = async (req: Request, res: Response): Promise<void> => {
  try {
    const actorlist: GetActorResponse = await ActorService.getActorList();
    res.status(200).json(actorlist);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error Occured" } as GetActorResponse);
  }
};

export const getSingleActor = async (req: Request, res: Response): Promise<void> => {
  try {
    const id: ActorId = Number(req.params.id);
    const actordata: GetSingleActorResponse = await ActorService.getActor(id);
    if (!actordata) {
      res.status(404).json({ message: "No Actor Found with this Id" });
      return;
    }
    res.status(200).json(actordata);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error Occured" });
  }
};

export const updateActor = async (req: Request, res: Response): Promise<void> => {
  try {
    const id: ActorId = parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ message: "Invalid Id" });
      return;
    }
    const actor = await ActorService.getActor(id);
    if (!actor) {
      res.status(404).json({ message: "Actor Not Found" });
      return;
    }
    const actorData: UpdateActorRequest = req.body;
    const updateresult = await ActorService.updateActor(id, actorData);
    res.status(200).json(updateresult);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: " Internal Server Error" });
  }
};

export const deleteActor = async (req: Request, res: Response) => {
  try {
    const actorId: ActorId = parseInt(req.params.id);
    if (isNaN(actorId)) {
      res.status(400).json({ message: "Invalid Id" });
      return;
    }
    const actor = await ActorService.getActor(actorId);
    if (!actor) {
      res.status(404).json({ message: "Actor Not Found" });
      return;
    }
    const deletedActor = await ActorService.deleteActor(actorId);
    console.log(deletedActor);
    res.status(200).json({ message: "Actor Deleted " });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const AddActor = async (req: Request, res: Response) => {
  try {
    const actordata: Actor = req.body;
    const createdActor = await ActorService.createActor(actordata);
    console.log(createdActor);
    res.status(200).json({ message: "Actor Created Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
