import { useFormik } from "formik";
import Joi from "joi";
import { Input } from "../common/input";
import { formikValidateUsingJoi } from "../../utils/formikValidateUsingJoi";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { resetPass } from "../../services/usersServices";

export function ResetPassForm() {
  const params = useParams();
  const navigate = useNavigate();

  const form = useFormik({
    validateOnMount: false,
    initialValues: {
      password: "",
      confirmPass: "",
    },
    validate: formikValidateUsingJoi({
      password: Joi.string()
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
        })
        .label("Password"),
      confirmPass: Joi.string()
        .min(8)
        .max(1024)
        .required()
        .valid(Joi.ref("password"))
        .messages({
          "string.empty": `Confirmed Password field cannot be empty..`,
          "string.min": `Confirmed Password field should have a minimum length of {#limit}..`,
          "any.required": `Confirmed Password field is a required..`,
          "any.only":
            "Confirmed Password field must match the Password field..",
        })
        .label("Confirmed Password"),
    }),
    onSubmit(values) {
      handleResetPass();
      async function handleResetPass() {
        try {
          await resetPass(values.password, params.token);
          navigate("/");
          toast.success("Password Reset was successful. Please Log In.");
        } catch (err) {
          toast.error(err.response.data);
        }
      }
    },
  });

  return (
    <div id="resetPassDiv">
      <h1 className="text-center">Reset Password</h1>
      <form id="resetPassForm" onSubmit={form.handleSubmit} noValidate>
        <Input
          {...form.getFieldProps("password")}
          label="Password"
          type="password"
          placeholder="New Password.."
          required
          error={form.touched.password && form.errors.password}
          id="resetPass"
          autoComplete="current-password"
        />
        <Input
          {...form.getFieldProps("confirmPass")}
          label="Confirm Password"
          type="password"
          placeholder="Confirm Password.."
          required
          error={form.touched.confirmPass && form.errors.confirmPass}
          id="confirmPass"
          autoComplete="current-password"
        />
        <p>
          <button
            className="btn"
            name="resetSubmit"
            id="resetSubmit"
            type="submit"
            disabled={true && !form.isValid}
          >
            Submit
          </button>
        </p>
      </form>
    </div>
  );
}
