import { useFormik } from "formik";
import Joi from "joi";
import { toast } from "react-toastify";

import { Input } from "../common/input";
import { formikValidateUsingJoi } from "../../utils/formikValidateUsingJoi";
import { useStoreContext } from "../../context/store.context";

export function EditUserForm() {
  const { signedIn, handleEditUser, handleDeleteUser, userToEdit } =
    useStoreContext();

  const form = useFormik({
    validateOnMount: false,
    initialValues: {
      editedName: signedIn.name && userToEdit.name,
      editedEmail: signedIn.email && userToEdit.email,
      editedPass: "",
      editedPhone: signedIn.phone && userToEdit.phone,
      editedImageUrl: signedIn.image.url && userToEdit.image.url,
      editedImageFile: undefined,
      editedImageAlt: signedIn.image.alt && userToEdit.image.alt,
      editedAddressState: signedIn.address.state && userToEdit.address.state,
      editedAddressCountry:
        signedIn.address.country && userToEdit.address.country,
      editedAddressCity: signedIn.address.city && userToEdit.address.city,
      editedAddressStreet: signedIn.address.street && userToEdit.address.street,
      editedAddressHouseNum:
        signedIn.address.houseNumber && userToEdit.address.houseNumber,
      editedAddressZip: signedIn.address.zip && userToEdit.address.zip,
    },
    validate: formikValidateUsingJoi({
      editedName: Joi.string()
        .min(2)
        .max(255)
        .required()
        .messages({
          "string.empty": `Name field cannot be empty..`,
          "string.min": `Name field should have a minimum length of {#limit}..`,
          "any.required": `Name field is a required..`,
        })
        .label("Name"),
      editedEmail: Joi.string()
        .min(6)
        .max(255)
        .required()
        .email({ tlds: { allow: false } })
        .messages({
          "string.empty": `Email field cannot be empty..`,
          "string.min": `Email field should have a minimum length of {#limit}..`,
          "string.email": `Email field must contain a valid email..`,
          "any.required": `Email field is a required..`,
        })
        .label("Email"),
      editedPass: Joi.string()
        .min(8)
        .max(1024)
        .optional()
        .pattern(
          /^(?=(?:[^A-Z]*[A-Z]))(?=(?:[^a-z]*[a-z]))(?=(?:[^!@#$%^&*]*[!@#$%^&*]))(?=(?:\D*\d){4}).{8,}$/
        )
        .messages({
          "string.empty": `Password field cannot be empty..`,
          "string.min": `Password field should have a minimum length of {#limit}..`,
          "any.required": `Password field is a required..`,
          "string.pattern.base":
            "Password must be,at least, 8 characters long and contain: 1 uppercase letter, 1 lowercase letter, at least 4 digits and 1 special character (!@#$%^&*).",
        })
        .allow(null, "")
        .label("Password"),
      editedPhone: Joi.string()
        .min(10)
        .max(12)
        .pattern(/^\+?\d{3}\d{8,9}$/)
        .optional()
        .messages({
          "string.empty": `Phone field cannot be empty..`,
          "string.min": `Phone field should have a minimum length of {#limit}..`,
          "any.required": `Phone field is a required..`,
          "string.pattern.base":
            "Phone must be between 10-12 digits, and of this pattern: [+]972505555555",
        })
        .allow(null, "")
        .label("Phone"),
      editedImageUrl: Joi.string().min(11).max(1024).allow(null, ""),
      editedImageFile: Joi.any(),
      editedImageAlt: Joi.string().min(6).max(255).allow(null, ""),
      editedAddressState: Joi.string().optional().allow(null, ""),
      editedAddressCountry: Joi.string()
        .optional()
        .min(3)
        .max(255)
        .allow(null, ""),
      editedAddressCity: Joi.string()
        .optional()
        .min(6)
        .max(255)
        .allow(null, ""),
      editedAddressStreet: Joi.string()
        .optional()
        .min(3)
        .max(255)
        .allow(null, ""),
      editedAddressHouseNum: Joi.string()
        .optional()
        .min(1)
        .max(10)
        .allow(null, ""),
      editedAddressZip: Joi.string().min(0).optional().max(12).allow(null, ""),
    }),
    onSubmit(values) {
      try {
        handleEditUser(userToEdit._id, values);
      } catch (err) {
        toast.error(err.response.data);
      }
    },
  });

  return (
    <>
      <form
        id="editUserForm"
        onSubmit={form.handleSubmit}
        noValidate
        encType="multipart/form-data"
      >
        <Input
          {...form.getFieldProps("editedName")}
          label="Full Name"
          type="text"
          placeholder="Your Name.."
          required
          error={form.touched.editedName && form.errors.editedName}
          id="editedName"
        />
        <Input
          {...form.getFieldProps("editedEmail")}
          label="Email"
          type="email"
          placeholder="Your Email.."
          required
          error={form.touched.editedEmail && form.errors.editedEmail}
          id="editedEmail"
        />
        <Input
          {...form.getFieldProps("editedPhone")}
          label="Phone"
          type="text"
          placeholder="Your Phone.."
          error={form.touched.editedPhone && form.errors.editedPhone}
          id="editedPhone"
        />
        <Input
          {...form.getFieldProps("editedPass")}
          label="New Password"
          type="password"
          placeholder="Your New Password.."
          error={form.touched.editedPass && form.errors.editedPass}
          id="editedPass"
        />
        <input
          type="file"
          accept="image/*"
          name="editedImageFile"
          id="editedImageFile"
          onChange={(event) => {
            form.setFieldValue("editedImageFile", event.currentTarget.files[0]);
          }}
        />
        <Input
          {...form.getFieldProps("editedImageUrl")}
          label="Image Url"
          type="text"
          placeholder="Your Image.."
          error={form.touched.editedImageUrl && form.errors.editedImageUrl}
          id="editedImageUrl"
        />
        <Input
          {...form.getFieldProps("editedImageAlt")}
          label="Image Alternative Text"
          type="text"
          placeholder="Image Alternative Text.."
          error={form.touched.editedImageAlt && form.errors.editedImageAlt}
          id="editedImageAlt"
        />
        <p className="text-danger mt-3 mb-0">
          Attention! Your Address info is required for shipping!
        </p>
        <Input
          {...form.getFieldProps("editedAddressState")}
          label="State"
          type="text"
          placeholder="Your State.."
          error={
            form.touched.editedAddressState && form.errors.editedAddressState
          }
          id="editedAddressState"
        />
        <Input
          {...form.getFieldProps("editedAddressCountry")}
          label="Country"
          type="text"
          placeholder="Your Country.."
          error={
            form.touched.editedAddressCountry &&
            form.errors.editedAddressCountry
          }
          id="editedAddressCountry"
        />
        <Input
          {...form.getFieldProps("editedAddressCity")}
          label="City"
          type="text"
          placeholder="Your City.."
          error={
            form.touched.editedAddressCity && form.errors.editedAddressCity
          }
          id="editedAddressCity"
        />
        <Input
          {...form.getFieldProps("editedAddressStreet")}
          label="Street"
          type="text"
          placeholder="Your Street.."
          error={
            form.touched.editedAddressStreet && form.errors.editedAddressStreet
          }
          id="editedAddressStreet"
        />
        <Input
          {...form.getFieldProps("editedAddressHouseNum")}
          label="House Number"
          type="text"
          placeholder="Your House Number.."
          error={
            form.touched.editedAddressHouseNum &&
            form.errors.editedAddressHouseNum
          }
          id="editedAddressHouseNum"
        />
        <Input
          {...form.getFieldProps("editedAddressZip")}
          label="Zip Code"
          type="text"
          placeholder="Your Zip Code.."
          required
          error={form.touched.editedAddressZip && form.errors.editedAddressZip}
          id="editeeditedAddressZipdPass"
        />
        <p>
          <button
            className="formSubmit btn"
            name="editUserSubmit"
            id="editUserSubmit"
            type="submit"
            disabled={true && !form.isValid}
          >
            Submit Changes
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              handleDeleteUser(userToEdit.id || userToEdit._id);
            }}
            id="userDelete"
            type="delete"
            className="userDeleteBTN btn"
          >
            Delete User
          </button>
        </p>
      </form>
    </>
  );
}
