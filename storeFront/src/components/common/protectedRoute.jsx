import { Navigate } from "react-router-dom";
import { useStoreContext } from "../../context/store.context";

export function ProtectedRoute({ children }) {
  const { signedIn } = useStoreContext();

  if (!signedIn.isAdmin) {
    return <Navigate to="/" />;
  }
  return children;
}
