import { useField } from "formik";

export function FileInput({ fileRef, ...props }) {
  const [field, meta] = useField(props);
  return (
    <div>
      <label htmlFor="files">Choose files</label>{" "}
      <input ref={fileRef} multiple={true} type="file" {...field} />
      {meta.touched && meta.error ? (
        <span className="invalid-feedback">{meta.error}</span>
      ) : null}
    </div>
  );
}
