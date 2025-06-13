import { Actor, GetActorResponse, SingleActorResponse } from "./../../src/actor/dto/actor.dto";
import { mockPrisma } from "../setup/prisma.mock";
import ActorService from "../../src/actor/services/actorService";

jest.mock("../../src/utils/prisma", () => ({
  __esModule: true,
  default: mockPrisma,
}));

describe("Actor Service", () => {
  describe("Add Actor", () => {
    it("Add New Actor", async () => {
      const returndata: Actor = {
        id: 1,
        name: "Scarlett Johansson",
        age: 40,
        totalMovies: 70,
      };
      const data = {
        name: "Scarlett Johansson",
        age: 40,
        totalMovies: 70,
      };
      mockPrisma.actor.create.mockResolvedValue(returndata);
      const resultdata = await ActorService.createActor(data);
      console.log(resultdata);
      expect(resultdata).toEqual(returndata);
      expect(mockPrisma.actor.create).toHaveBeenCalledWith({ data: data });
    });
  });

  it("return of actor details", async () => {
    const data: Actor = {
      id: 4,
      name: "Scarlett Johansson",
      age: 40,
      totalMovies: 70,
    };
    mockPrisma.actor.findUnique.mockResolvedValue(data);
    const actor = await ActorService.getActor(4);

    expect(actor).toEqual(data);
    expect(mockPrisma.actor.findUnique).toHaveBeenCalledWith({ where: { id: 4 } });
  });

  it("return all actor list", async () => {
    const actorList: Actor[] = [
      {
        id: 1,
        name: "Robert Downey Jr.",
        age: 58,
        totalMovies: 85,
      },
      {
        id: 3,
        name: "Chris Evan",
        age: 45,
        totalMovies: 45,
      },
      {
        id: 4,
        name: "Scarlett Johansson",
        age: 40,
        totalMovies: 70,
      },
      {
        id: 5,
        name: "Leonardo DiCaprio",
        age: 50,
        totalMovies: 124,
      },
      {
        id: 11,
        name: "Ana de Armas",
        age: 37,
        totalMovies: 27,
      },
      {
        id: 12,
        name: "Russell Crowe",
        age: 60,
        totalMovies: 45,
      },
    ];
    mockPrisma.actor.findMany.mockResolvedValue(actorList);
    const actorData = await ActorService.getActorList();
    expect(actorData).toEqual(actorList);
  });

  it("update an actor", async () => {
    const data: Actor = {
      id: 4,
      name: "Scarlett Johansson",
      age: 45,
      totalMovies: 70,
    };

    mockPrisma.actor.update.mockResolvedValue(data);
    const updatedData: Actor = await ActorService.updateActor(4, { age: 45 });
    expect(data).toEqual(updatedData);
    expect(mockPrisma.actor.update).toHaveBeenCalledWith({
      where: { id: 4 },
      data: { age: 45 },
    });
  });

  it("Delete an Actor", async () => {
    const data: Actor = {
      id: 4,
      name: "Scarlett Johansson",
      age: 40,
      totalMovies: 70,
    };
    mockPrisma.actor.delete.mockResolvedValue(data);
    const deletedData = await ActorService.deleteActor(4);
    expect(data).toEqual(deletedData);
    expect(mockPrisma.actor.delete).toHaveBeenCalledWith({ where: { id: 4 } });
  });
});
