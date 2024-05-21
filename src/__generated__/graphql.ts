/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
};

export type CreatePriceInput = {
  max: Scalars['Float']['input'];
  med: Scalars['Float']['input'];
  min: Scalars['Float']['input'];
  productId: Scalars['Float']['input'];
};

export type CreateProductInfoInput = {
  imageUrl: Scalars['String']['input'];
  price: Scalars['Float']['input'];
  productId: Scalars['Float']['input'];
  rating: Scalars['Float']['input'];
  scrapedFromUrl: Scalars['String']['input'];
  seller: Scalars['String']['input'];
  sellerUrl: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type CreateProductInput = {
  imageUrl: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createPrice: Price;
  createProduct: Product;
  createProductInfo: ProductInfo;
};


export type MutationCreatePriceArgs = {
  data: CreatePriceInput;
};


export type MutationCreateProductArgs = {
  data: CreateProductInput;
};


export type MutationCreateProductInfoArgs = {
  data: CreateProductInfoInput;
};

export type Price = {
  __typename?: 'Price';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Float']['output'];
  max: Scalars['Float']['output'];
  med: Scalars['Float']['output'];
  min: Scalars['Float']['output'];
};

export type Product = {
  __typename?: 'Product';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Float']['output'];
  imageUrl: Scalars['String']['output'];
  prices: Array<Price>;
  productInfo: Array<ProductInfo>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type ProductInfo = {
  __typename?: 'ProductInfo';
  id: Scalars['Float']['output'];
  imageUrl: Scalars['String']['output'];
  price: Scalars['Float']['output'];
  rating: Scalars['Float']['output'];
  scrapedFromUrl: Scalars['String']['output'];
  seller: Scalars['String']['output'];
  sellerUrl: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  product?: Maybe<Product>;
  products: Array<Product>;
};


export type QueryProductArgs = {
  id: Scalars['Float']['input'];
};

export type GetProductDetailsQueryVariables = Exact<{
  id: Scalars['Float']['input'];
}>;


export type GetProductDetailsQuery = { __typename?: 'Query', product?: { __typename?: 'Product', id: number, title: string, imageUrl: string, prices: Array<{ __typename?: 'Price', id: number, min: number, med: number, max: number, createdAt: any }>, productInfo: Array<{ __typename?: 'ProductInfo', id: number, imageUrl: string, price: number, rating: number, scrapedFromUrl: string, seller: string, sellerUrl: string, title: string }> } | null };

export type GetProductsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProductsQuery = { __typename?: 'Query', products: Array<{ __typename?: 'Product', id: number, title: string, imageUrl: string }> };


export const GetProductDetailsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetProductDetails"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"product"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"prices"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"min"}},{"kind":"Field","name":{"kind":"Name","value":"med"}},{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"productInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"scrapedFromUrl"}},{"kind":"Field","name":{"kind":"Name","value":"seller"}},{"kind":"Field","name":{"kind":"Name","value":"sellerUrl"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]}}]} as unknown as DocumentNode<GetProductDetailsQuery, GetProductDetailsQueryVariables>;
export const GetProductsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetProducts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"products"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}}]}}]}}]} as unknown as DocumentNode<GetProductsQuery, GetProductsQueryVariables>;