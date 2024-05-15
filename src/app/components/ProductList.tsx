import ProductCard from './ProductCard';

const ProductList = ({ products }) => (
  <div className="grid grid-cols-3 gap-4">
    {products.map(product => (
      <ProductCard key={product.id} product={product} />
    ))}
  </div>
);

export default ProductList;
