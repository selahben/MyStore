import { useStoreContext } from "../../context/store.context";

export function ProductsTableRow({ product }) {
  const { setProductToEdit, setModalFormType } = useStoreContext();

  //Opening the edit product modal
  function setEditProduct() {
    setModalFormType("editProduct");
    setProductToEdit(product);
  }

  return (
    <tr>
      <td className="adminProductTD adminProductImg">
        <img src={product.image.url} alt={product.image.alt} />
      </td>
      <td className="adminProductTD adminProductSN">{product.sn}</td>
      <td className="adminProductTD adminProductName">{product.name}</td>
      <td className="adminProductTD adminProductDesc">{product.description}</td>
      <td className="adminProductTD adminProductPrice">{product.price}</td>
      <td className="adminProductTD adminProductCat">
        {product.category.title}
      </td>
      <td className="adminProductTD adminProductTags">{product.tags}</td>
      <td className="adminProductTD adminProductEdit text-center">
        <button
          className="btn editBTN btn-primary pb-0"
          onClick={setEditProduct}
        >
          <i className="bi bi-pencil-square"></i>
        </button>
      </td>
    </tr>
  );
}
