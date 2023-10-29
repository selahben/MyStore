import { useFormik } from "formik";
import Joi from "joi";
import { Input } from "../common/input";
import { formikValidateUsingJoi } from "../../utils/formikValidateUsingJoi";
import { useStoreContext } from "../../context/store.context";

export function SignInForm() {
  const { handleSignedIn, setModalFormType } = useStoreContext();
  const form = useFormik({
    validateOnMount: false,
    initialValues: {
      signInEmail: "",
      signInPass: "",
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
      signInPass: Joi.string()
        .min(8)
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
        { "email": values.signInEmail, password: values.signInPass },
        "signIn"
      );
    },
  });

  return (
    <>
      <form id="signInForm" onSubmit={form.handleSubmit} noValidate>
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
        <Input
          {...form.getFieldProps("signInPass")}
          label="Password"
          type="password"
          placeholder="Your Password.."
          required
          error={form.touched.signInPass && form.errors.signInPass}
          id="signInPass"
          autoComplete="current-password"
        />
        <p>
          <button
            className="signSubmit btn"
            name="signInSubmit"
            id="signInSubmit"
            type="submit"
            disabled={true && !form.isValid}
          >
            Sign In
          </button>
        </p>
      </form>

      <p className="signUpInChangeP">
        Doesn't have an account yet?
        <button
          onClick={() => setModalFormType("signUp")}
          className="signUpInChange btn"
          id="signUpChange"
        >
          Sign Up!
        </button>
      </p>
      <p className="signUpInChangeP">
        Forgot your password?
        <button
          onClick={() => setModalFormType("forgotPass")}
          className="signUpInChange btn"
          id="signUpChange"
        >
          Click Here!
        </button>
      </p>
    </>
  );
}
