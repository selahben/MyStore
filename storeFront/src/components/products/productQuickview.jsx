import { useStoreContext } from "../../context/store.context";

export function ProductQuickview() {
  const { productToQuickview } = useStoreContext();

  const {
    sn,
    name,
    category,
    image,
    description,
    price,
    unit,
    tags,
    ingredients,
    nutritionVals,
  } = productToQuickview;

  return (
    <div id="productQuickview" className="d-flex container row m-0 pt-2">
      <div className="col-12 col-sm-6">
        <h3 className="productTitle text-center text-sm-start mb-4 fs-1 mt-4 mt-ms-0">
          {name}
        </h3>

        <p className="productDesc mb-4">{description}</p>
        <p className="productPrice fw-bold fs-4">
          Price: {price}$ for 1 {unit}
        </p>
        <p>
          <span className="fw-bold">Category:</span> {category.title}
        </p>
        <p>
          <span className="fw-bold">Tags:</span> {tags}
        </p>
        <p>
          <span className="fw-bold">SN:</span> {sn}
        </p>
        <p>
          <span className="fw-bold">Ingredients:</span> {ingredients}
        </p>
        <p>
          <span className="fw-bold">Nutritional Values:</span> {nutritionVals}
        </p>
      </div>
      <div className="col-12 col-sm-6">
        <img
          className="productImg rounded-3"
          src={image?.url}
          alt={image?.alt}
        />
      </div>
    </div>
  );
}
