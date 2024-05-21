"use client";

import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import createApolloClient from '../app/apollo-client';
import { gql } from '../__generated__';
import Link from 'next/link';

const client = createApolloClient();

const GET_PRODUCTS = gql(/* GraphQL */`
  query GetProducts {
    products {
      id
      title
      imageUrl
    }
  }
`);

const ProductList: React.FC = () => {
  const [search, setSearch] = useState('');
  const { loading, error, data } = useQuery(GET_PRODUCTS, {
    client,
  });

  if (loading) return <div className="spinner">Loading...</div>;
  if (error) return <p>Error: {error.message}</p>;

  const filteredProducts = data?.products?.filter((product: { title: string }) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Product Search</h1>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products by name"
          className="border rounded px-2 py-1"
        />
      </div>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {filteredProducts?.map((product: { id: number; title: string; imageUrl: string }) => (
          <li key={product.id} className="border rounded p-4">
            <Link href={`/products/${product.id}`}>
                <img src={product.imageUrl} alt={product.title} className="w-full h-64 object-cover mb-2" />
                <p className="text-lg font-semibold">{product.title}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
