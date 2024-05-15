import { Line } from 'react-chartjs-2';

const ProductDetail = ({ product }) => {
  const priceHistory = {
    labels: product.prices.map(price => new Date(price.createdAt).toLocaleDateString()),
    datasets: [
      {
        label: 'Histórico de Preços',
        data: product.prices.map(price => price.value),
        fill: false,
        backgroundColor: 'blue',
        borderColor: 'blue',
      },
    ],
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">{product.title}</h1>
      <img src={product.image_url} alt={product.title} className="h-40 w-full object-cover mb-4 rounded-md" />
      <div className="flex mb-4">
        <p className="mr-4">Preço Mínimo: R$ {product.minPrice}</p>
        <p className="mr-4">Preço Médio: R$ {product.medPrice}</p>
        <p className="mr-4">Preço Máximo: R$ {product.maxPrice}</p>
      </div>
      <h2 className="text-xl font-semibold mb-4">Lojas</h2>
      {product.products.map(detail => (
        <div key={detail.id} className="border p-4 rounded mb-4">
          <img src={detail.image_url} alt={detail.title} className="h-20 w-full object-cover mb-2 rounded-md" />
          <p>{detail.seller}</p>
          <p>Preço: R$ {detail.price}</p>
          <p>Rating: {detail.rating}</p>
          <a href={detail.seller_url} target="_blank" className="text-blue-500 hover:underline">Ver na loja</a>
        </div>
      ))}
      <h2 className="text-xl font-semibold mb-4">Histórico de Preço</h2>
      <Line data={priceHistory} />
    </div>
  );
};

export default ProductDetail;
