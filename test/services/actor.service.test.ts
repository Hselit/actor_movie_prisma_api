import { SingleActorResponse } from "./../../src/actor/dto/actor.dto";
import { mockPrisma } from "../setup/prisma.mock";
import ActorService from "../../src/actor/services/actorService";

jest.mock("../../src/utils/prisma", () => ({
  __esModule: true,
  default: mockPrisma,
}));

describe("Actor Service", () => {
  it("it return list of actor", async () => {
    const data: SingleActorResponse = {
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
});
