import { useStoreContext } from "../../context/store.context";

export function CartProduct({
  cartProduct: {
    product: { _id, sn, name, price, unit, image },
    amount,
  },
}) {
  const { handleAmountChange, removeFromCart } = useStoreContext();

  return (
    <div className="cartProduct" id={`cartProduct${sn}`}>
      <img className="cartProductImg" src={image.url} alt={image.alt} />
      <h4 className="cartProductTitle">
        <span>{name}:</span>
      </h4>
      <span className="cartProductPrice">{price}$ *</span>
      <input
        className="cartProductAmount form-control"
        id={`cartProductAmount${sn}`}
        type="number"
        min="0"
        max="5"
        value={amount}
        step={unit === "Units" ? "1" : "0.5"}
        onChange={(e) => handleAmountChange(e.target.value, _id)}
      />
      <span>{unit}</span>=
      <span className="cartProductTotalPrice" id={`cartProductTotalPrice${sn}`}>
        {price * amount}$
      </span>
      <button
        onClick={() => removeFromCart(_id)}
        className="cartProductDelete btn"
        id={`cartProductDelete${sn}`}
      >
        X
      </button>
    </div>
  );
}
