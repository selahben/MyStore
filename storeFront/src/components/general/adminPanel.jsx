import { useStoreContext } from "../../context/store.context";
import { useEffect } from "react";
import { ProductsTable } from "../admin/productsTable";
import { CategoriesTable } from "../admin/categoriesTable";
import { UsersTable } from "../admin/usersTable";

export function AdminPanel() {
  const {
    categories,
    products,
    users,
    getUsers,
    setProductsFilter,
    setSearchQuery,
    setModalFormType,
  } = useStoreContext();

  useEffect(() => {
    setProductsFilter("AllProducts");
    setSearchQuery("");
    getUsers();
  }, []);

  return (
    <div id="adminMain" className="d-flex flex-column align-items-center py-2">
      <h1 className="mt-4 mb-0">Admin Panel</h1>
      <div id="adminTabs">
        <ul className="nav nav-tabs" id="adminTabs" role="tablist">
          <li className="nav-item" role="presentation">
            <button
              className="nav-link active"
              id="adminProducts-tab"
              data-bs-toggle="tab"
              data-bs-target="#adminProducts"
              type="button"
              role="tab"
              aria-controls="adminProducts"
              aria-selected="true"
            >
              Products
            </button>
          </li>

          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="adminCategories-tab"
              data-bs-toggle="tab"
              data-bs-target="#adminCategories"
              type="button"
              role="tab"
              aria-controls="adminCategories"
              aria-selected="false"
            >
              Categories
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="adminUsers-tab"
              data-bs-toggle="tab"
              data-bs-target="#adminUsers"
              type="button"
              role="tab"
              aria-controls="adminUsers"
              aria-selected="false"
            >
              Users
            </button>
          </li>
        </ul>
        <div className="tab-content" id="myTabContent">
          <div
            className="tab-pane fade show active"
            id="adminProducts"
            role="tabpanel"
            aria-labelledby="adminProducts-tab"
          >
            <div id="createNewProductDiv">
              <button
                id="createNewProduct"
                className="btn"
                onClick={() => setModalFormType("newProduct")}
              >
                <i className="bi bi-plus"></i> Create New Product
              </button>
            </div>
            {products.length > 0 ? (
              <ProductsTable />
            ) : (
              <p className="fs-3 text-center mt-2 fw-normal">
                No Products Were Found..
              </p>
            )}
          </div>
          <div
            className="tab-pane fade"
            id="adminCategories"
            role="tabpanel"
            aria-labelledby="adminCategories-tab"
          >
            <div id="createNewCategoryDiv">
              <button
                id="createNewCategory"
                className="btn"
                onClick={() => setModalFormType("newCategory")}
              >
                <i className="bi bi-plus"></i> Create New Category
              </button>
            </div>
            {categories.length > 0 ? (
              <CategoriesTable />
            ) : (
              <p className="fs-3 text-center mt-2 fw-normal">
                No Categories Were Found..
              </p>
            )}
          </div>
          <div
            className="tab-pane fade"
            id="adminUsers"
            role="tabpanel"
            aria-labelledby="adminUsers-tab"
          >
            {users.length > 0 ? (
              <UsersTable />
            ) : (
              <p className="fs-3 text-center mt-2 fw-normal">
                No Users Were Found..
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
