import httpService from "./httpService";

//Get Current User Cart
export async function fetchUserCart(token_header) {
  let fetchedUserCart = await httpService
    .get(`/users/cart`, token_header)
    .then((response) => response.data);
  return fetchedUserCart.cart;
}

//Change Amount of product in user cart
export async function changeAmount(productId, newAmount, token_header) {
  const cart = await httpService
    .patch(
      "/users/cart",
      { "product_id": productId, "amount": newAmount },
      token_header
    )
    .then((response) => response.data);
  return cart.cart;
}

//Delete product from cart
export async function deleteFromCart(productId, token_header) {
  const cart = await httpService
    .patch(
      "/users/cart",
      { "product_id": productId, "amount": 0 },
      token_header
    )
    .then((response) => response.data);
  return cart.cart;
}

//Add product to cart
export async function addProductToCart(product_id, amount, token_header) {
  const cart = await httpService
    .patch(
      "/users/cart",
      { "product_id": product_id, "amount": amount },
      token_header
    )
    .then((response) => response.data);
  return cart.cart;
}
