import { PostResolver } from "./resolvers/posts";
import { RegisterResolver } from "./resolvers/user";
import { HelloResolver } from "./resolvers/hello";
import { DataSource } from "typeorm";
import { Post } from "./entity/Post";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import "reflect-metadata";
import { User } from "./entity/User";
import { MyContext } from "./types";
import session from "express-session";
import connectRedis from "connect-redis";
import { __prod__ } from "./constants";

const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "social_media_app",
  synchronize: true,
  logging: true,
  entities: [Post, User],
});

const main = async () => {
  await AppDataSource.initialize();
  const app = express();

  const RedisStore = connectRedis(session);
  const { createClient } = require("redis");
  const redisClient = createClient({ legacyMode: true });
  redisClient.connect().catch(console.error);

  app.use(
    session({
      name: "qid",
      store: new RedisStore({
        client: redisClient,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
        httpOnly: true,
        sameSite: "lax", // csrf
        secure: __prod__, // cookie only works in https
      },
      saveUninitialized: false,
      secret: "qowiueojwojfalksdjoqiwueo",
      resave: false,
    })
  );

  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver, RegisterResolver],
      validate: false,
    }),
    context: ({ req, res }): MyContext => ({ req, res }),
  });
  server.applyMiddleware({ app });
  app.listen(4000, () => console.log("server started on localhost:4000"));
};

main().catch((err) => {
  console.error(`error: ${err}`);
});
