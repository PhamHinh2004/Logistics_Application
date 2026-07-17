import Label from "./Label.jsx";
import Value from "./Value.jsx";

export default function Field({ label, value, children }) {
  return (
    <div>
      <Label>{label}</Label>
      {children || <Value>{value}</Value>}
    </div>
  );
}