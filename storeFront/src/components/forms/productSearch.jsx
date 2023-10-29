import { useStoreContext } from "../../context/store.context";

export function ProductSearch() {
  const { searchQuery, setSearchQuery, setProductsFilter } = useStoreContext();

  return (
    <div id="productSearchDiv">
      <input
        type="text"
        name="productSearch"
        id="productSearch"
        placeholder="search the store.."
        onChange={(e) => {
          setSearchQuery(e.target.value);
          setProductsFilter("AllProducts");
        }}
        value={searchQuery}
      />
    </div>
  );
}
