import { useState, useEffect } from 'react';
import ProductList from './components/ProductList';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/products')
      .then(response => response.json())
      .then(data => setProducts(data));
  }, []);

  const handleSearch = () => {
    fetch(`http://localhost:3000/products?search=${search}`)
      .then(response => response.json())
      .then(data => setProducts(data));
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          className="border rounded p-2 w-full"
          placeholder="Pesquisar produtos"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="ml-2 p-2 bg-blue-500 text-white rounded" onClick={handleSearch}>Pesquisar</button>
      </div>
      <ProductList products={products} />
    </div>
  );
};

export default Home;
