import { ApolloServer } from "apollo-server";
import pkg from "@prisma/client";
import resolvers from "./resolvers/index.js";
import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";
import { getUserId } from "./utils/utils.js";

const { PrismaClient } = pkg;
const prisma = new PrismaClient();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf8"),
  resolvers,
  context: ({ req }) => {
    return {
      ...req,
      prisma,
      userId: req && req.headers.authorization ? getUserId(req) : null,
    };
  },
});

server.listen().then(({ url }) => {
  console.log(`Server running on port ${url}`);
});
