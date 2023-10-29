import { useStoreContext } from "../../context/store.context";

export function CategoriesTableRow({ category }) {
  const { setCategoryToEdit, setModalFormType } = useStoreContext();

  //Opening the edit product modal
  function setEditCategory() {
    setModalFormType("editCategory");
    setCategoryToEdit(category);
  }

  return (
    <tr>
      <td className="adminCategoryTD adminCategoryTitle">{category.title}</td>
      <td className="adminCategoryTD adminCategoryClassName">
        {category.className}
      </td>
      <td className="adminCategoryTD adminCategoryMain">
        {String(category.main)}
      </td>
      <td className="adminProductTD adminProductEdit text-center">
        <button
          className="btn editBTN btn-primary pb-0"
          onClick={setEditCategory}
        >
          <i className="bi bi-pencil-square"></i>
        </button>
      </td>
    </tr>
  );
}
