import { useState, useEffect } from "react";
import SkeletonCard from "./SkeletonCard";
import ArticleCard from "./ArticleCard";
import DetailPanel from "./DetailPanel";
import Navigation from "../../components/Navigation";
import FooterPage from "../../components/FooterPage";

const API_URL =
  "http://localhost:9003/v1/api/news";

function timeAgo(dateStr) {
  const diff = Math.floor((Date.now() - new Date(dateStr)) / 1000);
  if (diff < 3600) return `${Math.floor(diff / 60)} phút trước`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} giờ trước`;
  return `${Math.floor(diff / 86400)} ngày trước`;
}

function fmtDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("vi-VN", {
    day: "2-digit", month: "2-digit", year: "numeric",
  });
}


// ─── Main ─────────────────────────────────────────────────────────────────────
export default function NewsPage() {
  const [articles, setArticles] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  const fetchArticles_API = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      const list = data.articles || [];
      setArticles(list);
      if (list.length > 0) setSelected(list[0]);
    } catch (err) {
      setError("Không thể tải tin tức. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchArticles_API();
  }, []);

  const filtered = articles.filter(a =>
    search === "" ||
    a.title.toLowerCase().includes(search.toLowerCase()) ||
    a.source.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Navigation />
      
      {/* ── Header ── */}
      <div className="bg-white border-b border-gray-200 px-6 py-3.5 flex items-center justify-between gap-4">
        {/* Search */}
        {/* <div className="relative max-w-xs w-full">
          <svg className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Tìm kiếm tin tức..."
            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl bg-gray-50
                       focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-100
                       focus:bg-white transition-all"
          />
          {search && (
            <button onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div> */}

        <div className="text-xs text-gray-400 whitespace-nowrap">
          Nguồn: GNews · VnExpress
        </div>
      </div>

      {/* ── Body ── */}
      <div className="flex flex-1 overflow-hidden max-w-7xl mx-auto w-full">

        {/* LEFT — Article list */}
        <div className="w-96 flex-shrink-0 border-r border-gray-200 bg-gray-50 overflow-y-auto">
          <div className="p-4 flex flex-col gap-3">

            {/* Error */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-600 text-center">
                {error}
              </div>
            )}

            {/* Loading skeletons */}
            {loading && Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}

            {/* Empty */}
            {!loading && filtered.length === 0 && (
              <div className="text-center py-12 text-gray-400">
                <div className="text-3xl mb-2">🔍</div>
                <p className="text-sm font-medium text-gray-600">Không tìm thấy kết quả</p>
              </div>
            )}

            {/* List */}
            {filtered.map(article => (
              <ArticleCard
                key={article.id}
                article={article}
                selected={selected}
                onClick={setSelected}
              />
            ))}
          </div>
        </div>

        {/* RIGHT — Detail panel */}
        <div className="flex-1 bg-white overflow-y-auto">
          <DetailPanel article={selected} />
        </div>
      </div>
      
      <FooterPage />
    </div>
  );
} 