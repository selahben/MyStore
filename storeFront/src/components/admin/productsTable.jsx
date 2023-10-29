import { useStoreContext } from "../../context/store.context";
import { ProductsTableColTitle } from "./productsTableColTitle";
import { ProductsTableRow } from "./productsTableRow";

export function ProductsTable() {
  const { products } = useStoreContext();

  return (
    <div id="productsTableWrapper" className="table-responsive">
      <table id="productsTable" className="table table-bordered table-striped">
        <thead>
          <tr>
            <th scope="col"></th>
            <ProductsTableColTitle title="sn" sortable={true} />
            <ProductsTableColTitle title="name" sortable={true} />
            <ProductsTableColTitle title="description" />
            <ProductsTableColTitle title="price" sortable={true} />
            <ProductsTableColTitle title="category" sortable={true} />
            <ProductsTableColTitle title="tags" />
            <th scope="col" className="text-center">
              Edit \ Delete
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <ProductsTableRow key={product.sn} product={product} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
