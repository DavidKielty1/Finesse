import {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
} from "graphql";
import { Lookup } from "../graphql/types";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: NonNullable<T[P]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  BigInt: { input: any; output: any };
  Date: { input: any; output: any };
  JSON: { input: any; output: any };
};

export type GqlDataPoint = {
  __typename?: "DataPoint";
  date: Scalars["Date"]["output"];
  value: Scalars["BigInt"]["output"];
};

export type GqlLookup = {
  __typename?: "Lookup";
  companyName: Scalars["String"]["output"];
  historicalTotalReturn: GqlTotalReturnResult;
  logoUrl?: Maybe<Scalars["String"]["output"]>;
  quote: GqlQuoteResult;
  revenue: Array<GqlDataPoint>;
  snapshot: GqlSnapshotResult;
  stats: GqlStatsResult;
  symbol: Scalars["String"]["output"];
};

export type GqlLookupHistoricalTotalReturnArgs = {
  timeframe: GqlTimeframe;
};

export type GqlLookupRevenueArgs = {
  resolution: GqlResolution;
};

export type GqlLookupSnapshotArgs = {
  timeframe: GqlTimeframe;
};

export type GqlQuery = {
  __typename?: "Query";
  lookup: GqlLookup;
};

export type GqlQueryLookupArgs = {
  symbol: Scalars["String"]["input"];
};

export type GqlQuoteResult = {
  __typename?: "QuoteResult";
  change: Scalars["Float"]["output"];
  changePercent: Scalars["Float"]["output"];
  companyName: Scalars["String"]["output"];
  delayedPrice?: Maybe<Scalars["Float"]["output"]>;
  latestPrice: Scalars["Float"]["output"];
  marketCap: Scalars["BigInt"]["output"];
  peRatioTTM: Scalars["Float"]["output"];
  previousClose: Scalars["Float"]["output"];
};

export enum GqlResolution {
  Annual = "annual",
  Quarterly = "quarterly",
}

export type GqlSnapshotResult = {
  __typename?: "SnapshotResult";
  cagrPercent?: Maybe<Scalars["Float"]["output"]>;
  changePercent: Scalars["Float"]["output"];
};

export type GqlStatsResult = {
  __typename?: "StatsResult";
  dividendYield?: Maybe<Scalars["Float"]["output"]>;
  freeCashFlowYield: Scalars["Float"]["output"];
  marketCap: Scalars["BigInt"]["output"];
  peRatioFwd: Scalars["Float"]["output"];
  peRatioTtm: Scalars["Float"]["output"];
  profitMarginPercent: Scalars["Float"]["output"];
};

export enum GqlTimeframe {
  Max = "max",
  Today = "today",
  Year1 = "year1",
  Year5 = "year5",
  Year10 = "year10",
  Ytd = "ytd",
}

