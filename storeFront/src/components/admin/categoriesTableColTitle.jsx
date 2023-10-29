import { useEffect, useState } from "react";
import { useStoreContext } from "../../context/store.context";

export function CategoriesTableColTitle({ title, sortable = false }) {
  const { catDataSort, setCatDataSort } = useStoreContext();
  const [dataSortIcon, setDataSortIcon] = useState(initIcon());

  function initIcon() {
    if (catDataSort.sortBy === title) {
      return "bi bi-chevron-up";
    } else {
      return "";
    }
  }

  useEffect(() => {
    if (catDataSort.sortBy === title) {
      if (catDataSort.sortOrder === "asc") {
        setDataSortIcon("bi bi-chevron-up");
      } else {
        setDataSortIcon("bi bi-chevron-down");
      }
    } else {
      setDataSortIcon("");
    }
  }, [catDataSort]);

  function handleTitleSelection() {
    if (catDataSort.sortBy === title) {
      setCatDataSort({
        ...catDataSort,
        "sortOrder": catDataSort.sortOrder === "asc" ? "desc" : "asc",
      });
    } else {
      setCatDataSort({ "sortBy": title, "sortOrder": "asc" });
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
