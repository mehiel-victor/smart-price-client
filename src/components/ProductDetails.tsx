import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import createApolloClient from '../app/apollo-client';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { HeartIcon as HeartOutline } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';
import { StarIcon as StarIconFilled, BuildingStorefrontIcon } from '@heroicons/react/24/solid';

const client = createApolloClient();

const GET_PRODUCT_DETAILS = gql`
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
`;

interface ProductDetailsProps {
  productId: string;
}

interface ProductInfo {
  id: string;
  imageUrl: string;
  price: number;
  rating: number;
  scrapedFromUrl: string;
  seller: string;
  sellerUrl: string;
  title: string;
}

interface Price {
  id: string;
  min: number;
  med: number;
  max: number;
  createdAt: string;
  seller: string;
}

interface Product {
  id: string;
  title: string;
  imageUrl: string;
  prices: Price[];
  productInfo: ProductInfo[];
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value / 100);
};

const getSellerLogo = (seller: string) => {
  switch (seller.toLowerCase()) {
    case 'samsung':
      return 'https://logos-world.net/wp-content/uploads/2020/04/Samsung-Symbol.png';
    case 'amazon':
      return 'https://i.pinimg.com/originals/5a/62/70/5a62706bc5603694b1bd08acc40d3096.png';
    case 'tradeinn':
      return 'https://catracalivre.com.br/cdn-cgi/image/f=auto,q=60,w=1200,h=900,fit=cover,format=jpeg/wp-content/uploads/2024/01/tradeinn-logo.png';
    case 'magazineluiza':
      return 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQr20quaDHJBBSxsLn8C95mK0ZD6bsibG5h0uC0bk_8xA&s';
    case 'kabum':
      return 'https://logodownload.org/wp-content/uploads/2017/11/kabum-logo-1.png';
    case 'xtreme informática':
      return 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5xCiUK6c7XYp9Gjia4YyM0r-zcm1MSUvnWe_6Qd3vtQ&s';
    case 'mercado livre':
      return 'https://vectorseek.com/wp-content/uploads/2023/08/Mercado-Livre-Icon-Logo-Vector.svg-.png';
    default:
      return '';
  }
};