export type GqlTotalReturnResult = {
  __typename?: "TotalReturnResult";
  changePercent: Scalars["Float"]["output"];
  data: Array<GqlDataPoint>;
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type GqlResolversTypes = ResolversObject<{
  BigInt: ResolverTypeWrapper<Scalars["BigInt"]["output"]>;
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]["output"]>;
  DataPoint: ResolverTypeWrapper<GqlDataPoint>;
  Date: ResolverTypeWrapper<Scalars["Date"]["output"]>;
  Float: ResolverTypeWrapper<Scalars["Float"]["output"]>;
  JSON: ResolverTypeWrapper<Scalars["JSON"]["output"]>;
  Lookup: ResolverTypeWrapper<Lookup>;
  Query: ResolverTypeWrapper<{}>;
  QuoteResult: ResolverTypeWrapper<GqlQuoteResult>;
  Resolution: GqlResolution;
  SnapshotResult: ResolverTypeWrapper<GqlSnapshotResult>;
  StatsResult: ResolverTypeWrapper<GqlStatsResult>;
  String: ResolverTypeWrapper<Scalars["String"]["output"]>;
  Timeframe: GqlTimeframe;
  TotalReturnResult: ResolverTypeWrapper<GqlTotalReturnResult>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type GqlResolversParentTypes = ResolversObject<{
  BigInt: Scalars["BigInt"]["output"];
  Boolean: Scalars["Boolean"]["output"];
  DataPoint: GqlDataPoint;
  Date: Scalars["Date"]["output"];
  Float: Scalars["Float"]["output"];
  JSON: Scalars["JSON"]["output"];
  Lookup: Lookup;
  Query: {};
  QuoteResult: GqlQuoteResult;
  SnapshotResult: GqlSnapshotResult;
  StatsResult: GqlStatsResult;
  String: Scalars["String"]["output"];
  TotalReturnResult: GqlTotalReturnResult;
}>;

export interface GqlBigIntScalarConfig
  extends GraphQLScalarTypeConfig<GqlResolversTypes["BigInt"], any> {
  name: "BigInt";
}

export type GqlDataPointResolvers<
  ContextType = any,
  ParentType extends GqlResolversParentTypes["DataPoint"] = GqlResolversParentTypes["DataPoint"]
> = ResolversObject<{
  date?: Resolver<GqlResolversTypes["Date"], ParentType, ContextType>;
  value?: Resolver<GqlResolversTypes["BigInt"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface GqlDateScalarConfig
  extends GraphQLScalarTypeConfig<GqlResolversTypes["Date"], any> {
  name: "Date";
}

export interface GqlJsonScalarConfig
  extends GraphQLScalarTypeConfig<GqlResolversTypes["JSON"], any> {
  name: "JSON";
}

export type GqlLookupResolvers<
  ContextType = any,
  ParentType extends GqlResolversParentTypes["Lookup"] = GqlResolversParentTypes["Lookup"]
> = ResolversObject<{
  companyName?: Resolver<GqlResolversTypes["String"], ParentType, ContextType>;
  historicalTotalReturn?: Resolver<
    GqlResolversTypes["TotalReturnResult"],
    ParentType,
    ContextType,
    RequireFields<GqlLookupHistoricalTotalReturnArgs, "timeframe">
  >;
  logoUrl?: Resolver<
    Maybe<GqlResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  quote?: Resolver<GqlResolversTypes["QuoteResult"], ParentType, ContextType>;
  revenue?: Resolver<
    Array<GqlResolversTypes["DataPoint"]>,
    ParentType,
    ContextType,
    RequireFields<GqlLookupRevenueArgs, "resolution">
  >;
  snapshot?: Resolver<
    GqlResolversTypes["SnapshotResult"],
    ParentType,
    ContextType,
    RequireFields<GqlLookupSnapshotArgs, "timeframe">
  >;
  stats?: Resolver<GqlResolversTypes["StatsResult"], ParentType, ContextType>;
  symbol?: Resolver<GqlResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GqlQueryResolvers<
  ContextType = any,
  ParentType extends GqlResolversParentTypes["Query"] = GqlResolversParentTypes["Query"]
> = ResolversObject<{
  lookup?: Resolver<
    GqlResolversTypes["Lookup"],
    ParentType,
    ContextType,
    RequireFields<GqlQueryLookupArgs, "symbol">
  >;
}>;

export type GqlQuoteResultResolvers<
  ContextType = any,
  ParentType extends GqlResolversParentTypes["QuoteResult"] = GqlResolversParentTypes["QuoteResult"]
> = ResolversObject<{
  change?: Resolver<GqlResolversTypes["Float"], ParentType, ContextType>;
  changePercent?: Resolver<GqlResolversTypes["Float"], ParentType, ContextType>;
  companyName?: Resolver<GqlResolversTypes["String"], ParentType, ContextType>;
  delayedPrice?: Resolver<
    Maybe<GqlResolversTypes["Float"]>,
    ParentType,
    ContextType
  >;
  latestPrice?: Resolver<GqlResolversTypes["Float"], ParentType, ContextType>;
  marketCap?: Resolver<GqlResolversTypes["BigInt"], ParentType, ContextType>;
  peRatioTTM?: Resolver<GqlResolversTypes["Float"], ParentType, ContextType>;
  previousClose?: Resolver<GqlResolversTypes["Float"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GqlSnapshotResultResolvers<
  ContextType = any,
  ParentType extends GqlResolversParentTypes["SnapshotResult"] = GqlResolversParentTypes["SnapshotResult"]
> = ResolversObject<{
  cagrPercent?: Resolver<
    Maybe<GqlResolversTypes["Float"]>,
    ParentType,
    ContextType
  >;
  changePercent?: Resolver<GqlResolversTypes["Float"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GqlStatsResultResolvers<
  ContextType = any,
  ParentType extends GqlResolversParentTypes["StatsResult"] = GqlResolversParentTypes["StatsResult"]
> = ResolversObject<{
  dividendYield?: Resolver<
    Maybe<GqlResolversTypes["Float"]>,
    ParentType,
    ContextType
  >;
  freeCashFlowYield?: Resolver<
    GqlResolversTypes["Float"],
    ParentType,
    ContextType
  >;
  marketCap?: Resolver<GqlResolversTypes["BigInt"], ParentType, ContextType>;
  peRatioFwd?: Resolver<GqlResolversTypes["Float"], ParentType, ContextType>;
  peRatioTtm?: Resolver<GqlResolversTypes["Float"], ParentType, ContextType>;
  profitMarginPercent?: Resolver<
    GqlResolversTypes["Float"],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GqlTotalReturnResultResolvers<
  ContextType = any,
  ParentType extends GqlResolversParentTypes["TotalReturnResult"] = GqlResolversParentTypes["TotalReturnResult"]
> = ResolversObject<{
  changePercent?: Resolver<GqlResolversTypes["Float"], ParentType, ContextType>;
  data?: Resolver<
    Array<GqlResolversTypes["DataPoint"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GqlResolvers<ContextType = any> = ResolversObject<{
  BigInt?: GraphQLScalarType;
  DataPoint?: GqlDataPointResolvers<ContextType>;
  Date?: GraphQLScalarType;
  JSON?: GraphQLScalarType;
  Lookup?: GqlLookupResolvers<ContextType>;
  Query?: GqlQueryResolvers<ContextType>;
  QuoteResult?: GqlQuoteResultResolvers<ContextType>;
  SnapshotResult?: GqlSnapshotResultResolvers<ContextType>;
  StatsResult?: GqlStatsResultResolvers<ContextType>;
  TotalReturnResult?: GqlTotalReturnResultResolvers<ContextType>;
}>;
