import { useState } from "react";

// ─── Mock data ────────────────────────────────────────────────────────────────
const CATEGORIES = ["Tất cả", "Logistics", "Vận tải biển", "Công nghệ", "Thị trường", "Công ty"];

const NEWS = [
  {
    id: 1,
    category: "Logistics",
    title: "OceanWings mở rộng mạng lưới vận chuyển sang 15 cảng biển mới tại Đông Nam Á",
    excerpt: "Với việc bổ sung thêm 15 cảng biển trọng yếu tại khu vực Đông Nam Á, OceanWings nâng tổng số điểm kết nối lên 120 cảng toàn cầu, củng cố vị thế đầu ngành logistics container.",
    author: "Nguyễn Minh Tuấn",
    date: "2026-07-12",
    readTime: "4 phút",
    image: "https://placehold.co/800x450/1e3a5f/ffffff?text=Port+Expansion",
    featured: true,
    tag: "Nổi bật",
    tagColor: "bg-blue-100 text-blue-700",
  },
  {
    id: 2,
    category: "Công nghệ",
    title: "Ra mắt hệ thống theo dõi container thời gian thực bằng AI",
    excerpt: "Công nghệ AI mới cho phép khách hàng theo dõi vị trí và trạng thái container chính xác đến từng phút, giảm 40% thời gian xử lý khiếu nại.",
    author: "Trần Thị Lan",
    date: "2026-07-10",
    readTime: "3 phút",
    image: "https://placehold.co/800x450/1a4a2e/ffffff?text=AI+Tracking",
    featured: false,
    tag: "Mới",
    tagColor: "bg-green-100 text-green-700",
  },
  {
    id: 3,
    category: "Thị trường",
    title: "Giá cước vận tải container tuyến Á-Âu tăng 18% trong quý 3/2026",
    excerpt: "Nhu cầu xuất khẩu tăng mạnh từ các thị trường Đông Nam Á đẩy giá cước tuyến Á-Âu leo thang liên tục trong 8 tuần qua.",
    author: "Lê Văn Đức",
    date: "2026-07-08",
    readTime: "5 phút",
    image: "https://placehold.co/800x450/3d1a1a/ffffff?text=Market+Report",
    featured: false,
    tag: "Phân tích",
    tagColor: "bg-amber-100 text-amber-700",
  },
  {
    id: 4,
    category: "Vận tải biển",
    title: "Container 45'HC High Cube — lựa chọn tối ưu cho hàng cồng kềnh",
    excerpt: "Hướng dẫn toàn diện về việc lựa chọn đúng loại container cho từng loại hàng hóa, từ hàng khô thông thường đến thiết bị công nghiệp.",
    author: "Phạm Văn Hinh",
    date: "2026-07-05",
    readTime: "6 phút",
    image: "https://placehold.co/800x450/1a2a4a/ffffff?text=Container+Guide",
    featured: false,
    tag: "Hướng dẫn",
    tagColor: "bg-purple-100 text-purple-700",
  },
  {
    id: 5,
    category: "Công ty",
    title: "OceanWings đạt chứng nhận ISO 9001:2015 — cam kết chất lượng dịch vụ",
    excerpt: "Sau 18 tháng triển khai hệ thống quản lý chất lượng toàn diện, OceanWings chính thức nhận chứng nhận ISO 9001:2015 từ Bureau Veritas.",
    author: "Ban Truyền Thông",
    date: "2026-07-02",
    readTime: "2 phút",
    image: "https://placehold.co/800x450/1a3a1a/ffffff?text=ISO+Certification",
    featured: false,
    tag: "Công ty",
    tagColor: "bg-teal-100 text-teal-700",
  },
  {
    id: 6,
    category: "Logistics",
    title: "5 xu hướng logistics xanh định hình ngành vận tải container 2026",
    excerpt: "Từ nhiên liệu sinh học đến tối ưu hóa tuyến đường bằng AI, các xu hướng logistics xanh đang tái định hình cách vận chuyển hàng hóa toàn cầu.",
    author: "Nguyễn Thị Hoa",
    date: "2026-06-28",
    readTime: "7 phút",
    image: "https://placehold.co/800x450/1a3820/ffffff?text=Green+Logistics",
    featured: false,
    tag: "Xu hướng",
    tagColor: "bg-emerald-100 text-emerald-700",
  },
  {
    id: 7,
    category: "Thị trường",
    title: "Cảng Cái Mép — Thị Vải: Trung tâm logistics mới của khu vực",
    excerpt: "Với năng lực tiếp nhận tàu siêu lớn 214,000 DWT, Cái Mép-Thị Vải đang nhanh chóng trở thành hub logistics quan trọng của ASEAN.",
    author: "Trần Minh Khoa",
    date: "2026-06-25",
    readTime: "5 phút",
    image: "https://placehold.co/800x450/0d2137/ffffff?text=Cai+Mep+Port",
    featured: false,
    tag: "Thị trường",
    tagColor: "bg-sky-100 text-sky-700",
  },
];

