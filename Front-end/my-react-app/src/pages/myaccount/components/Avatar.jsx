export default function Avatar({ name, size = 16 }) {
  const initials = name?.split(" ").map(w => w[0]).slice(-2).join("").toUpperCase() || "?";
  return (
    <div className={`w-${size} h-${size} rounded-full bg-gradient-to-br from-blue-500 to-indigo-600
                     flex items-center justify-center text-gray-900 font-bold flex-shrink-0`}
      style={{ width: size * 4, height: size * 4, fontSize: size * 1.6 }}>
      {initials}
    </div>
  );
}
