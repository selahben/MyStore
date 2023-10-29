import { useEffect, useState } from "react";
import { useStoreContext } from "../../context/store.context";

export function Product({
  product: { sn, name, category, image, price, unit, _id, description },
  fullProduct,
}) {
  const {
    signedIn,
    cart,
    handleAmountChange,
    addToCart,
    setProductToEdit,
    setModalFormType,
    setProductToQuickview,
  } = useStoreContext();

  const [productAmount, setProductAmount] = useState(getAmount);

  //Syncing between product and cart amount
  useEffect(() => {
    if (isInCart()) {
      const amountFromCart = cart.filter(
        (product) => product.product.sn === sn
      );
      setProductAmount(amountFromCart[0].amount);
    } else {
      setProductAmount(0);
    }
  }, [cart]);

  //getting amount from cart
  function getAmount() {
    const amountFromCart = cart.filter((product) => product.product.sn === sn);
    if (amountFromCart && amountFromCart.length !== 0) {
      return amountFromCart[0].amount;
    } else {
      return 0;
    }
  }

  //User level
  const signedInLevel = signedIn.isAdmin
    ? "admin"
    : signedIn.isAdmin === false
    ? "user"
    : "none";

  //Checking if product is in the cart
  const inCart = isInCart();
  function isInCart() {
    const cartCheck = cart.filter((product) => product.product.sn === sn);
    if (cartCheck && cartCheck.length !== 0) {
      return true;
    } else {
      return false;
    }
  }

  //Handling amount change
  function changeAmount(amount, _id) {
    console.log(amount);
    if (isInCart()) {
      setProductAmount(amount);
    } else {
      setProductAmount(0);
    }
    handleAmountChange(amount, _id);
  }

  //Opening the edit product modal
  function setEditProduct() {
    setModalFormType("editProduct");
    setProductToEdit(fullProduct);
  }

  //Opening the quickview product modal
  function setQuickview() {
    setModalFormType("quickview");
    setProductToQuickview(fullProduct);
  }

  return (
    <div
      id={`product${sn}`}
      className={`productDiv ${category.className}`}
      style={signedInLevel === "admin" ? { paddingTop: "35px" } : {}}
    >
      <h3 className="productTitle">{name}</h3>
      <img className="productImg" src={image.url} alt={image.alt} />
      <p className="productDesc">{description}</p>
      <p className="productPrice">
        Price: {price}$ for 1 {unit}
      </p>
      <p className="productAmount">
        Amount:{" "}
        <input
          type="number"
          id={`productAmountInput${sn}`}
          className="productAmountInput"
          min="0"
          max="5"
          step={unit === "KG" ? "0.5" : "1"}
          placeholder="0"
          value={inCart ? getAmount() : productAmount}
          onChange={
            inCart
              ? (e) => changeAmount(e.target.value, _id)
              : (e) => setProductAmount(e.target.value)
          }
        />
        {" " + unit}
      </p>
      <p className="addProductP">
        <input
          disabled={inCart || signedInLevel === "none"}
          type="submit"
          id={`addProduct${sn}`}
          className="addProduct"
          value="Add to Cart"
          onClick={() => addToCart(_id, productAmount)}
        />
      </p>
      <button className="btn quickviewBTN" onClick={setQuickview}>
        <i className="bi bi-eye"></i>
      </button>
      {signedInLevel === "admin" && (
        <button className="btn editBTN" onClick={setEditProduct}>
          <i className="bi bi-pencil-square"></i> Edit Product
        </button>
      )}
      {signedInLevel === "none" && (
        <p className="userProductAlert text-danger text-center mb-0 fw-bold">
          Please Sign In/Up to Buy this Product..
        </p>
      )}
    </div>
  );
}
