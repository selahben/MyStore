import { Input } from "../common/input";
import { useFormik } from "formik";
import Joi from "joi";
import { formikValidateUsingJoi } from "../../utils/formikValidateUsingJoi";
import { Select } from "../common/select";
import { useStoreContext } from "../../context/store.context";
import { ImageSearch } from "../common/imageSearch";
import { useEffect, useState } from "react";

export function ProductForm() {
  const {
    modalFormType,
    productToEdit,
    handleDeleteProduct,
    handleEditProduct,
    handleNewProduct,
    categories,
  } = useStoreContext();

  const catClasses = categories.map((category) => category.className);

  const [checkedImage, setCheckedImage] = useState(
    modalFormType === "editProduct" ? productToEdit.image.url : ""
  );

  useEffect(() => {
    form.setFieldValue("productImage", checkedImage);
    //form.values.productImage = checkedImage;
  }, [checkedImage]);

  function handleProduct(values) {
    if (modalFormType === "newProduct") {
      handleNewProduct(values);
    } else if (modalFormType === "editProduct") {
      handleEditProduct(values, productToEdit._id);
    }
  }

  const form = useFormik({
    validateOnMount: false,
    initialValues: {
      productSN: modalFormType === "editProduct" ? productToEdit.sn : "",
      productName: modalFormType === "editProduct" ? productToEdit.name : "",
      productDescription:
        modalFormType === "editProduct" ? productToEdit.description : "",
      productImage:
        modalFormType === "editProduct" ? productToEdit.image.url : "",
      productPrice: modalFormType === "editProduct" ? productToEdit.price : "",
      productUnit: modalFormType === "editProduct" ? productToEdit.unit : "KG",
      productCategory:
        modalFormType === "editProduct"
          ? productToEdit.category.className
          : categories[1].className,
      productVals:
        modalFormType === "editProduct" ? productToEdit.nutritionVals : "",
      productIngredients:
        modalFormType === "editProduct" ? productToEdit.ingredients : "",
      productTags: modalFormType === "editProduct" ? productToEdit.tags : "",
    },
    validate: formikValidateUsingJoi({
      productSN:
        modalFormType === "newProduct"
          ? Joi.number().min(100).required().label("Product Serial Number")
          : Joi.number()
              .min(100)
              .required()
              .valid(Number(productToEdit.sn))
              .label("Product Serial Number"),
      productName: Joi.string()
        .min(2)
        .max(255)
        .required()
        .label("Product Name"),
      productDescription: Joi.string()
        .min(10)
        .max(255)
        .required()
        .label("Product Description"),
      productImage: Joi.string()
        .pattern(/(https?:\/\/.*\.(?:png|jpg))/i)
        .min(10)
        .max(255)
        .required()
        .label("Product Image")
        .messages({
          "string.pattern.base": '"Product Image" must contain a valid link',
        }),
      productPrice: Joi.number().min(0).required().label("Product Price"),
      productUnit: Joi.string()
        .valid("KG", "Units")
        .required()
        .label("Product Unit"),
      productCategory: Joi.string()
        .valid(...catClasses)
        .required()
        .label("Product Category"),
      productVals: Joi.string()
        .min(2)
        .max(255)
        .optional()
        .allow(null, "")
        .label("Product Nutritional Values"),
      productIngredients: Joi.string()
        .min(2)
        .max(255)
        .optional()
        .allow(null, "")
        .label("Product Ingredients"),
      productTags: Joi.string()
        .min(2)
        .max(255)
        .required()
        .label("Product Tags"),
    }),
    onSubmit(values) {
      handleProduct(values);
    },
  });

  return (
    <form noValidate>
      <Input
        {...form.getFieldProps("productSN")}
        label="Product Serial Number"
        type="number"
        placeholder={
          modalFormType === "editProduct" && productToEdit
            ? productToEdit.sn
            : ""
        }
        style={modalFormType === "editProduct" ? { color: "#00000060" } : null}
        required
        error={form.touched.productSN && form.errors.productSN}
        id="productSN"
        readOnly={modalFormType === "editProduct" ? true : false}
        min="0"
      />
      <Input
        {...form.getFieldProps("productName")}
        label="Product Name"
        type="text"
        placeholder={productToEdit ? productToEdit.name : ""}
        required
        error={form.touched.productName && form.errors.productName}
        id="productName"
      />
      <Input
        {...form.getFieldProps("productDescription")}
        label="Product Description"
        type="text"
        placeholder={productToEdit ? productToEdit.description : ""}
        required
        error={
          form.touched.productDescription && form.errors.productDescription
        }
        id="productDescription"
      />
      <div id="productImageDisplay">
        <img
          src={
            form.values.productImage ||
            productToEdit.image?.url ||
            process.env.PUBLIC_URL + "/Imgs/productPlaceholderImage.png"
          }
          alt={form.values.productName}
          width={"100%"}
          height={"150px"}
          style={{ objectFit: "cover" }}
        />
      </div>
      <Input
        {...form.getFieldProps("productImage")}
        label="Product Image (URL)"
        type="url"
        placeholder={productToEdit ? productToEdit.image.url : ""}
        required
        error={form.touched.productImage && form.errors.productImage}
        id="productImage"
      />
      <ImageSearch
        checkedImage={checkedImage}
        setCheckedImage={setCheckedImage}
      />
      <Input
        {...form.getFieldProps("productPrice")}
        label="Product Price"
        type="number"
        placeholder={
          modalFormType === "editProduct" && productToEdit
            ? productToEdit.price
            : ""
        }
        required
        error={form.touched.productPrice && form.errors.productPrice}
        id="productPrice"
        min="0"
      />
      <Select
        {...form.getFieldProps("productUnit")}
        options={[
          { value: "KG", text: "KG" },
          { value: "Units", text: "Units" },
        ]}
        label="Sold By"
        required
        error={form.touched.productUnit && form.errors.productUnit}
        id="productUnit"
      />
      <Select
        {...form.getFieldProps("productCategory")}
        options={categories
          .filter((category) => category.className !== "AllProducts")
          .map((category) => {
            return { value: category.className, text: category.title };
          })}
        label="Category"
        required
        error={form.touched.productCategory && form.errors.productCategory}
        id="productCategory"
      />
      <Input
        {...form.getFieldProps("productVals")}
        label="Product Nutritional Values"
        type="text"
        placeholder={productToEdit ? productToEdit.nutritionVals : ""}
        error={form.touched.productVals && form.errors.productVals}
        id="productVals"
      />
      <Input
        {...form.getFieldProps("productIngredients")}
        label="Product Ingredients"
        type="text"
        placeholder={productToEdit ? productToEdit.ingredients : ""}
        error={
          form.touched.productIngredients && form.errors.productIngredients
        }
        id="productIngredients"
      />
      <Input
        {...form.getFieldProps("productTags")}
        label="Product Tags"
        type="text"
        placeholder={productToEdit ? productToEdit.tags : ""}
        required
        error={form.touched.productTags && form.errors.productTags}
        id="productTags"
      />
      <p id="productFormBtnP">
        <button
          onClick={form.handleSubmit}
          className="productFormBTN btn"
          name="productSubmit"
          id="productSubmit"
          type="submit"
          disabled={true && !form.isValid}
        >
          {modalFormType === "newProduct"
            ? "Add your Product"
            : "Submit Changes"}
        </button>
        {modalFormType === "editProduct" && (
          <button
            onClick={(e) => {
              e.preventDefault();
              handleDeleteProduct(productToEdit._id);
            }}
            id="productDelete"
            type="delete"
            className="productDeleteBTN btn"
          >
            Delete Product
          </button>
        )}
      </p>
    </form>
  );
}
