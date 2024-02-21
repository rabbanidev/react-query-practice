import { useState } from "react";
import ProductDetails from "./components/ProductDetails";
import ProductList from "./components/ProductList";
import AddProduct from "./components/AddProduct";

const App = () => {
  const [selectedProductId, setSelectedProductId] = useState("1");

  return (
    <div className="flex m-2">
      <AddProduct />
      <ProductList onProductIdSelected={setSelectedProductId} />
      <ProductDetails id={selectedProductId} />
    </div>
  );
};

export default App;
