import { FileText, Package } from "lucide-react";
export default function Step3_Quotation({ step, items, setItems, updateItem, emptyItem, setStep3Valid, quoteCode, basePrice, totalPrice, status, priced, fmt }) {
    return (
        <div>
            {step === 3 && (
                <>
                    <div>
                        <p className="text-[11px] uppercase tracking-wider text-[#9CA3AF] mb-3 font-medium">Chi tiết từng container / giá</p>
                        <div className="space-y-3">
                            {priced.map((it, idx) => (
                                <div key={idx} className="border border-[#EAEAEA] rounded-xl bg-[#FAFAF9] p-4 flex items-center justify-between gap-4">
                                    <div className="flex items-center gap-3 min-w-0">
                                        <div className="w-9 h-9 rounded-lg bg-white border border-[#EAEAEA] flex items-center justify-center shrink-0">
                                            <Package size={15} className="text-[#6C5CE7]" />
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-[13px] font-medium">
                                                {it.container_type} · {it.size_ft.replace("Size", "")}
                                            </p>
                                            <p className="text-[12px] text-[#9CA3AF] truncate">
                                                {it.pickup_location?.address || "—"} → {it.delivery_location?.address || "—"}
                                            </p>
                                            <p className="text-[11px] font-mono text-[#B0B4BC]">
                                                {Number(it.weight || 0).toLocaleString("vi-VN")} kg · {it.distant.toLocaleString("vi-VN")} km · {it.pickup_date}
                                            </p>
                                        </div>
                                    </div>
                                    <span className="font-mono text-[14px] shrink-0">{fmt(it.unit_price)}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <p className="text-[11px] uppercase tracking-wider text-[#9CA3AF] mb-3 font-medium">Thông tin báo giá</p>
                        <div className="border border-[#6C5CE7]/30 rounded-xl bg-[#FAFAF9] divide-y divide-[#EAEAEA]">
                            <div className="flex items-center justify-between px-5 py-3">
                                <span className="text-[13px] text-[#9CA3AF] flex items-center gap-1.5"><FileText size={13} /> Mã báo giá</span>
                                <span className="font-mono text-[13px]">{quoteCode}</span>
                            </div>
                            <div className="flex items-center justify-between px-5 py-3.5">
                                <span className="text-[13px] text-[#9CA3AF]">Giá cơ bản</span>
                                <span className="font-mono text-[14px]">{fmt(basePrice)}</span>
                            </div>
                            <div className="flex items-center justify-between px-5 py-3.5">
                                <span className="text-[13px] text-[#9CA3AF]">Phụ phí ({items.length} container)</span>
                                <span className="font-mono text-[14px]">{fmt(totalPrice - basePrice)}</span>
                            </div>
                            <div className="flex items-center justify-between px-5 py-4 bg-white rounded-b-xl">
                                <span className="text-[14px] font-medium">Tổng cộng</span>
                                <span className="font-mono text-[20px] font-semibold text-[#6C5CE7]">{fmt(totalPrice)}</span>
                            </div>
                            <div className="flex items-center justify-between px-5 py-3">
                                <span className="text-[12px] text-[#9CA3AF]">Trạng thái</span>
                                <span
                                    className={`text-[11px] font-mono px-2 py-0.5 rounded-full border ${status === "AVAILABLE" || status === "DRAFT"
                                        ? "border-[#B0B4BC] text-[#6B7280]"
                                        : "border-[#6C5CE7] text-[#6C5CE7]"
                                        }`}
                                >
                                    {status}
                                </span>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}
