import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type Actor = {
  id: number;
  name: string;
  age: number;
  totalMovies: number;
};

type UpdateActor = Actor | null;

function updateCreatActor(data: Actor[]) {
  try {
    if (data.length > 0) {
      data.forEach(async (actorDataa) => {
        const isUserPresent: UpdateActor = await prisma.actor.findUnique({
          where: { id: actorDataa.id },
        });
        if (isUserPresent) {
          prisma.actor.update({ where: { id: actorDataa.id }, data: actorDataa });
        } else {
          prisma.actor.create({ data: actorDataa });
        }
      });
    } else {
      console.log("Empty Array");
    }
  } catch (err) {
    console.error(err);
  }
}

const actor: Actor[] = [
  { id: 1, name: "kumar", age: 21, totalMovies: 20 },
  { id: 2, name: "ram", age: 32, totalMovies: 30 },
  { id: 3, name: "karan", age: 41, totalMovies: 40 },
];

updateCreatActor(actor);

// model Actor{
//   id           Int     @id @default(autoincrement())
//   name         String  @db.VarChar(255)
//   age          Int
//   totalMovies  Int     @default(0)
// }
