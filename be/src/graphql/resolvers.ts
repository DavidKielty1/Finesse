import GraphQLJSON from "graphql-type-json";
import { Resolvers } from "../generated/graphql";
const { Client } = require("@apperate/iexjs");

const client = new Client({
  api_token: process.env.IEX_API_TOKEN,
  version: "v1",
});

const getQuote = (symbol: string) => {
  return client.quote({ symbol: "AAPL" });
};

const resolvers: Resolvers = {
  JSON: GraphQLJSON,

  Query: {
    hello: () => "world",
  },

  Mutation: {
    quote: (_: any, { symbol }) => {
      return getQuote(symbol);
    },
  },
};

export default resolvers;
