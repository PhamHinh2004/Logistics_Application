function fmtDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("vi-VN", {
    day: "2-digit", month: "2-digit", year: "numeric",
  });
}
function timeAgo(dateStr) {
  const diff = Math.floor((Date.now() - new Date(dateStr)) / 1000);
  if (diff < 3600) return `${Math.floor(diff / 60)} phút trước`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} giờ trước`;
  return `${Math.floor(diff / 86400)} ngày trước`;
}


// ─── Detail Panel ─────────────────────────────────────────────────────────────
export default function DetailPanel({ article }) {
  if (!article) return (
    <div className="flex-1 flex flex-col items-center justify-center text-center p-12 text-gray-400">
      <div className="text-5xl mb-4">📰</div>
      <p className="text-base font-semibold text-gray-600 mb-1">Chọn một bài viết để đọc</p>
      <p className="text-sm">Click vào bất kỳ tin tức nào ở bên trái để xem chi tiết.</p>
    </div>
  );

  return (
    <div className="flex-1 overflow-y-auto">
      {/* Header image */}
      {article.image && (
        <div className="w-full h-56 overflow-hidden">
          <img src={article.image} alt={article.title}
            className="w-full h-full object-cover" />
        </div>
      )}

      <div className="p-6">
        {/* Source + date */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">
            {article.source.name}
          </span>
          <span className="text-xs text-gray-400">{fmtDate(article.publishedAt)}</span>
          <span className="text-xs text-gray-300">·</span>
          <span className="text-xs text-gray-400">{timeAgo(article.publishedAt)}</span>
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-gray-900 leading-tight mb-3">
          {article.title}
        </h2>

        {/* Description */}
        <p className="text-sm text-gray-600 leading-relaxed mb-5 pb-5 border-b border-gray-100">
          {article.description}
        </p>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700
                       text-white text-sm font-semibold rounded-xl transition-colors shadow-sm shadow-blue-200"
          >
            Đọc bài viết đầy đủ
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
          <button
            onClick={() => window.open(article.source.url, "_blank")}
            className="px-4 py-2.5 border border-gray-200 hover:border-gray-300 text-sm font-medium
                       text-gray-600 rounded-xl hover:bg-gray-50 transition-colors"
          >
            {article.source.name} ↗
          </button>
          <button
            onClick={() => navigator.clipboard?.writeText(article.url)}
            className="ml-auto p-2.5 border border-gray-200 hover:border-gray-300 rounded-xl
                       text-gray-400 hover:text-gray-600 transition-all"
            title="Sao chép link"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </button>
        </div>

        {/* Content preview */}
        {article.content && (
          <div className="mt-6 pt-5 border-t border-gray-100">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Nội dung</p>
            <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
              {article.content.replace(/\[\d+ chars\]$/, "").trim()}
            </p>
            <div className="mt-4 p-3 bg-gray-50 rounded-xl border border-gray-100">
              <p className="text-xs text-gray-400 text-center">
                Xem toàn bộ nội dung trên{" "}
                <a href={article.url} target="_blank" rel="noopener noreferrer"
                  className="text-blue-600 font-semibold hover:underline">
                  {article.source.name}
                </a>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}