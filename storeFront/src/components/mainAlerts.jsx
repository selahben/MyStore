export function MainAlerts({ alert, setAlert }) {
  return (
    <div id="myAlert">
      <span
        id="closeBTN"
        onClick={() => {
          setAlert("");
        }}
      >
        &times;
      </span>
      <span id="alertText">{alert}</span>
    </div>
  );
}
