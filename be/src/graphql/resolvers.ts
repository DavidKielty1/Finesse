import { GqlResolvers, GqlTimeframe } from "../generated/graphql";
import { DateResolver, BigIntResolver, JSONResolver } from "graphql-scalars";
const { Client } = require("@apperate/iexjs");
import dotenv from "dotenv";
dotenv.config();

const marketCap = 2390000000000;

const client = new Client({
  api_token: process.env.IEX_API_TOKEN,
  version: "v1",
});

const getQuote = (symbol: string) => {
  return client.quote({ symbol });
};

const resolvers: GqlResolvers = {
  JSON: JSONResolver,
  Date: DateResolver,
  BigInt: BigIntResolver,

  Query: {
    lookup: async (_: any, { symbol }: { symbol: string }) => {
      const quote = await getQuote(symbol);
      return {
        symbol,
        companyName: quote.companyName,
        logoUrl: "some-logo.png",
      };
    },
  },

  // Mutation: {
  //   quote: (_: any, { symbol }: { symbol: string }) => {
  //     return getQuote(symbol);
  //   },
  // },

  Lookup: {
    quote: async ({ symbol }: { symbol: string }) => {
      const quote = await getQuote(symbol);
      return {
        ...quote,
        peRatioTTM: quote.peRatio,
      };
    },

    revenue: async (lookup, { resolution }) => {
      const result = await client.timeSeries({
        id: "INCOME",
        key: lookup.symbol,
        limit: 100,
        range: "5y",
        subkey: resolution,
      });
      return result.map((point: { fiscalDate: any; totalRevenue: any }) => ({
        date: point.fiscalDate,
        value: point.totalRevenue,
      }));
    },

    historicalTotalReturn: async (_, { timeframe }) => {
      return {
        changePercent: 997,
        data: [
          {
            date: new Date("2020-01-01"),
            value: 100,
          },
          {
            date: new Date("2020-01-02"),
            value: 101,
          },
        ],
      };
    },

    snapshot: async (_, { timeframe }) => {
      switch (timeframe) {
        case GqlTimeframe.Today:
        case GqlTimeframe.Ytd:
        case GqlTimeframe.Year1:
          return {
            changePercent: 0.25,
          };
        case GqlTimeframe.Year5:
        case GqlTimeframe.Year10:
        case GqlTimeframe.Max:
          return {
            changePercent: 250,
            cagrPercent: 30,
          };
      }
    },

    stats: async ({ symbol }) => {
      return {
        marketCap: BigInt(marketCap),
        peRatioTtm: 25.6,
        peRatioFwd: 23.1,
        profitMarginPercent: 25,
        freeCashFlowYield: 4.06,
        dividendYield: 0.6,
      };

      // const stats = await client.stats({ symbol });
      // return {
      //   ...stats,
      //   peRatioFWD: stats.forwardPERatio,
      // };
    },
  },
};

export default resolvers;
