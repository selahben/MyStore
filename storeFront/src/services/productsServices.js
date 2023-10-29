import httpService from "./httpService";

//Get all products
export async function fetchProducts(productsQuery) {
  const products = await httpService
    .get(`/products${productsQuery}`)
    .then((response) => response.data);
  return products;
}

//Add Product
export async function addProduct(newProduct, token_header) {
  await httpService
    .post(
      "/products",
      {
        "sn": String(newProduct.productSN),
        "name": newProduct.productName,
        "description": newProduct.productDescription,
        "price": newProduct.productPrice,
        "unit": newProduct.productUnit,
        "image": {
          "url": newProduct.productImage,
          "alt": newProduct.productName,
        },
        "category": newProduct.productCategory,
        "tags": newProduct.productTags,
      },
      token_header
    )
    .then((response) => response.data);
  return;
}

//Edit Product
export async function editProduct(productId, editedProduct, token_header) {
  await httpService
    .put(
      `/products/${productId}`,
      {
        "sn": String(editedProduct.productSN),
        "name": editedProduct.productName,
        "description": editedProduct.productDescription,
        "price": editedProduct.productPrice,
        "unit": editedProduct.productUnit,
        "image": {
          "url": editedProduct.productImage,
          "alt": editedProduct.productName,
        },
        "category": editedProduct.productCategory,
        "tags": editedProduct.productTags,
      },
      token_header
    )
    .then((response) => response.data);
  return;
}

//Delete Product
export async function deleteProduct(productId, token_header) {
  await httpService
    .delete(`/products/${productId}`, token_header)
    .then((response) => response.data);
  return;
}
