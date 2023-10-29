import { useStoreContext } from "../../context/store.context";
import { Products } from "./products";

export function Main() {
  const {
    signedIn,
    products,
    productsFilter,
    cart,
    handleAmountChange,
    addToCart,
    setProductToEdit,
    setModalFormType,
  } = useStoreContext();

  const signedInLevel = signedIn?.isAdmin ? "admin" : "user";

  return (
    <>
      {signedInLevel === "admin" && (
        <div id="createNewProductDiv">
          <button
            id="createNewProduct"
            className="btn"
            onClick={() => setModalFormType("newProduct")}
          >
            <i className="bi bi-plus"></i> Create New Product
          </button>
        </div>
      )}
      {products.length !== 0 ? (
        <Products
          products={products}
          signedInLevel={signedInLevel}
          productsFilter={productsFilter}
          cart={cart}
          handleAmountChange={handleAmountChange}
          addToCart={addToCart}
          setProductToEdit={setProductToEdit}
          setModalFormType={setModalFormType}
        />
      ) : (
        <p className="text-center fs-2 fw-bold">No Products were found..</p>
      )}
    </>
  );
}
