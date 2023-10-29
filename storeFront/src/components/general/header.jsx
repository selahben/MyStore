import { useState } from "react";
import { MainMenu } from "./mainMenu";
import { SignIn } from "./signIn";
import { SignUp } from "./signUp";
import { SignOut } from "./signOut";
import { Cart } from "../products/cart";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { AlternativeMenu } from "./alternativeMenu";
import { useStoreContext } from "../../context/store.context";
import { ProductSearch } from "../forms/productSearch";
import { Link } from "react-router-dom";

export function Header() {
  const {
    signedIn = {},
    setUserToEdit,
    cart,
    handleAmountChange,
    removeFromCart,
    setModalFormType,
  } = useStoreContext();
  const [cartVisible, setCartVisible] = useState(false);

  return (
    <header>
      <div id="headerTop" className={signedIn.email && "userSignedIn"}>
        <div
          id="theUser"
          className={signedIn.email ? "d-flex flex-column" : "d-flex flex-row"}
        >
          <span>
            {signedIn.email ? (
              <img
                id="userImage"
                src={signedIn.image?.url}
                alt={signedIn.image?.alt}
              />
            ) : (
              <i className="bi bi-person-fill"></i>
            )}
          </span>

          {signedIn.email && (
            <div className="dropdown">
              <button
                className="dropdown-toggle"
                type="button"
                id="theUserName"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {signedIn.name}
              </button>
              <ul className="dropdown-menu" aria-labelledby="theUserName">
                <li className="">
                  <i className="bi bi-envelope userIcon"></i>
                  {signedIn.email}
                </li>
                <li className="">
                  <i className="bi bi-telephone userIcon"></i>
                  {signedIn.phone}
                </li>
                <li className="mt-3">
                  <button
                    className="btn dropdown-item text-decoration-underline"
                    onClick={() => {
                      setUserToEdit(signedIn);
                      setModalFormType("editUser");
                    }}
                  >
                    Edit Profile
                  </button>
                </li>
                {signedIn.isAdmin && (
                  <li className="mt-2" style={{ "letterSpacing": "1px" }}>
                    <Link
                      className="btn dropdown-item text-decoration-underline fw-bold"
                      to="/admin_panel"
                    >
                      Admin Panel
                    </Link>
                  </li>
                )}
                <li className="mt-4">
                  <SignOut />
                </li>
              </ul>
            </div>
          )}

          <div id="userOptions">
            {!signedIn.email && (
              <div className="d-inline-block" id="noLoginP">
                <SignIn setModalFormType={setModalFormType} />
                /
                <SignUp setModalFormType={setModalFormType} />
              </div>
            )}
          </div>
        </div>
        <div id="adminLinkDiv"></div>
        <ProductSearch />
      </div>
      <div id="headerBottom">
        <div id="logoDiv">
          <NavLink to="/">
            <img
              id="logo"
              src={process.env.PUBLIC_URL + "/Imgs/My-Store-Logo2.png"}
              alt="store logo"
            />
          </NavLink>
        </div>

        {useLocation().pathname === "/" ? <MainMenu /> : <AlternativeMenu />}
        <div id="theCart">
          <button
            onClick={() => setCartVisible(!cartVisible)}
            className="btn"
            id="myCart"
          >
            <span id="cartProductsNum">{cart.length || 0}</span>
            <i className="bi bi-cart-plus-fill"></i>
          </button>
          {cartVisible && (
            <Cart
              cart={cart}
              handleAmountChange={handleAmountChange}
              removeFromCart={removeFromCart}
            />
          )}
        </div>
      </div>
    </header>
  );
}
