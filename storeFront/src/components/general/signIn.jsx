import { useStoreContext } from "../../context/store.context";

export function SignIn() {
  const { setModalFormType } = useStoreContext();
  return (
    <>
      <button
        onClick={() => setModalFormType("signIn")}
        className="btn text-decoration-underline"
        id="userSignIn"
      >
        Sign In
      </button>
    </>
  );
}
