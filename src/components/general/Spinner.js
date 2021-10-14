import "../../css/spinner.css";

export const Spinner = () => {
  return (
    <div class="lds-ring" style={{ alignSelf: "center" }}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};
