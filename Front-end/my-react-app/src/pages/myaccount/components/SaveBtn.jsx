export default function SaveBtn({ onClick, loading }) {
  return (
    <button onClick={onClick}
      className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-gray-900 text-xs font-semibold
                 rounded-lg transition-colors flex items-center gap-1.5">
      {loading ? (
        <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
        </svg>
      ) : (
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      )}
      Lưu thay đổi
    </button>
  );
}