const ProductDetails: React.FC<ProductDetailsProps> = ({ productId }) => {
  const { loading, error, data } = useQuery<{ product: Product }>(GET_PRODUCT_DETAILS, {
    variables: { id: parseFloat(productId) },
    client,
  });

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [favorite, setFavorite] = useState<boolean>(false);
  const [showNotification, setShowNotification] = useState<boolean>(false);

  useEffect(() => {
    if (data?.product?.productInfo?.length) {
      setSelectedImage(data.product.productInfo[0].imageUrl);
    }
  }, [data]);

  const handleFavoriteClick = () => {
    setFavorite(!favorite);
    if (!favorite) {
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
      }, 3000);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data?.product) return <p>Product not found</p>;

  const product: Product = data.product;
  const latestPrice = product.prices[product.prices.length - 1];

  const images = product.productInfo.map((info: ProductInfo) => ({ id: info.id, url: info.imageUrl }));
  const priceHistory = product.prices.map((price: Price) => ({
    name: new Date(price.createdAt).toLocaleDateString(),
    price: price.med / 100,
    seller: price.seller,
  }));

  return (
    <div className="relative container mx-auto p-6">
      {showNotification && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white py-2 px-4 rounded-xl transition-opacity duration-300">
          Produto favoritado com sucesso
        </div>
      )}
      <div className="flex flex-col lg:flex-row bg-white p-10" style={{ height: '80vh' }}>
        <div className="flex lg:w-2/4">
          <div className="flex flex-col items-center justify-center space-y-2 mr-4">
            {images.map((image) => (
              <div key={image.id} className="w-24 h-24 bg-white rounded-xl overflow-hidden">
                <img
                  src={image.url}
                  alt="Thumbnail"
                  className="w-full h-full object-contain cursor-pointer"
                  onClick={() => setSelectedImage(image.url)}
                />
              </div>
            ))}
          </div>
          <div className="relative w-full h-full bg-white flex items-center justify-center">
            {selectedImage && <img src={selectedImage} alt="Selected" className="w-full h-full object-contain" />}
            <button
              className={`absolute top-2 right-2 p-1 ${favorite ? 'animate-explosion' : ''}`}
              onClick={handleFavoriteClick}
            >
              {favorite ? (
                <HeartSolid className="h-8 w-8 text-red-500 transition-colors duration-300" />
              ) : (
                <HeartOutline className="h-8 w-8 text-gray-400 hover:text-red-500 transition-colors duration-300" />
              )}
            </button>
          </div>
        </div>
        <div className="lg:w-96">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">{product.title}</h1>
          </div>
          <div className="flex items-center mb-4">
            <StarIconFilled className="h-5 w-5 text-yellow-500" />
            <span className="ml-1">{product.productInfo[0].rating}</span>
          </div>
          <p className="text-gray-700 mb-4 text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel expedita tempora earum itaque alias. Magnam placeat delectus et blanditiis totam illo odio praesentium dolorem explicabo velit sequi obcaecati, consequatur eos?
          </p>
          <p className="text-gray-700 mb-4 text-g">
            Preços de <span className="font-bold">{formatCurrency(latestPrice.min)}</span> a <span className="font-bold">{formatCurrency(latestPrice.max)}</span> neste produto.
          </p>
          <div className="rounded-xl grid lg:grid-cols-2 gap-12">
            <div className="text-center rounded-xl shadow-md flex align-center flex-col justify-center items-center w-48 p-2">
              <p className="text-sm">Preço médio</p>
              <p className="text-xl font-bold">{formatCurrency(latestPrice.med)}</p>
              <a href={product.productInfo[0].scrapedFromUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 cursor-pointer text-xs">
                {product.productInfo[0].seller}
              </a>
              <p className="text-xs text-gray-500 mt-2">Entrega e devolução gratuitas</p>
            </div>
            <div className="text-center rounded-xl shadow-md flex align-center flex-row justify-center items-center w-80 gap-5">
              <div className="pl-30">
                <p className="text-sm">Menor preço</p>
                <p className="text-xl font-bold">{formatCurrency(latestPrice.min)}</p>
                <a href={product.productInfo[0].scrapedFromUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 cursor-pointer text-xs">
                  {product.productInfo[0].seller}
                </a>
              </div>
              <div className="border-l-2 h-full"></div>
              <div className="">
                <p className="text-sm">Maior preço</p>
                <p className="text-xl font-bold">{formatCurrency(latestPrice.max)}</p>
                <a href={product.productInfo[0].scrapedFromUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 cursor-pointer text-xs">
                  {product.productInfo[0].seller}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr className="w-full h-0.5 mx-auto my-8 border-0 md:my-12 bg-gray-800" />
      <div>
        <div className="mt-8 bg-white rounded-xl p-6 w-full">
          <div className="space-y-8">
            {product.productInfo.map((info: ProductInfo) => (
              <div key={info.id} className="flex items-center justify-between bg-white shadow-md p-8 rounded-xl">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-xl mr-4">
                    <img src={getSellerLogo(info.seller) || info.imageUrl} alt="Seller" className="w-full h-full object-contain rounded-xl" />
                  </div>
                  <div className="flex items-center text-gray-700 text-sm font-bold">
                    <BuildingStorefrontIcon className="h-5 w-5 mr-2" />
                    <a href={info.scrapedFromUrl} target="_blank" rel="noopener noreferrer" className="text-center">
                      Veja o produto na {info.seller}.
                    </a>
                  </div>
                </div>
                <div className="text-lg font-bold text-center">{formatCurrency(info.price)}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-8 bg-white rounded-xl p-6">
          <h2 className="text-lg font-bold mb-4">Histórico de preço</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={priceHistory}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value, name, props) => [formatCurrency(value as number * 100), props.payload.seller]} />
              <Line type="monotone" dataKey="price" stroke="#8884d8" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
