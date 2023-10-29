import httpService from "./httpService";

//Get All Categories
export async function fetchCategories(categoriesQuery) {
  const categories = await httpService
    .get(`/categories${categoriesQuery}`)
    .then((response) => response.data);
  return categories;
}

//Add Category
export async function addCategory(newCategory, token_header) {
  await httpService
    .post("/categories", newCategory, token_header)
    .then((response) => response.data);
  return;
}

//Edit Category
export async function editCategory(categoryId, editedCategory, token_header) {
  await httpService
    .put(`/categories/${categoryId}`, editedCategory, token_header)
    .then((response) => response.data);
  return;
}

//Delete Category
export async function deleteCategory(categoryId, token_header) {
  await httpService
    .delete(`/categories/${categoryId}`, token_header)
    .then((response) => response.data);
  return;
}