function fmtDate(d) {
  return new Date(d).toLocaleDateString("vi-VN", { day:"2-digit", month:"2-digit", year:"numeric" });
}

// ─── Components ───────────────────────────────────────────────────────────────
function FeaturedCard({ item, onClick }) {
  return (
    <div onClick={() => onClick(item)}
      className="group relative rounded-2xl overflow-hidden cursor-pointer bg-white border border-gray-200
                 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
      {/* Image */}
      <div className="relative h-72 overflow-hidden">
        <img src={item.image} alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        {/* Tag */}
        <span className="absolute top-4 left-4 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-white/95 text-blue-700">
          {item.tag}
        </span>
        <span className="absolute top-4 right-4 text-[11px] font-medium px-2.5 py-1 rounded-full bg-black/30 text-white backdrop-blur-sm">
          {item.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-900 leading-tight mb-3 group-hover:text-blue-700 transition-colors">
          {item.title}
        </h2>
        <p className="text-sm text-gray-500 leading-relaxed mb-5 line-clamp-2">{item.excerpt}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-[10px] font-bold">
              {item.author.split(" ").pop()[0]}
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-700">{item.author}</p>
              <p className="text-[10px] text-gray-400">{fmtDate(item.date)}</p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {item.readTime}
          </div>
        </div>
      </div>
    </div>
  );
}

function NewsCard({ item, onClick }) {
  return (
    <div onClick={() => onClick(item)}
      className="group flex gap-4 p-4 rounded-xl border border-gray-100 bg-white
                 hover:border-gray-200 hover:shadow-md transition-all duration-200 cursor-pointer">
      {/* Thumbnail */}
      <div className="w-24 h-20 rounded-lg overflow-hidden flex-shrink-0">
        <img src={item.image} alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
      </div>
      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1.5">
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${item.tagColor}`}>{item.tag}</span>
          <span className="text-[10px] text-gray-400">{item.category}</span>
        </div>
        <h3 className="text-sm font-semibold text-gray-800 leading-snug line-clamp-2 group-hover:text-blue-700 transition-colors mb-1.5">
          {item.title}
        </h3>
        <div className="flex items-center gap-3 text-[10px] text-gray-400">
          <span>{item.author}</span>
          <span>·</span>
          <span>{fmtDate(item.date)}</span>
          <span>·</span>
          <span>{item.readTime}</span>
        </div>
      </div>
    </div>
  );
}

function NewsModal({ item, onClose }) {
  if (!item) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 backdrop-blur-sm p-6 overflow-y-auto"
      onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="bg-white rounded-2xl w-full max-w-2xl my-auto shadow-2xl overflow-hidden">
        {/* Image */}
        <div className="relative h-56">
          <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <button onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/90 hover:bg-white flex items-center justify-center text-gray-600 transition-colors shadow-sm">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="absolute bottom-4 left-5 flex gap-2">
            <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${item.tagColor}`}>{item.tag}</span>
            <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-white/20 text-white backdrop-blur-sm">{item.category}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-900 leading-tight mb-3">{item.title}</h2>

          {/* Meta */}
          <div className="flex items-center gap-4 pb-5 border-b border-gray-100 mb-5">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold">
                {item.author.split(" ").pop()[0]}
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-800">{item.author}</p>
                <p className="text-[10px] text-gray-400">{fmtDate(item.date)}</p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-400 ml-auto">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {item.readTime} đọc
            </div>
          </div>

          {/* Body */}
          <p className="text-sm text-gray-600 leading-relaxed mb-4">{item.excerpt}</p>
          <p className="text-sm text-gray-600 leading-relaxed mb-4">
            Đây là nội dung chi tiết của bài viết. Trong triển khai thực tế, bạn có thể lấy nội dung đầy đủ từ API và render bằng thư viện markdown hoặc rich text renderer.
          </p>
          <p className="text-sm text-gray-600 leading-relaxed">
            OceanWings cam kết cung cấp thông tin cập nhật và chính xác nhất về ngành logistics và vận tải container, giúp khách hàng đưa ra quyết định kinh doanh tốt hơn.
          </p>

          {/* Footer */}
          <div className="mt-6 pt-5 border-t border-gray-100 flex items-center justify-between">
            <div className="flex gap-2">
              {["Chia sẻ", "Lưu"].map(a => (
                <button key={a} className="text-xs font-medium px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-600 transition-colors">
                  {a}
                </button>
              ))}
            </div>
            <button onClick={onClose}
              className="text-xs font-semibold px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors">
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function NewsPage() {
  const [activeCategory, setActiveCategory] = useState("Tất cả");
  const [search, setSearch]     = useState("");
  const [modal, setModal]       = useState(null);

  const filtered = NEWS.filter(n => {
    const matchCat  = activeCategory === "Tất cả" || n.category === activeCategory;
    const matchSearch = search === "" ||
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const featured = filtered.find(n => n.featured);
  const rest     = filtered.filter(n => !n.featured || activeCategory !== "Tất cả" || search !== "");

  return (
    <div className="min-h-screen bg-gray-50 font-sans">

      {/* ── Header ── */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <span className="text-base font-bold text-gray-900">OceanWings</span>
            <span className="text-gray-300">|</span>
            <span className="text-sm font-semibold text-gray-700">Tin tức</span>
          </div>
          {/* Search */}
          <div className="relative flex-1 max-w-xs">
            <svg className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Tìm kiếm bài viết..."
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl bg-gray-50
                         focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-100 focus:bg-white transition-all" />
          </div>
          <button className="text-sm font-semibold px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition-colors flex-shrink-0">
            + Đăng ký nhận tin
          </button>
        </div>

        {/* Category tabs */}
        <div className="max-w-6xl mx-auto px-6 pb-0">
          <div className="flex gap-1 overflow-x-auto" style={{ scrollbarWidth:"none" }}>
            {CATEGORIES.map(c => (
              <button key={c} onClick={() => setActiveCategory(c)}
                className={`px-4 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 transition-all ${
                  activeCategory === c
                    ? "border-blue-600 text-blue-700"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}>
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="max-w-6xl mx-auto px-6 py-8">

        {/* Stats bar */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-gray-500">
            {filtered.length > 0
              ? <><span className="font-semibold text-gray-800">{filtered.length}</span> bài viết {activeCategory !== "Tất cả" ? `trong "${activeCategory}"` : ""}</>
              : "Không tìm thấy kết quả"}
          </p>
          {search && (
            <button onClick={() => setSearch("")}
              className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
              Xóa tìm kiếm
            </button>
          )}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-4xl mb-3">📭</div>
            <p className="text-base font-semibold text-gray-700 mb-1">Không có bài viết nào</p>
            <p className="text-sm text-gray-400">Thử tìm kiếm với từ khóa khác hoặc chọn danh mục khác.</p>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-6">

            {/* Featured (full width) */}
            {featured && activeCategory === "Tất cả" && search === "" && (
              <div className="col-span-3">
                <FeaturedCard item={featured} onClick={setModal} />
              </div>
            )}

            {/* Left: main list */}
            <div className="col-span-2 flex flex-col gap-3">
              {(activeCategory !== "Tất cả" || search !== "" ? filtered : rest).map(item => (
                <NewsCard key={item.id} item={item} onClick={setModal} />
              ))}
            </div>

            {/* Right: sidebar */}
            <div className="col-span-1 flex flex-col gap-4">

              {/* Popular */}
              <div className="bg-white border border-gray-200 rounded-2xl p-5">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Đọc nhiều nhất</p>
                <div className="flex flex-col gap-4">
                  {NEWS.slice(0,4).map((n,i) => (
                    <div key={n.id} onClick={() => setModal(n)}
                      className="flex gap-3 cursor-pointer group">
                      <span className="text-2xl font-black text-gray-100 leading-none w-6 flex-shrink-0">
                        {i+1}
                      </span>
                      <div>
                        <p className="text-xs font-semibold text-gray-700 leading-snug line-clamp-2 group-hover:text-blue-700 transition-colors">
                          {n.title}
                        </p>
                        <p className="text-[10px] text-gray-400 mt-1">{fmtDate(n.date)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Topics */}
              <div className="bg-white border border-gray-200 rounded-2xl p-5">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Chủ đề</p>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.slice(1).map(c => (
                    <button key={c} onClick={() => setActiveCategory(c)}
                      className={`text-xs px-3 py-1.5 rounded-full border font-medium transition-all ${
                        activeCategory === c
                          ? "border-blue-500 bg-blue-50 text-blue-700"
                          : "border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50"
                      }`}>
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Newsletter CTA */}
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-5 text-white">
                <p className="text-sm font-bold mb-1">Nhận tin mới nhất</p>
                <p className="text-xs text-blue-100 mb-4 leading-relaxed">
                  Cập nhật xu hướng logistics và tin tức OceanWings mỗi tuần.
                </p>
                <input placeholder="Email của bạn"
                  className="w-full px-3 py-2 text-xs rounded-lg bg-white/10 border border-white/20
                             placeholder:text-white/50 text-white focus:outline-none focus:bg-white/20 mb-2 transition-all" />
                <button className="w-full py-2 rounded-lg bg-white text-blue-700 text-xs font-bold hover:bg-blue-50 transition-colors">
                  Đăng ký ngay
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── Modal ── */}
      {modal && <NewsModal item={modal} onClose={() => setModal(null)} />}
    </div>
  );
}
