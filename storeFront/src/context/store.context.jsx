import { useState, useEffect, createContext, useContext } from "react";
import { toast } from "react-toastify";

import {
  addProduct,
  deleteProduct,
  editProduct,
  fetchProducts,
} from "../services/productsServices";
import {
  addCategory,
  deleteCategory,
  editCategory,
  fetchCategories,
} from "../services/categoriesServices";
import {
  changeIsAdmin,
  createUser,
  deleteUser,
  editUser,
  fetchCurrentUser,
  getAllUsers,
  loginUser,
  uploadUserAvatar,
} from "../services/usersServices";
import {
  fetchUserCart,
  addProductToCart,
  changeAmount,
  deleteFromCart,
} from "../services/cartServices";

const contextMustBeUsedError = () => {
  throw new Error(
    "You must use storeContext Provider for Consumer to work properly"
  );
};

export const storeContext = createContext({
  signedIn: null,
  userToEdit: null,
  setUserToEdit: contextMustBeUsedError,
  usersDataSort: null,
  setUsersDataSort: contextMustBeUsedError,
  handleSignedIn: contextMustBeUsedError,
  handleSignOut: contextMustBeUsedError,
  handleDeleteUser: contextMustBeUsedError,
  users: null,
  setUsers: contextMustBeUsedError,
  getUsers: contextMustBeUsedError,
  changeUserAdminStatus: contextMustBeUsedError,
  tokenHeader: null,

  cart: null,
  handleAmountChange: contextMustBeUsedError,
  removeFromCart: contextMustBeUsedError,
  addToCart: contextMustBeUsedError,

  products: null,
  getProducts: contextMustBeUsedError,
  productsFilter: null,
  setProductsFilter: contextMustBeUsedError,
  productsDataSort: null,
  setProductsDataSort: contextMustBeUsedError,
  productToEdit: null,
  setProductToEdit: contextMustBeUsedError,
  handleNewProduct: contextMustBeUsedError,
  handleEditProduct: contextMustBeUsedError,
  handleDeleteProduct: contextMustBeUsedError,
  handleEditUser: contextMustBeUsedError,
  productToQuickview: null,
  searchQuery: null,

  categories: null,
  categoryToEdit: null,
  setCategoryToEdit: contextMustBeUsedError,
  catDataSort: null,
  setCatDataSort: contextMustBeUsedError,

  modalFormType: null,
  setModalFormType: contextMustBeUsedError,
  modalFormError: null,
  setModalFormError: contextMustBeUsedError,
});
storeContext.displayName = "storeContext";

