import { useStoreContext } from "../../context/store.context";

export function SignOut() {
  const { handleSignOut } = useStoreContext();
  return (
    <>
      <button
        onClick={() => {
          handleSignOut();
        }}
        className="btn text-decoration-underline dropdown-item"
        id="userSignOut"
      >
        Sign Out
      </button>
    </>
  );
}
