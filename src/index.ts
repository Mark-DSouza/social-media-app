import { PostResolver } from "./resolvers/posts";
import { HelloResolver } from "./resolvers/hello";
import { DataSource } from "typeorm";
import { Post } from "./entity/Post";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import "reflect-metadata";

const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "social_media_app",
  synchronize: true,
  logging: true,
  entities: [Post],
});

const main = async () => {
  await AppDataSource.initialize();
  const app = express();
  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver],
      validate: false,
    }),
  });
  server.applyMiddleware({ app });
  app.listen(4000, () => console.log("server started on localhost:4000"));
};

main().catch((err) => {
  console.error(`error: ${err}`);
});
