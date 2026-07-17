export default function EditableInput({ value, onChange, placeholder, type = "text" }) {
  return (
    <input
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5
                 text-sm text-gray-900 placeholder:text-gray-400
                 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-100
                 transition-all"
    />
  );
} 