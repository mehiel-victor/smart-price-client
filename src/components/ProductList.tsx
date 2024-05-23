"use client"

import React, { useState, ChangeEvent } from 'react';
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

const ProductList = () => {
  const { loading, error, data } = useQuery(GET_PRODUCTS, { client });
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = data?.products?.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  ) ?? [];

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="container mx-auto p-2">
      <div className="mb-8">
        <input
          type="text"
          placeholder="Pesquisar produtos"
          value={searchTerm}
          onChange={handleSearchChange}
          className="border rounded-lg p-2 w-full"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredProducts.map((product) => (
          <Link key={product.id} href={`/products/${product.id}`} className="border rounded-lg p-4 flex flex-col items-center">
              <div className="w-full h-56 rounded-lg mb-4">
                {product.imageUrl && (
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="w-full h-full object-contain rounded-lg"
                  />
                )}
              </div>
              <p className="text-lg font-semibold">{product.title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
