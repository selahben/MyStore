import { useStoreContext } from "../../context/store.context";
import { CategoriesTableColTitle } from "./categoriesTableColTitle";
import { CategoriesTableRow } from "./categoriesTableRow";

export function CategoriesTable() {
  const { categories } = useStoreContext();

  return (
    <div id="categoriesTableWrapper" className="table-responsive">
      <table
        id="categoriesTable"
        className="table table-bordered table-striped"
      >
        <thead>
          <tr>
            <CategoriesTableColTitle title="title" sortable={true} />
            <CategoriesTableColTitle title="className" sortable={true} />
            <CategoriesTableColTitle title="main" sortable={true} />
            <th scope="col" className="text-center">
              Edit \ Delete
            </th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category, index) => (
            <CategoriesTableRow key={`category${index}`} category={category} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
