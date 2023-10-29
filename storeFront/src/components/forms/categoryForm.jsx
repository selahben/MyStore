import { Input } from "../common/input";
import { useFormik } from "formik";
import Joi from "joi";
import { formikValidateUsingJoi } from "../../utils/formikValidateUsingJoi";
import { useStoreContext } from "../../context/store.context";

export function CategoryForm() {
  const {
    modalFormType,
    categoryToEdit,
    handleNewCategory,
    handleEditCategory,
    handleDeleteCategory,
  } = useStoreContext();

  function handleCategory(values) {
    const category = {
      "title": values.catTitle,
      "className": values.catClassName,
    };
    if (modalFormType === "newCategory") {
      handleNewCategory(category);
    } else if (modalFormType === "editCategory") {
      handleEditCategory(category, categoryToEdit._id);
    }
  }

  const form = useFormik({
    validateOnMount: false,
    initialValues: {
      catTitle: modalFormType === "editCategory" ? categoryToEdit.title : "",
      catClassName:
        modalFormType === "editCategory" ? categoryToEdit.className : "",
    },
    validate: formikValidateUsingJoi({
      catTitle: Joi.string()
        .pattern(/^[A-Za-z][A-Za-z ]*$/)
        .min(2)
        .max(255)
        .required()
        .label("Category Title")
        .messages({
          "string.pattern.base":
            "Category Title can contain only letters and spaces..",
        }),
      catClassName: Joi.string()
        .pattern(/^[a-zA-Z]+$/)
        .min(2)
        .max(255)
        .required()
        .label("Category Class Name")
        .messages({
          "string.pattern.base":
            "Category Classname can contain only letters..",
        }),
    }),
    onSubmit(values) {
      handleCategory(values);
    },
  });

  return (
    <form noValidate>
      <Input
        {...form.getFieldProps("catTitle")}
        label="Category Title"
        type="text"
        placeholder={categoryToEdit ? categoryToEdit.title : ""}
        required
        error={form.touched.catTitle && form.errors.catTitle}
        id="catTitle"
      />
      <Input
        {...form.getFieldProps("catClassName")}
        label="Category Class Name"
        type="text"
        placeholder={categoryToEdit ? categoryToEdit.className : ""}
        required
        error={form.touched.catClassName && form.errors.catClassName}
        id="catClassName"
      />
      <p id="categoryFormBtnP">
        <button
          onClick={form.handleSubmit}
          className="categoryFormBTN btn"
          name="categorySubmit"
          id="categorySubmit"
          type="submit"
          disabled={true && !form.isValid}
        >
          {modalFormType === "newCategory"
            ? "Add your Category"
            : "Submit Changes"}
        </button>
        {modalFormType === "editCategory" && (
          <button
            onClick={(e) => {
              e.preventDefault();
              handleDeleteCategory(categoryToEdit._id);
            }}
            id="categoryDelete"
            type="delete"
            className="categoryDeleteBTN btn"
          >
            Delete Category
          </button>
        )}
      </p>
    </form>
  );
}
