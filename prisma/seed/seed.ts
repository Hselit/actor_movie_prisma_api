import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create Actors
  const actor1 = await prisma.actor.create({
    data: {
      name: "Robert Downey Jr.",
      age: 58,
      totalMovies: 85,
    },
  });

  const actor2 = await prisma.actor.create({
    data: {
      name: "Scarlett Johansson",
      age: 39,
      totalMovies: 70,
    },
  });

  const actor3 = await prisma.actor.create({
    data: {
      name: "Chris Evans",
      age: 43,
      totalMovies: 60,
    },
  });

  // Create Movies
  const movie1 = await prisma.movie.create({
    data: {
      movieName: "Avengers: Endgame",
      dateOfRelease: new Date("2019-04-26"),
      rating: 8.4,
    },
  });

  const movie2 = await prisma.movie.create({
    data: {
      movieName: "Iron Man",
      dateOfRelease: new Date("2008-05-02"),
      rating: 7.9,
    },
  });

  // Join actors and movies (MovieActor entries)
  await prisma.movieActor.createMany({
    data: [
      { movieId: movie1.id, actorId: actor1.id },
      { movieId: movie1.id, actorId: actor2.id },
      { movieId: movie1.id, actorId: actor3.id },
      { movieId: movie2.id, actorId: actor1.id },
    ],
  });
}

main()
  .then(() => {
    console.log("🌱 Seed complete.");
    return prisma.$disconnect();
  })
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    return prisma.$disconnect().finally(() => process.exit(1));
  });
