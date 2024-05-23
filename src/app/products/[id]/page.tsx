"use client"

import React from 'react';
import { useParams } from 'next/navigation';
import ProductDetails from '../../../components/ProductDetails';

const ProductDetailsPage: React.FC = () => {
  const params = useParams();
  const { id } = params;

  if (!id) {
    return <p>Loading...</p>;
  }

  console.log("Product ID:", id); // Log para verificar o ID do produto

  return <ProductDetails productId={id as string} />;
};

export default ProductDetailsPage;