export function StoreProvider({ children }) {
  //STATES//
  //Users
  const [signedIn, setSignedIn] = useState({});
  const [userToEdit, setUserToEdit] = useState(null);
  const [users, setUsers] = useState([]);
  const [usersDataSort, setUsersDataSort] = useState({
    "sortBy": "name",
    "sortOrder": "asc",
  });

  //Cart
  const [cart, setCart] = useState([]);

  //Products
  const [products, setProducts] = useState([]);
  const [productsFilter, setProductsFilter] = useState("AllProducts");
  const [productToEdit, setProductToEdit] = useState(null);
  const [productToQuickview, setProductToQuickview] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [productsDataSort, setProductsDataSort] = useState({
    "sortBy": "name",
    "sortOrder": "asc",
  });

  //Categories
  const [categories, setCategories] = useState([]);
  const [categoryToEdit, setCategoryToEdit] = useState(null);
  const [catDataSort, setCatDataSort] = useState({
    "sortBy": "title",
    "sortOrder": "asc",
  });

  //Modal
  const [modalFormType, setModalFormType] = useState(null);
  const [modalFormError, setModalFormError] = useState("");

  //Current User Token Header
  const [tokenHeader, setTokenHeader] = useState(
    localStorage.getItem("storeCurrentUser")
      ? {
          headers: { "x-auth-token": localStorage.getItem("storeCurrentUser") },
        }
      : null
  );

  //FUNCTIONS//
  //Init Functions
  //Get Products - Init and general use
  useEffect(() => {
    getProducts();
  }, [productsFilter, searchQuery, productsDataSort]);
  //Get Products Function
  async function getProducts() {
    let productsQuery = "";
    if (
      productsFilter !== "AllProducts" ||
      searchQuery !== "" ||
      productsDataSort.length !== 0
    ) {
      productsQuery += "?";
    }
    if (productsFilter !== "AllProducts") {
      productsQuery += `cat=${productsFilter}`;
    }
    if (productsFilter !== "AllProducts" || searchQuery !== "") {
      productsQuery += "&";
    }
    if (searchQuery !== "") {
      productsQuery += `search=${searchQuery}`;
    }
    if (productsFilter !== "AllProducts" || searchQuery !== "") {
      productsQuery += "&";
    }
    if (productsDataSort.length !== 0) {
      productsQuery += `sortBy=${productsDataSort.sortBy}&sortOrder=${productsDataSort.sortOrder}`;
    }
    try {
      const filteredProducts = await fetchProducts(productsQuery);
      setProducts(filteredProducts);
    } catch (err) {
      toast.error(err.response.data);
      return;
    }
  }

  //Get Categories - Init and general use
  useEffect(() => {
    getCategories();
  }, [catDataSort]);
  //Get Categories Function
  async function getCategories() {
    let categoriesQuery = "";

    if (catDataSort.length !== 0) {
      categoriesQuery += `?sortBy=${catDataSort.sortBy}&sortOrder=${catDataSort.sortOrder}`;
    }
    try {
      const filteredCategories = await fetchCategories(categoriesQuery);
      setCategories(filteredCategories);
    } catch (err) {
      toast.error(err.response.data);
    }
  }

  //Get Saved User - Init and general use
  useEffect(() => {
    if (tokenHeader) {
      getCurrentUser();
    }
  }, []);
  //Get Current User function
  async function getCurrentUser() {
    try {
      const fetchedUser = await fetchCurrentUser({
        headers: { "x-auth-token": localStorage.getItem("storeCurrentUser") },
      });
      setModalFormError("");
      setModalFormType(null);
      setSignedIn({
        _id: fetchedUser._id,
        name: fetchedUser.name,
        email: fetchedUser.email,
        phone: fetchedUser.phone,
        image: fetchedUser.image,
        address: fetchedUser.address,
        isAdmin: fetchedUser.isAdmin,
      });
    } catch (err) {
      toast.error(err.response?.data || err);
      handleSignOut();
      setSignedIn({});
      return;
    }
  }

  //Get and Set User Cart  - Init and general use
  useEffect(() => {
    if (Object.keys(signedIn).length !== 0 && signedIn.email !== undefined) {
      getAndSetUserCart();
    }
  }, [signedIn, products]);
  //Get Cart Function
  async function getAndSetUserCart() {
    try {
      let fetchedUserCart = await fetchUserCart(tokenHeader);
      setCart(fetchedUserCart);
    } catch (err) {
      toast.error(err.response.data);
    }
  }

  //Reset Modal Error when changing Modal Form Type
  useEffect(() => {
    setModalFormError("");
    if (modalFormType !== "editProduct") {
      setProductToEdit("");
    }
  }, [modalFormType]);

  //User Functions
  //--------------
  //Handles Sign In/Up (user)
  async function handleSignedIn(user = null) {
    if (modalFormType === "signUp") {
      try {
        await createUser(user);
      } catch (err) {
        setModalFormError(err.response.data);
        return;
      }
    }
    try {
      const token = await loginUser(user);
      localStorage.setItem("storeCurrentUser", token);
      setTokenHeader({ headers: { "x-auth-token": token } });
      await getCurrentUser();
      toast.success("You Registered / Logged In Successfully.");
    } catch (err) {
      setModalFormError(err.response.data);
      return;
    }
  }

  //Handle Sign Out (user)
  function handleSignOut(reason = "") {
    localStorage.removeItem("storeCurrentUser");
    setTokenHeader(null);
    setSignedIn({});
    setCart([]);
    setUsers([]);
    toast.warn(`You Are Signed Out${reason}..`);
  }

  //Handle Edit User (user & admin)
  async function handleEditUser(userId, user) {
    const editedUser = {
      name: user.editedName,
      email: user.editedEmail,
      phone: user.editedPhone,
      image: {
        url: user.editedImageUrl,
        alt: user.editedImageAlt,
      },
      address: {
        state: user.editedAddressState,
        country: user.editedAddressCountry,
        city: user.editedAddressCity,
        street: user.editedAddressStreet,
        houseNumber: user.editedAddressHouseNum,
        zip: user.editedAddressZip,
      },
    };
    if (user.editedPass) {
      editedUser["password"] = user.editedPass;
    }
    try {
      await editUser(userId, editedUser, tokenHeader);
      await uploadUserAvatar(userId, user.editedImageFile, {
        headers: {
          "x-auth-token": localStorage.getItem("storeCurrentUser"),
          "Content-Type": "multipart/form-data",
        },
      });
      await getCurrentUser(tokenHeader);
      if (signedIn.isAdmin) {
        await getUsers();
      }
      setModalFormError("");
      setModalFormType("");
      toast.success("Your Profile was Updated successfully!");
    } catch (err) {
      setModalFormError(err.response.data);
    }
  }

  //Handle Delete User (user & admin)
  async function handleDeleteUser(userId) {
    try {
      const deletedUser = await deleteUser(userId, tokenHeader);
      setModalFormError("");
      setModalFormType("");
      toast.warn("The User was Deleted from the system..");
      if (deletedUser._id === signedIn._id) {
        handleSignOut();
      }
      if (signedIn.isAdmin) {
        getUsers();
      }
    } catch (err) {
      setModalFormError(err.response.data);
    }
  }

  //Get All Users (admin)
  useEffect(() => {
    if (signedIn?.isAdmin) {
      getUsers();
    }
  }, [usersDataSort]);
  //Get Users Function
  async function getUsers() {
    let usersQuery = "";

    if (usersDataSort.length !== 0) {
      usersQuery += `?sortBy=${usersDataSort.sortBy}&sortOrder=${usersDataSort.sortOrder}`;
    }
    try {
      const allUsers = await getAllUsers(usersQuery, tokenHeader);
      setUsers(allUsers);
    } catch (err) {
      toast.error(err.response.data);
    }
  }

  //Change User Admin Status
  async function changeUserAdminStatus(userId, newStatus) {
    if (signedIn._id !== userId) {
      try {
        await changeIsAdmin(userId, newStatus, tokenHeader);
        await getCurrentUser();
      } catch (err) {
        toast.error(err.response.data);
      }
    } else {
      toast.error("You can't change your own status..");
    }
  }

  //Cart Functions
  //--------------
  //Cart: Handle amount change
  async function handleAmountChange(newAmount, _id) {
    try {
      const cart = await changeAmount(_id, newAmount, tokenHeader);
      setCart(cart);
    } catch (err) {
      toast.error(err.response.data);
    }
  }

  //Cart: Handle remove from cart
  async function removeFromCart(_id) {
    try {
      const cart = await deleteFromCart(_id, tokenHeader);
      setCart(cart);
    } catch (err) {
      toast.error(err.response.data);
    }
  }

  //Cart: Add to cart
  async function addToCart(product_id, amount) {
    try {
      const cart = await addProductToCart(product_id, amount, tokenHeader);
      setCart(cart);
    } catch (err) {
      console.log(err.response.data);
    }
  }

  //Product Functions
  //---------------------------------
  //Product: Add
  async function handleNewProduct(newProduct) {
    try {
      await addProduct(newProduct, tokenHeader);
      await getProducts();
      setModalFormType(null);
      setModalFormError("");
      toast.success("The Product was successfully Added!");
    } catch (err) {
      setModalFormError(err.response.data);
    }
  }

  //Product: Edit
  async function handleEditProduct(editedProduct, productId) {
    try {
      await editProduct(productId, editedProduct, tokenHeader);
      toast.success("Product was updated successfully!");
      await getProducts();
      setModalFormType(null);
      setModalFormError("");
    } catch (err) {
      setModalFormError(err.response.data);
    }
  }

  //Product: Delete
  async function handleDeleteProduct(productId) {
    try {
      await removeFromCart(productId);
      await deleteProduct(productId, tokenHeader);
      await getProducts();
      setModalFormType(null);
      setModalFormError("");
      toast.warn("The Product was successfully Deleted..");
    } catch (err) {
      toast.error(err.response.data);
    }
  }

  //Category Functions
  //------------------
  //Category: Add
  async function handleNewCategory(newCategory) {
    try {
      await addCategory(newCategory, tokenHeader);
      getCategories();
      setModalFormType(null);
      setModalFormError("");
      toast.success("The Category was successfully Added!");
    } catch (err) {
      setModalFormError(err.response.data);
    }
  }

  //Category: Edit
  async function handleEditCategory(editedCategory, categoryId) {
    try {
      await editCategory(categoryId, editedCategory, tokenHeader);
      toast.success("Category was updated successfully!");
      getProducts();
      getCategories();
      setModalFormType(null);
      setModalFormError("");
    } catch (err) {
      setModalFormError(err.response.data);
    }
  }

  //Category: Delete
  async function handleDeleteCategory(categoryId) {
    try {
      await deleteCategory(categoryId, tokenHeader);
      getProducts();
      getCategories();
      setModalFormType(null);
      setModalFormError("");
      toast.warn("The Category was successfully Deleted..");
    } catch (err) {
      setModalFormError(err.response.data);
    }
  }

  return (
    <storeContext.Provider
      value={{
        signedIn,
        userToEdit,
        setUserToEdit,
        usersDataSort,
        setUsersDataSort,
        users,
        getUsers,
        handleSignedIn,
        handleSignOut,
        handleEditUser,
        handleDeleteUser,
        changeUserAdminStatus,

        cart,
        handleAmountChange,
        removeFromCart,
        addToCart,

        products,
        productToEdit,
        setProductToEdit,
        productsDataSort,
        setProductsDataSort,
        productsFilter,
        setProductsFilter,
        handleNewProduct,
        handleEditProduct,
        handleDeleteProduct,
        productToQuickview,
        setProductToQuickview,
        searchQuery,
        setSearchQuery,

        categories,
        catDataSort,
        setCatDataSort,
        categoryToEdit,
        setCategoryToEdit,
        handleNewCategory,
        handleEditCategory,
        handleDeleteCategory,

        modalFormType,
        setModalFormType,
        modalFormError,
        setModalFormError,
      }}
    >
      {children}
    </storeContext.Provider>
  );
}

export const useStoreContext = () => {
  return useContext(storeContext);
};
