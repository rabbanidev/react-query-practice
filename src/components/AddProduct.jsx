import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import api from "../helper/api";

const addProduct = async (newProduct) => {
  const response = await api.post("/products", newProduct);
  return response.data;
};

const AddProduct = () => {
  const [state, setState] = useState({
    title: "",
    description: "",
    price: 0,
    rating: 5,
    thumbnail: "",
  });

  const queryClient = useQueryClient();

  const {
    mutate: mutateAddProduct,
    isSuccess,
    isPending,
  } = useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
    },
  });

  const handleChange = (event) => {
    const name = event.target.name;
    const value =
      event.target.type === "number"
        ? event.target.valueAsNumber
        : event.target.value;

    setState({
      ...state,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newData = { ...state, id: crypto.randomUUID().toString() };
    mutateAddProduct(newData);
    setState({
      ...state,
      title: "",
      description: "",
      price: 0,
      rating: 5,
      thumbnail: "",
    });
  };

  return (
    <div className="m-2 p-2 bg-gray-100 w-1/5 h-1/2">
      <h2 className="text-2xl my-2">Add a Product</h2>
      {isSuccess && <p>Product Added!</p>}
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <input
          type="text"
          value={state.title}
          name="title"
          onChange={handleChange}
          className="my-2 border p-2 rounded"
          placeholder="Enter a product title"
        />
        <textarea
          value={state.description}
          name="description"
          onChange={handleChange}
          className="my-2 border p-2 rounded"
          placeholder="Enter a product description"
        />

        <input
          type="number"
          value={state.price}
          name="price"
          onChange={handleChange}
          className="my-2 border p-2 rounded"
          placeholder="Enter a product price"
        />
        <input
          type="text"
          value={state.thumbnail}
          name="thumbnail"
          onChange={handleChange}
          className="my-2 border p-2 rounded"
          placeholder="Enter a product thumbnail URL"
        />

        <button
          type="submit"
          className="bg-black m-auto text-white text-xl p-1 rounded-md"
          disabled={isPending}
        >
          {isPending ? "Loading..." : "Add"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
