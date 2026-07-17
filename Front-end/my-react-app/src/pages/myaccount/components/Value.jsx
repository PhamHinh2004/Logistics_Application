export default function Value({ children }) {
  return <p className="text-sm font-medium text-gray-900">{children || "—"}</p>;
}