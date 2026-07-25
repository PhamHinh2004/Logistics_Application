import React, { useState, useEffect } from "react";
import { Plus, Minus } from "lucide-react";
import CONTAINERS from "../../assets/containers";
const { CATEGORIES, SIZES, PRESET_COLORS, CONTAINER_SIZES, OWNER_COMPANIES } = CONTAINERS;


export default function Step1_Quotation({ step, handleUpdateStep, items, setItems, updateItem, emptyItem, setStep1Valid }) {
    const [cargoType, setCargoType] = useState("");
    const [count, setCount] = useState(1);
    const [customer, setCustomer] = useState({});

    const userId = localStorage.getItem("id");
    const token = localStorage.getItem("token");


    const fetchCustomer = async () => {
        try {
            const response = await fetch(`http://localhost:9001/api/v1/customers/${userId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!response.ok) throw new Error("Failed to fetch customer data");
            const data = await response.json();
            setCustomer(data.response || {});
        } catch (error) {
            console.error("Error fetching customer:", error);
            setCustomer({}); // keep it a safe object so customer.xxx never throws
        }
    };
    useEffect(() => {
        const isValid =
            cargoType.trim().length > 0 && items.every((it) => it.color && it.weight && it.owner_company);
        setStep1Valid(isValid);
    }, [cargoType, items]);

    useEffect(() => {
        fetchCustomer();
    }, []);
    const setCountAndResize = (n) => {
        const next = Math.min(10, Math.max(1, n));
        setCount(next);
        setItems((prev) => {
            const copy = [...prev];
            while (copy.length < next) copy.push(emptyItem());
            while (copy.length > next) copy.pop();
            return copy;
        });
    };

    const step1Valid =
        cargoType.trim().length > 0 && items.every((it) => it.color && it.weight && it.owner_company);
    return (
        <div>
            {/* ---------------- STEP 1: Hàng hoá ---------------- */}
            {step === 1 && (
                <>
                    <div>
                        <p className="text-[11px] uppercase tracking-wider text-[#9CA3AF] mb-3 font-medium">Thông tin khách hàng</p>
                        <div className="border border-[#EAEAEA] rounded-xl bg-[#FAFAF9] p-5 grid grid-cols-2 gap-3 text-[13px]">
                            <div><span className="text-[#49638f]">Người liên hệ · </span>{customer?.contactName || "—"}</div>
                            <div><span className="text-[#9CA3AF]">Công ty · </span>{customer?.companyName || "—"}</div>
                            <div><span className="text-[#9CA3AF]">Email · </span>{customer?.contactEmail || "—"}</div>
                            <div><span className="text-[#9CA3AF]">SĐT · </span>{customer?.contactPhone || "—"}</div>
                        </div>
                    </div>



                    <div>
                        <p className="text-[11px] uppercase tracking-wider text-[#9CA3AF] mb-3 font-medium">Số lượng container</p>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setCountAndResize(count - 1)}
                                className="w-9 h-9 rounded-lg border border-[#E5E7EB] flex items-center justify-center hover:border-[#6C5CE7] hover:text-[#6C5CE7] transition"
                            >
                                <Minus size={14} />
                            </button>
                            <span className="font-mono text-[16px] w-8 text-center">{count}</span>
                            <button
                                onClick={() => setCountAndResize(count + 1)}
                                className="w-9 h-9 rounded-lg border border-[#E5E7EB] flex items-center justify-center hover:border-[#6C5CE7] hover:text-[#6C5CE7] transition"
                            >
                                <Plus size={14} />
                            </button>
                            <span className="text-[12px] text-[#9CA3AF]">container — form bên dưới sẽ lặp lại theo số lượng</span>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {items.map((it, idx) => (
                            <div key={idx} className="border border-[#EAEAEA] rounded-xl bg-[#FAFAF9] p-5 space-y-4">
                                <p className="text-[12px] font-mono text-[#9CA3AF]">Container #{idx + 1}</p>
                                <div>
                                    <p className="text-[11px] uppercase tracking-wider text-[#9CA3AF] mb-3 font-medium">Loại hàng hoá chung</p>
                                    <input
                                        value={it.cargo_type}
                                        onChange={(e) => updateItem(idx, "cargo_type", e.target.value)}
                                        placeholder="VD: Hàng đông lạnh - thuỷ sản xuất khẩu"
                                        className="w-full bg-white border border-[#E5E7EB] rounded-lg px-3 py-2.5 text-[14px] outline-none focus:border-[#6C5CE7] placeholder:text-[#B0B4BC]"
                                    />
                                </div>
                                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                                    {CATEGORIES.map((category) => (
                                        <button
                                            key={category.id}
                                            onClick={() => {
                                                updateItem(idx, "container_type", category.id);
                                                updateItem(idx, "size_ft", category.sizes[0]);
                                                updateItem(idx, "color", PRESET_COLORS[0].hex);
                                                // fixed: was writing to "owner" before, the field is "owner_company"
                                                updateItem(idx, "owner_company", OWNER_COMPANIES[category.id]?.[0]?.id || "");
                                            }}
                                            className={`flex flex-col items-center gap-1.5 py-2.5 rounded-lg border text-[11px] transition ${it.container_type === category.id
                                                ? "border-[#6C5CE7] text-[#6C5CE7] bg-[#6C5CE7]/10"
                                                : "border-[#E5E7EB] text-[#4B5563] bg-white hover:border-[#C7C9D1]"
                                                }`}
                                        >
                                            {category.name}
                                        </button>
                                    ))}
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <label className="block">
                                        <span className="text-[12px] text-[#9CA3AF] mb-1.5 block">Kích cỡ</span>
                                        <select
                                            value={it.size_ft}
                                            onChange={(e) => updateItem(idx, "size_ft", e.target.value)}
                                            className="w-full bg-white border border-[#E5E7EB] rounded-lg px-3 py-2.5 text-[14px] outline-none focus:border-[#6C5CE7]"
                                        >
                                            {(CONTAINER_SIZES[it.container_type] || []).map((size) => (
                                                <option key={size} value={size}>{SIZES[size]?.label || size}</option>
                                            ))}
                                        </select>
                                    </label>
                                    <label className="block">
                                        <span className="text-[12px] text-[#9CA3AF] mb-1.5 block">Màu</span>
                                        <select
                                            value={it.color}
                                            onChange={(e) => updateItem(idx, "color", e.target.value)}
                                            className="w-full bg-white border border-[#E5E7EB] rounded-lg px-3 py-2.5 text-[14px] outline-none focus:border-[#6C5CE7]"
                                        >
                                            {PRESET_COLORS.map((color) => (
                                                <option key={color.hex} value={color.hex}>{color.name}</option>
                                            ))}
                                        </select>
                                    </label>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <label className="block">
                                        <span className="text-[12px] text-[#9CA3AF] mb-1.5 block">Khối lượng (kg)</span>
                                        <input
                                            value={it.weight}
                                            onChange={(e) => updateItem(idx, "weight", e.target.value.replace(/[^\d]/g, ""))}
                                            placeholder="18500"
                                            className="w-full bg-white border border-[#E5E7EB] rounded-lg px-3 py-2.5 text-[14px] font-mono outline-none focus:border-[#6C5CE7] placeholder:text-[#B0B4BC]"
                                        />
                                    </label>
                                    <label className="block">
                                        <span className="text-[12px] text-[#9CA3AF] mb-1.5 block">Chủ sở hữu</span>
                                        <select
                                            value={it.owner_company}
                                            onChange={(e) => updateItem(idx, "owner_company", e.target.value)}
                                            className="w-full bg-white border border-[#E5E7EB] rounded-lg px-3 py-2.5 text-[14px] outline-none focus:border-[#6C5CE7]"
                                        >
                                            <option value="">— Chọn —</option>
                                            {(OWNER_COMPANIES[it.container_type] || []).map((owner) => (
                                                <option key={owner.id} value={owner.id}>{owner.name}</option>
                                            ))}
                                        </select>
                                    </label>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}