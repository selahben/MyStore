import { useEffect, useState } from "react";
import { useStoreContext } from "../../context/store.context";

export function UsersTableColTitle({ title, sortable = false }) {
  const { usersDataSort, setUsersDataSort } = useStoreContext();
  const [dataSortIcon, setDataSortIcon] = useState(initIcon());

  function initIcon() {
    if (usersDataSort.sortBy === title) {
      return "bi bi-chevron-up";
    } else {
      return "";
    }
  }

  useEffect(() => {
    if (usersDataSort.sortBy === title) {
      if (usersDataSort.sortOrder === "asc") {
        setDataSortIcon("bi bi-chevron-up");
      } else {
        setDataSortIcon("bi bi-chevron-down");
      }
    } else {
      setDataSortIcon("");
    }
  }, [usersDataSort]);

  function handleTitleSelection() {
    if (usersDataSort.sortBy === title) {
      setUsersDataSort({
        ...usersDataSort,
        "sortOrder": usersDataSort.sortOrder === "asc" ? "desc" : "asc",
      });
    } else {
      setUsersDataSort({ "sortBy": title, "sortOrder": "asc" });
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
