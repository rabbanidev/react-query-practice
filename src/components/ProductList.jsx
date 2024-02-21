/* eslint-disable react/prop-types */

import { useQuery } from "@tanstack/react-query";
import api from "../helper/api";

const retrieveProducts = async ({ queryKey }) => {
  const response = await api.get(`/${queryKey[0]}`);
  return response.data;
};

const ProductList = ({ onProductIdSelected }) => {
  const {
    data: products,
    isError,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: retrieveProducts,
    // refetchInterval: 5000, number | false
    // retry: boolean or number
    // staleTime: 3000, number or Infinity
  });

  if (isLoading) return <div>Fetching Products...</div>;
  if (isError) return <div>An error occured: {error.message}</div>;

  return (
    <div className="flex flex-col justify-center items-center w-3/5">
      <h2 className="text-3xl my-2">Product List</h2>
      <ul className="flex flex-wrap justify-center items-center">
        {products.map((product) => (
          <li
            key={product.id}
            className="flex flex-col items-center m-2 border rounded-sm"
            onClick={() => onProductIdSelected(product.id)}
          >
            <img
              className="object-cover h-64 w-96 rounded-sm"
              src={product.thumbnail}
              alt={product.title}
            />
            <p className="text-xl my-3">{product.title}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
