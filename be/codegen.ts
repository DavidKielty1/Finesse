import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "src/graphql/schema.graphql",
  generates: {
    "./src/generated/graphql": {
      config: {
        useIndexSignature: true,
        typesPrefix: "Gql",
        mappers: {
          Lookup: "../graphql/types.ts#Lookup",
        },
      },
      plugins: ["typescript", "typescript-resolvers"],
    },
  },
};
export default config;
