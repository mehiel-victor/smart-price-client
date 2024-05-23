"use client"

import React, { useState, ChangeEvent } from 'react';
import { useQuery, gql } from '@apollo/client';
import client from '../app/apollo-client';
import Link from 'next/link';

const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      id
      title
      imageUrl
    }
  }
`;

interface Product {
  id: string;
  title: string;
  imageUrl: string;
}

const ProductList: React.FC = () => {
  const { loading, error, data } = useQuery<{ products: Product[] }>(GET_PRODUCTS, { client });
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
        {filteredProducts.map(({ id, title, imageUrl }) => (
          <Link key={id} href={`/products/${id}`} className="border rounded-lg p-4 flex flex-col items-center">
            <div className="w-full h-56 rounded-lg mb-4">
              {imageUrl && (
                <img src={imageUrl} alt={title} className="w-full h-full object-contain rounded-lg" />
              )}
            </div>
            <p className="text-lg font-semibold">{title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
