"use client"

import React from 'react';
import { useParams } from 'next/navigation';
import ProductDetails from '../../../components/ProductDetails';

const ProductDetailsPage: React.FC = () => {
  const { id } = useParams();

  return id ? <ProductDetails productId={id as string} /> : <p>Loading...</p>;
};

export default ProductDetailsPage;
