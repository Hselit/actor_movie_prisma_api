import prisma from "../../utils/prisma";
import { Actor, ActorId, UpdateActorRequest } from "../dto/actor.dto";

export default class ActorService {
  static async getActorList() {
    try {
      const list: Actor[] = await prisma.actor.findMany();
      console.log(list);
      return list;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async getActor(id: ActorId) {
    try {
      return await prisma.actor.findUnique({ where: { id } });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async updateActor(id: ActorId, updatedata: UpdateActorRequest) {
    try {
      return await prisma.actor.update({ data: updatedata, where: { id: id } });
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  static async deleteActor(actorid: ActorId) {
    try {
      return await prisma.actor.delete({ where: { id: actorid } });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async createActor(actordata: Actor) {
    try {
      return await prisma.actor.create({ data: actordata });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
