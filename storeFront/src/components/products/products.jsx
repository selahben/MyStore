import { useStoreContext } from "../../context/store.context";
import { Product } from "./product";

export function Products() {
  const {
    products,
    signedInLevel = "user",
    cart,
    handleAmountChange,
    addToCart,
    setProductToEdit,
    setModalFormType,
  } = useStoreContext();

  return (
    <div id="products">
      {products.map((product) => (
        <Product
          key={product.sn}
          product={product}
          fullProduct={product}
          signedInLevel={signedInLevel}
          cart={cart}
          handleAmountChange={handleAmountChange}
          addToCart={addToCart}
          setProductToEdit={setProductToEdit}
          setModalFormType={setModalFormType}
        />
      ))}
    </div>
  );
}
