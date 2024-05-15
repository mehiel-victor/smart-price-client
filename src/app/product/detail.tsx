import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import ProductDetail from '../components/ProductDetail';

const ProductPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3000/products/${id}`)
        .then(response => response.json())
        .then(data => setProduct(data));
    }
  }, [id]);

  if (!product) return <p>Carregando...</p>;

  return (
    <div className="container mx-auto p-4">
      <ProductDetail product={product} />
    </div>
  );
};

export default ProductPage;
