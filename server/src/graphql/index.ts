import { ApolloServerExpressConfig } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import resolvers from "./resolvers";

const getApolloConfig = async (): Promise<ApolloServerExpressConfig> => ({
  schema: await buildSchema({ resolvers }),
  // context: async ({ req, connection, payload }: any) => ({
  //   isAuth: !!connection ? payload.authToken : req.isAuth
  // })
  context: ({ req, res }) => ({ req, res })
});

export { getApolloConfig };
