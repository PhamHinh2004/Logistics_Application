import { useState, useMemo, useEffect } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import Navigation from "../components/Navigation";
import FooterPage from "../components/FooterPage";
import ContainerCardPage from "./ContainerCardPage";
import ContainerDetailPage from "./ContainerDetailPage";
import { useNavigate } from "react-router-dom";
const STATUS_LABEL = {
    0: "Sẵn sàng",
    1: "Đang dùng",
    2: "Bảo trì",
};
const SIZE_LABEL = { 0: "20ft", 1: "40ft", 2: "45ft" };

export default function ContainerListPage() {
    const [containers, setContainers] = useState([]); // giữ nguyên nguồn data của bạn
    const [selectedContainer, setSelectedContainer] = useState(null);
    const navigate = useNavigate();
    // ---- state bộ lọc ----
    const [search, setSearch] = useState("");
    const [ownerFilter, setOwnerFilter] = useState("all");
    const [statusFilter, setStatusFilter] = useState("all");
    const [sizeFilter, setSizeFilter] = useState("all");
    const [minWeight, setMinWeight] = useState("");
    const [maxWeight, setMaxWeight] = useState("");

    // danh sách owner duy nhất, tự lấy từ data — không cần hard-code
    const owners = useMemo(() => {
        const set = new Set(containers.map((c) => c.ownerCompany).filter(Boolean));
        return Array.from(set);
    }, [containers]);

    const filteredContainers = useMemo(() => {
        return containers.filter((c) => {
            const matchesSearch =
                !search ||
                c.containerNumber?.toLowerCase().includes(search.toLowerCase()) ||
                c.isoCode?.toLowerCase().includes(search.toLowerCase());

            const matchesOwner = ownerFilter === "all" || c.ownerCompany === ownerFilter;
            const matchesStatus = statusFilter === "all" || String(c.status) === statusFilter;
            const matchesSize = sizeFilter === "all" || String(c.sizeFt) === sizeFilter;

            const weight = c.maxWeightKg ?? 0;
            const matchesMin = minWeight === "" || weight >= Number(minWeight);
            const matchesMax = maxWeight === "" || weight <= Number(maxWeight);

            return matchesSearch && matchesOwner && matchesStatus && matchesSize && matchesMin && matchesMax;
        });
    }, [containers, search, ownerFilter, statusFilter, sizeFilter, minWeight, maxWeight]);

    const hasActiveFilters =
        search || ownerFilter !== "all" || statusFilter !== "all" || sizeFilter !== "all" || minWeight || maxWeight;

    const resetFilters = () => {
        setSearch("");
        setOwnerFilter("all");
        setStatusFilter("all");
        setSizeFilter("all");
        setMinWeight("");
        setMaxWeight("");
    };

    const fetchContainers = async () => {
        try {
            const response = await fetch("http://localhost:9002/api/container");
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            setContainers(data);
        } catch (error) {
            console.error("Error fetching containers:", error);
        }
    };

    useEffect(() => {
        fetchContainers();
    }, []);

    return (
        <>
            <Navigation />
            <div className="container mx-auto px-16 py-8">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">Danh sách container</h1>
                        <p className="text-slate-500 mt-1">
                            {filteredContainers.length} / {containers.length} container
                        </p>
                    </div>
                    <button
                        onClick={() => navigate("/demo")}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-xl transition"
                    >
                        Demo
                    </button>
                </div>

                {/* FILTER BAR */}
                <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5 mb-6">
                    <div className="flex items-center gap-2 mb-4 text-slate-700">
                        <SlidersHorizontal size={18} />
                        <span className="font-semibold">Bộ lọc</span>
                        {hasActiveFilters && (
                            <button
                                onClick={resetFilters}
                                className="ml-auto flex items-center gap-1 text-sm text-slate-500 hover:text-red-500 transition"
                            >
                                <X size={14} /> Xoá bộ lọc
                            </button>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
                        {/* Search */}
                        <div className="lg:col-span-2 relative">
                            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Tìm số container, ISO..."
                                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 text-sm"
                            />
                        </div>

                        {/* Owner */}
                        <select
                            value={ownerFilter}
                            onChange={(e) => setOwnerFilter(e.target.value)}
                            className="rounded-xl border border-slate-200 py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                        >
                            <option value="all">Tất cả chủ sở hữu</option>
                            {owners.map((o) => (
                                <option key={o} value={o}>{o}</option>
                            ))}
                        </select>

                        {/* Size */}
                        <select
                            value={sizeFilter}
                            onChange={(e) => setSizeFilter(e.target.value)}
                            className="rounded-xl border border-slate-200 py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                        >
                            <option value="all">Tất cả kích thước</option>
                            {Object.entries(SIZE_LABEL).map(([val, label]) => (
                                <option key={val} value={val}>{label}</option>
                            ))}
                        </select>

                        {/* Status */}
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="rounded-xl border border-slate-200 py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                        >
                            <option value="all">Tất cả trạng thái</option>
                            {Object.entries(STATUS_LABEL).map(([val, label]) => (
                                <option key={val} value={val}>{label}</option>
                            ))}
                        </select>

                        {/* Weight range */}
                        <div className="flex items-center gap-2">
                            <input
                                type="number"
                                value={minWeight}
                                onChange={(e) => setMinWeight(e.target.value)}
                                placeholder="Từ (kg)"
                                className="w-full rounded-xl border border-slate-200 py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                            />
                            <span className="text-slate-400">—</span>
                            <input
                                type="number"
                                value={maxWeight}
                                onChange={(e) => setMaxWeight(e.target.value)}
                                placeholder="Đến (kg)"
                                className="w-full rounded-xl border border-slate-200 py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                            />
                        </div>
                    </div>
                </div>

                {/* GRID */}
                {filteredContainers.length === 0 ? (
                    <div className="text-center py-20 text-slate-400">
                        <p className="text-lg font-semibold text-slate-500">Không tìm thấy container phù hợp</p>
                        <p className="text-sm mt-1">Thử đổi từ khoá hoặc bỏ bớt bộ lọc.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {filteredContainers.map((container) => (
                            <ContainerCardPage
                                key={container.id}
                                container={container}
                                onView={() => setSelectedContainer(container)}
                            />
                        ))}
                    </div>
                )}

                {selectedContainer && (
                    <ContainerDetailPage
                        container={selectedContainer}
                        onClose={() => setSelectedContainer(null)}
                    />
                )}
            </div>
            <FooterPage />
        </>
    );
}