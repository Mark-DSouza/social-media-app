import { DataSource } from "typeorm";
import {Post} from './entity/Post';

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
};

main().catch((err) => {
  console.error(`error: ${err}`);
});
