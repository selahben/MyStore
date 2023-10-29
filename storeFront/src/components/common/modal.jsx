import { useStoreContext } from "../../context/store.context";

export function Modal({ modalTitle, children }) {
  const {
    modalFormType,
    setModalFormType,
    modalFormError,
    setProductToEdit,
    setCategoryToEdit,
    setUserToEdit,
  } = useStoreContext();

  function initModalContent() {
    setModalFormType(null);
    setProductToEdit(null);
    setCategoryToEdit(null);
    setUserToEdit(null);
  }

  return (
    <div id="modalOuterFrame">
      <div
        id={
          modalFormType === "quickview"
            ? "modalQuickInnerFrame"
            : "modalInnerFrame"
        }
      >
        <button onClick={() => setModalFormType(null)} id="closeModalBTN">
          <i className="bi bi-x"></i>
        </button>
        <h3>{modalTitle}</h3>
        {children}
        {modalFormError && (
          <p id="modalFormError" className="alert alert-danger">
            {modalFormError}
          </p>
        )}
      </div>
    </div>
  );
}
