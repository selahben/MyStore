import { useEffect, useState } from "react";
import { useStoreContext } from "../../context/store.context";

export function ProductsTableColTitle({ title, sortable = false }) {
  const { productsDataSort, setProductsDataSort } = useStoreContext();
  const [dataSortIcon, setDataSortIcon] = useState(initIcon());

  function initIcon() {
    if (productsDataSort.sortBy === title) {
      return "bi bi-chevron-up";
    } else {
      return "";
    }
  }

  useEffect(() => {
    if (productsDataSort.sortBy === title) {
      if (productsDataSort.sortOrder === "asc") {
        setDataSortIcon("bi bi-chevron-up");
      } else {
        setDataSortIcon("bi bi-chevron-down");
      }
    } else {
      setDataSortIcon("");
    }
  }, [productsDataSort]);

  function handleTitleSelection() {
    if (productsDataSort.sortBy === title) {
      setProductsDataSort({
        ...productsDataSort,
        "sortOrder": productsDataSort.sortOrder === "asc" ? "desc" : "asc",
      });
    } else {
      setProductsDataSort({ "sortBy": title, "sortOrder": "asc" });
    }
  }

  return sortable ? (
    <th className={`pth-${title}`} scope="col">
      <a href="#" onClick={handleTitleSelection}>
        {title}
      </a>
      <a className="ms-2" href="#" onClick={handleTitleSelection}>
        {dataSortIcon ? <i className={dataSortIcon}></i> : ""}
      </a>
    </th>
  ) : (
    <th className={`pth-${title}`} scope="col">
      {title}
    </th>
  );
}
