import { useFormik } from "formik";
import Joi from "joi";
import { Input } from "../common/input";
import { formikValidateUsingJoi } from "../../utils/formikValidateUsingJoi";
import { useStoreContext } from "../../context/store.context";
import { toast } from "react-toastify";
import { forgotPass } from "../../services/usersServices";

export function ForgotPassForm() {
  const { setModalFormType, setModalFormError } = useStoreContext();
  const form = useFormik({
    validateOnMount: false,
    initialValues: {
      signInEmail: "",
    },
    validate: formikValidateUsingJoi({
      signInEmail: Joi.string()
        .min(6)
        .max(255)
        .required()
        .email({ tlds: { allow: false } })
        .messages({
          "string.empty": `Email field cannot be empty..`,
          "string.min": `Email field should have a minimum length of {#limit}..`,
          "string.email": `Email field must contain a valid email..`,
          "any.required": `Email field is a required..`,
        }),
    }),
    onSubmit(values) {
      handleForgotPass();
      async function handleForgotPass() {
        try {
          await forgotPass(values.signInEmail);
          setModalFormType("");
          setModalFormError("");
          toast.success("Check your mail for the Reset Password Link!");
        } catch (err) {
          setModalFormError(err.response.data);
        }
      }
    },
  });

  return (
    <>
      <form id="forgotPassForm" onSubmit={form.handleSubmit} noValidate>
        <Input
          {...form.getFieldProps("signInEmail")}
          label="Email"
          type="email"
          placeholder="Your Email.."
          required
          error={form.touched.signInEmail && form.errors.signInEmail}
          id="signInEmail"
          autoComplete="email"
        />
        <p>
          <button
            className="signSubmit btn"
            name="signInSubmit"
            id="signInSubmit"
            type="submit"
            disabled={true && !form.isValid}
          >
            Submit
          </button>
        </p>
      </form>
    </>
  );
}
