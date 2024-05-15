import Link from 'next/link';

const ProductCard = ({ product }) => (
  <div className="border rounded-lg p-4">
    <img src={product.image_url} alt={product.title} className="h-40 w-full object-cover mb-4 rounded-md" />
    <h2 className="text-lg font-semibold">{product.title}</h2>
    <p>R$ {product.price}</p>
    <Link href={`/product/detail?id=${product.id}`}>
      <a className="text-blue-500 hover:underline">Ver detalhes</a>
    </Link>
  </div>
);

export default ProductCard;
