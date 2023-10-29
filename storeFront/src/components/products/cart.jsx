import { useStoreContext } from "../../context/store.context";
import { CartProduct } from "./cartProduct";

export function Cart() {
  const { cart, handleAmountChange, removeFromCart } = useStoreContext();

  let total = 0;
  cart.forEach((cartProduct) => {
    total += Number(cartProduct.product.price) * Number(cartProduct.amount);
  });

  return (
    <div id="cartDiv">
      <h3>Your Cart</h3>
      <div id="cartProducts">
        {cart.map((cartProduct) => (
          <CartProduct
            key={cartProduct.product.sn}
            cartProduct={cartProduct}
            cart={cart}
            handleAmountChange={handleAmountChange}
            removeFromCart={removeFromCart}
          />
        ))}
      </div>
      <div id="cartTotal">
        <span id="cartTotalSumTitle">Total: </span>
        <span id="cartTotalSum">
          <span id="cartTotalSumNum">{total}</span>$
        </span>
      </div>
    </div>
  );
}
