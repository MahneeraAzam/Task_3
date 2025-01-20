
'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';

type Product = {
  _id: string;
  name: string;
  price: string;
  image?: { asset: { _ref: string } };
  description?: string;
  category?: string;
  discountPercentage?: number;
  stockLevel?: number;
  isFeaturedProduct?: boolean;
};

const ProductCard: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const fetchData = async () => {
    try {
      const response = await axios.get('/api/sanity-products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {products.map((product) => (
        <div
          key={product._id}
          className="border rounded-lg shadow-md p-4 hover:shadow-lg transition"
        >
          {product.image && (
            <img
              src={product.image.asset._ref}
              alt={product.name}
              className="w-full h-40 object-cover rounded"
            />
          )}
          <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
          <p className="text-gray-500 text-sm">{product.category}</p>
          <p className="text-green-600 font-bold">${product.price}</p>
          {product.discountPercentage ? (
            <p className="text-red-500 text-sm">
              {product.discountPercentage}% OFF
            </p>
          ) : null}
          <p className="text-gray-600 mt-2">{product.description}</p>
          <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition">
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductCard;
