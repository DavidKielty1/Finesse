require("dotenv").config();
import { ApolloServer } from "@apollo/server";
const { Client } = require("@apperate/iexjs");
import { startStandaloneServer } from "@apollo/server/standalone";
import GraphQLJSON, { GraphQLJSONObject } from "graphql-type-json";
import { gql } from "graphql-tag";

const typeDefs = gql`
  scalar JSON

  type Query {
    hello: String!
  }

  type Mutation {
    quote(symbol: String!): QuoteResult!
  }

  type QuoteResult {
    delayedPrice: Float
    previousClose: Float!
    change: Float!
    changePercent: Float!
    companyName: String!
    peRatio: Float!
    symbol: String!
  }
`;

const client = new Client({
  api_token: process.env.IEX_API_TOKEN,
  version: "v1",
});

const getQuote = (symbol: string) => {
  return client.quote({ symbol: "AAPL" });
};

const resolvers = {
  JSON: GraphQLJSON,

  Query: {
    hello: () => "world",
  },

  Mutation: {
    quote: (_: any, { symbol }: { symbol: string }) => {
      return getQuote(symbol);
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startServer = async () => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`🚀  Server ready at: ${url}`);
};

startServer();
