import { Header } from "./general/header";
import { Main } from "./products/main";
import { Footer } from "./general/footer";
import { Modal } from "./common/modal";
import { SignUpForm } from "./forms/signUpForm";
import { SignInForm } from "./forms/signInForm";
import { ProductForm } from "./forms/productForm";
import { ProductQuickview } from "./products/productQuickview";
import { EditUserForm } from "./forms/editUserForm";
import { CategoryForm } from "./forms/categoryForm";
import { ForgotPassForm } from "./forms/forgotPassForm";
import { ResetPassForm } from "./forms/resetPassForm";

import { Routes, Route } from "react-router-dom";
import { About } from "./general/about";
import { useStoreContext } from "../context/store.context";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, Zoom } from "react-toastify";
import { AdminPanel } from "./general/adminPanel";
import { ProtectedRoute } from "./common/protectedRoute";

//import background from "../../public/Imgs/shoppingCartsBG-1.jpg";

const MAIN_BG = process.env.PUBLIC_URL + "/Imgs/shoppingCartsBG-1.jpg";

export function Store() {
  const { modalFormType } = useStoreContext();

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Zoom}
      />
      <Header />
      <section
        className="d-flex flex-fill flex-column"
        id="main"
        style={{
          backgroundImage: `url(${MAIN_BG}`,
        }}
      >
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="about" element={<About />} />
          <Route path="reset-password/:token" element={<ResetPassForm />} />
          <Route
            path="admin_panel"
            element={
              <ProtectedRoute>
                <AdminPanel />
              </ProtectedRoute>
            }
          />
        </Routes>
      </section>

      {modalFormType && (
        <Modal
          modalTitle={
            modalFormType === "signIn"
              ? "Sign In"
              : modalFormType === "signUp"
              ? "Sign Up"
              : modalFormType === "newProduct"
              ? "Add New Product"
              : modalFormType === "editProduct"
              ? "Edit Product"
              : modalFormType === "editUser"
              ? "Edit Your Profile"
              : modalFormType === "newCategory"
              ? "Add New Category"
              : modalFormType === "editCategory"
              ? "Edit Category"
              : modalFormType === "forgotPass"
              ? "Forgot Password"
              : ""
          }
        >
          {modalFormType === "signUp" && <SignUpForm />}
          {modalFormType === "signIn" && <SignInForm />}
          {modalFormType === "newProduct" && <ProductForm />}
          {modalFormType === "editProduct" && <ProductForm />}
          {modalFormType === "quickview" && <ProductQuickview />}
          {modalFormType === "editUser" && <EditUserForm />}
          {modalFormType === "newCategory" && <CategoryForm />}
          {modalFormType === "editCategory" && <CategoryForm />}
          {modalFormType === "forgotPass" && <ForgotPassForm />}
        </Modal>
      )}
      <Footer />
    </>
  );
}
