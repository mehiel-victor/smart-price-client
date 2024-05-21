"use client";

import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import createApolloClient from '../app/apollo-client';
import { gql } from '../__generated__';

const client = createApolloClient();

const GET_PRODUCT_DETAILS = gql(/* GraphQL */`
  query GetProductDetails($id: Float!) {
    product(id: $id) {
      id
      title
      imageUrl
      prices {
        id
        min
        med
        max
        createdAt
      }
      productInfo {
        id
        imageUrl
        price
        rating
        scrapedFromUrl
        seller
        sellerUrl
        title
      }
    }
  }
`);

interface ProductDetailsProps {
  productId: string;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ productId }) => {
  const { loading, error, data } = useQuery(GET_PRODUCT_DETAILS, {
    variables: { id: parseFloat(productId) },
    client,
  });

const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  console.log("GraphQL Data:", data); // Log para verificar os dados retornados

  const product = data?.product;

  if (!product) {
    return <p>Product not found</p>;
  }
  
  const images = product.images || [{ id: 1, url: product.imageUrl }];

  return (
    <div className="p-4">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 p-4">
        <div className="flex flex-col space-y-2">
            {images.map((image: { id: number, url: string }) => (
              <img
                key={image.id}
                src={image.url}
                alt={product.title}
                className={`w-16 h-16 object-cover cursor-pointer ${selectedImage === image.url ? 'border-2 border-blue-500' : ''}`}
                onClick={() => setSelectedImage(image.url)}
              />
            ))}
          </div>
          <div className="ml-4 flex-grow">
            <img
              src={selectedImage || product.imageUrl}
              alt={product.title}
              className="w-full h-auto"
            />
          </div>
        </div>
        <div className="w-full md:w-1/2 p-4">
          <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
          <p className="text-gray-600">Lorem ipsum dolor sit amet consectetur. Tortor aliquam amet ipsum sed pellentesque lectus. Lorem ipsum dolor sit amet consectetur. Tortor aliquam amet ipsum sed pellentesque lectus. <a href="#" className="text-blue-500">Leia mais</a>.</p>
          <div className="mt-4">
            <p className="text-xl font-bold">Preço médio: R$ 0,00</p>
            <div className="flex space-x-4">
              <p className="text-md text-gray-700">Menor preço: R$ 0,00 Loja X</p>
              <p className="text-md text-gray-700">Maior preço: R$ 0,00 Loja X</p>
            </div>
            <p className="text-sm text-gray-500">Entrega e devolução gratuitas</p>
          </div>
          <div className="mt-4">
            <h2 className="text-xl font-bold">Prices</h2>
            <ul className="list-disc list-inside">
              {product.prices.map((price: { id: number; min: number; med: number; max: number; createdAt: string }) => (
                <li key={price.id}>
                  Min: {price.min}, Med: {price.med}, Max: {price.max}, Date: {new Date(price.createdAt).toLocaleDateString()}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-4">
            <h2 className="text-xl font-bold">Product Info</h2>
            <ul className="list-disc list-inside">
              {product.productInfo.map((info: { id: number; price: number; rating: number; scrapedFromUrl: string; seller: string; sellerUrl: string; title: string }) => (
                <li key={info.id} className="flex flex-col space-y-2">
                  <p>Price: {info.price}</p>
                  <p>Rating: {info.rating}</p>
                  <p>Seller: {info.seller}</p>
                  <a href={info.sellerUrl} className="text-blue-500">Seller URL</a>
                  <p>{info.title}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-bold">Histórico de preço</h2>
        <div className="flex space-x-2">
          <label className="text-gray-700">Loja:</label>
          <select className="border rounded px-2 py-1">
            <option>Selecione</option>
          </select>
        </div>
        <div className="mt-4">
          {/* Gráfico de histórico de preços */}
        </div>
        <div className="flex space-x-4 mt-4">
          <button className="px-4 py-2 bg-blue-500 text-white rounded">1 mês</button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded">3 meses</button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded">Ver histórico completo</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
