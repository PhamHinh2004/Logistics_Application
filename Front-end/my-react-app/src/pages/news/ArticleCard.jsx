function timeAgo(dateStr) {
  const diff = Math.floor((Date.now() - new Date(dateStr)) / 1000);
  if (diff < 3600) return `${Math.floor(diff / 60)} phút trước`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} giờ trước`;
  return `${Math.floor(diff / 86400)} ngày trước`;
}

// ─── Article List Card ────────────────────────────────────────────────────────
export default function ArticleCard({ article, selected, onClick }) {
  const isSelected = selected?.id === article.id;
  return (
    <div
      onClick={() => onClick(article)}
      className={`bg-white rounded-2xl border cursor-pointer transition-all duration-150 p-4
        ${isSelected
          ? "border-blue-500 shadow-md shadow-blue-100"
          : "border-gray-200 hover:border-gray-300 hover:shadow-sm"}`}
    >
      <div className="flex gap-4">
        {/* Thumbnail */}
        <div className="w-24 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
          {article.image ? (
            <img src={article.image} alt={article.title}
              className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-2xl">📰</div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-semibold text-blue-600 uppercase tracking-wide mb-1">
            {article.source.name}
          </p>
          <h3 className={`text-sm font-semibold leading-snug line-clamp-2 mb-1.5 transition-colors
            ${isSelected ? "text-blue-700" : "text-gray-800"}`}>
            {article.title}
          </h3>
          <p className="text-[10px] text-gray-400">{timeAgo(article.publishedAt)}</p>
        </div>
      </div>
    </div>
  );
}