import { useStoreContext } from "../../context/store.context";

export function SignUp() {
  const { setModalFormType } = useStoreContext();

  return (
    <>
      <button
        onClick={() => setModalFormType("signUp")}
        className="btn text-decoration-underline"
        id="userSignUp"
      >
        Sign Up
      </button>
    </>
  );
}
