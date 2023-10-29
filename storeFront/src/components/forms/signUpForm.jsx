import { useFormik } from "formik";
import Joi from "joi";
import { Input } from "../common/input";
import { formikValidateUsingJoi } from "../../utils/formikValidateUsingJoi";
import { useStoreContext } from "../../context/store.context";

export function SignUpForm() {
  const { handleSignedIn, setModalFormType } = useStoreContext();

  const form = useFormik({
    validateOnMount: false,
    initialValues: {
      signUpName: "",
      signUpEmail: "",
      signUpPass: "",
    },
    validate: formikValidateUsingJoi({
      signUpName: Joi.string().min(2).max(255).required().messages({
        "string.empty": `Name field cannot be empty..`,
        "string.min": `Name field should have a minimum length of {#limit}..`,
        "any.required": `Name field is a required..`,
      }),
      signUpEmail: Joi.string()
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
      signUpPass: Joi.string()
        .min(6)
        .max(1024)
        .required()
        .pattern(
          /^(?=(?:[^A-Z]*[A-Z]))(?=(?:[^a-z]*[a-z]))(?=(?:[^!@#$%^&*]*[!@#$%^&*]))(?=(?:\D*\d){4}).{8,}$/
        )
        .messages({
          "string.empty": `Password field cannot be empty..`,
          "string.min": `Password field should have a minimum length of {#limit}..`,
          "any.required": `Password field is a required..`,
          "string.pattern.base":
            "Password must be,at least, 8 characters long and contain: 1 uppercase letter, 1 lowercase letter, at least 4 digits and 1 special character (!@#$%^&*).",
        }),
    }),
    onSubmit(values) {
      handleSignedIn(
        {
          "name": values.signUpName,
          "email": values.signUpEmail,
          "password": values.signUpPass,
        },
        "signUp"
      );
    },
  });

  return (
    <>
      <form id="signUpForm" onSubmit={form.handleSubmit} noValidate>
        <Input
          {...form.getFieldProps("signUpName")}
          label="Full Name"
          type="text"
          placeholder="Your Name.."
          required
          error={form.touched.signUpName && form.errors.signUpName}
          id="signUpName"
        />
        <Input
          {...form.getFieldProps("signUpEmail")}
          label="Email"
          type="email"
          placeholder="Your Email.."
          required
          error={form.touched.signUpEmail && form.errors.signUpEmail}
          id="signUpEmail"
        />
        <Input
          {...form.getFieldProps("signUpPass")}
          label="Password"
          type="password"
          placeholder="Your Password.."
          required
          error={form.touched.signUpPass && form.errors.signUpPass}
          id="signUpPass"
        />
        <p>
          <button
            className="signSubmit btn"
            name="signUpSubmit"
            id="signUpSubmit"
            type="submit"
            disabled={true && !form.isValid}
          >
            Sign Up
          </button>
        </p>
      </form>
      <p className="signUpInChangeP">
        Already have an account?
        <button
          onClick={() => setModalFormType("signIn")}
          className="signUpInChange btn"
          id="signInChange"
        >
          Sign In!
        </button>
      </p>
    </>
  );
}
